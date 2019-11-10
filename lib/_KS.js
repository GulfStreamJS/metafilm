const {transliterate} = require('transliteration');
const colage = require('colage');
const {JSDOM} = require('jsdom');

/**
 * Kinopoisk Schema.
 *
 * @param {Object} schema
 * @return {Object}
 */

module.exports = schema => {

    if (!schema.schema) return {};

    let data = schema.schema;

    if (data['people'] && data['people'].length) {
        return {
            kp_id: schema['kp_id'],
            people: data['people']
        };
    }

    if (!data['properties'] || !data['properties']['name']) return;

    data = data['properties'];
    let kp_id = schema['kp_id'];
    let name_en = data['alternativeHeadline'] && data['alternativeHeadline'].length
        ? data['alternativeHeadline'][0]
            .replace(/&nbsp;/ig, ' ')
            .replace(/\s*([«])\s*/g, ' $1')
            .replace(/\s*([(])\s*/g, ' $1')
            .replace(/\s*([»])\s*/g, '$1 ')
            .replace(/\s*([)])\s*/g, '$1 ')
            .replace(/\s*(\.\.\.|[.,!?])\s*/gi, '$1 ')
            .replace(/"([^"]*?)"/gi, '«$1»')
            .replace('"', '\'')
            .replace(/<[^>]+>/ig, ' ')
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, '')
        : '';
    let name_ru = data['name'] && data['name'][0]
        ? data['name'][0]
            .replace(/&nbsp;/ig, ' ')
            .replace(/\s*([«])\s*/g, ' $1')
            .replace(/\s*([(])\s*/g, ' $1')
            .replace(/\s*([»])\s*/g, '$1 ')
            .replace(/\s*([)])\s*/g, '$1 ')
            .replace(/\s*(\.\.\.|[.,!?])\s*/gi, '$1 ')
            .replace(/"([^"]*?)"/gi, '«$1»')
            .replace('"', '\'')
            .replace(/<[^>]+>/ig, ' ')
            .replace(/\s?\((видео|ТВ|сериал.*?)\)/g, '')
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, '')
        : '';
    let name = name_en || name_ru;
    let tv = data['name'] && data['name'][0] && data['name'][0].indexOf('(ТВ)')+1
        ? ', телевизионный фильм'
        : '';
    let poster = data['image'] && data['image'].length
        ? {
            sm: 'https://st.kp.yandex.net/images/film_iphone/iphone90_' + kp_id + '.jpg',
            md: 'https://st.kp.yandex.net/images/film_iphone/iphone180_' + kp_id + '.jpg',
            lg: 'https://st.kp.yandex.net/images/film_iphone/iphone360_' + kp_id + '.jpg',
            og: 'https://st.kp.yandex.net/images/film_big/' + kp_id + '.jpg',
        }
        : '';
    let premiere = data['dateCreated'] && data['dateCreated'].length
        ? data['dateCreated'][0]
        : '';
    let year = premiere
        ? (new Date(premiere)).getFullYear()
        : '';
    let genres = data['genre'] && data['genre'].length
        ? colage.ge(data['genre'][0] + tv)
        : '';
    let countries = data['countryOfOrigin'] && data['countryOfOrigin'].length
        ? colage.co(data['countryOfOrigin'].map(co => co.name).join(','))
        : '';
    let overview = data['description'] && data['description'].length
        ? data['description'][0]
            .replace(/&nbsp;/ig, ' ')
            .replace(/\s*([«])\s*/g, ' $1')
            .replace(/\s*([(])\s*/g, ' $1')
            .replace(/\s*([»])\s*/g, '$1 ')
            .replace(/\s*([)])\s*/g, '$1 ')
            .replace(/\s*(\.\.\.|[.,!?])\s*/gi, '$1 ')
            .replace(/"([^"]*?)"/gi, '«$1»')
            .replace('"', '\'')
            .replace(/<[^>]+>/ig, ' ')
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, '')
        : '';
    let kp_rating = (
        data['aggregateRating'] &&
        data['aggregateRating'][0] &&
        data['aggregateRating'][0]['properties'] &&
        data['aggregateRating'][0]['properties']['ratingValue']
    )
        ? parseFloat(data['aggregateRating'][0]['properties']['ratingValue']) * 10
        : 0;
    let kp_vote = (
        data['aggregateRating'] &&
        data['aggregateRating'][0] &&
        data['aggregateRating'][0]['properties'] &&
        data['aggregateRating'][0]['properties']['ratingCount']
    )
        ? parseInt(data['aggregateRating'][0]['properties']['ratingCount'])
        : 0;
    let translations = [];
    if (!name_en) {
        if (/[а-яё]/i.test(name_ru)) {
            translations.push({
                country: 'RU',
                language: 'ru',
                name: name_ru,
                overview: overview,
                poster: poster
            });
        }
        else if (name_ru.replace(/[0-9\s\-]/g, '') === '') {
            translations.push({
                country: 'RU',
                language: 'ru',
                name: name_ru,
                overview: overview,
                poster: poster
            });
            translations.push({
                country: 'US',
                language: 'en',
                name: name_ru
            });
        }
        else {
            translations.push({
                country: 'US',
                language: 'en',
                name: name_ru
            });
        }
    }
    else {
        translations.push({
            country: 'RU',
            language: 'ru',
            name: name_ru,
            overview: overview,
            poster: poster
        });
        translations.push({
            country: 'US',
            language: 'en',
            name: name_en
        });
    }
    let people = [];
    /*['режиссер', 'сценарий', 'продюсер', 'оператор', 'композитор', 'художник', 'монтаж', 'актеры']
        .forEach(j => {
            if (data[j] && data[j].length) {
                data[j].forEach(p => {
                    let department = '';
                    let job = '';
                    switch (j) {
                        case 'режиссер':
                            department = 'directing';
                            job = 'director';
                            break;
                        case 'сценарий':
                            department = 'writing';
                            job = '';
                            break;
                        case 'продюсер':
                            department = 'production';
                            job = '';
                            break;
                        case 'оператор':
                            department = 'camera';
                            job = '';
                            break;
                        case 'композитор':
                            department = 'sound';
                            job = '';
                            break;
                        case 'художник':
                            department = 'art';
                            job = '';
                            break;
                        case 'монтаж':
                            department = 'editing';
                            job = '';
                            break;
                        case 'актеры':
                            department = 'actors';
                            job = 'actor';
                            break;
                    }
                    let name = p.name
                        .replace(/\s+/g, ' ')
                        .replace(/(^\s*)|(\s*)$/g, '');
                    let kp_id = p.url
                        .replace(/[^0-9]/g, '');
                    if (name === '...') return;
                    let translations = [];
                    if (name) {
                        if (/[а-яё]/i.test(name)) {
                            translations.push({
                                country: 'RU',
                                language: 'ru',
                                name: name
                            });
                        }
                        else if (name.replace(/[0-9\s\-]/g, '') === '') {
                            translations.push({
                                country: 'RU',
                                language: 'ru',
                                name: name
                            });
                            translations.push({
                                country: 'US',
                                language: 'en',
                                name: name
                            });
                        }
                        else {
                            translations.push({
                                country: 'US',
                                language: 'en',
                                name: name
                            });
                        }
                    }
                    people.push({
                        kp_id,
                        name,
                        department,
                        job,
                        translations
                    });
                });
            }
        });*/

    return {
        kp_id,
        name,
        overview,
        year,
        poster,
        premiere,
        genres,
        countries,
        people,
        kp_rating,
        kp_vote,
        translations
    };

};

module.exports.processed = item => {
    const {document} = (new JSDOM(item.raw)).window;
    let movieFlags = document.querySelectorAll('.movieFlags .flag');
    if (movieFlags && movieFlags.length) {
        let countryOfOrigin = [];
        movieFlags.forEach(flag => {
            countryOfOrigin.push({
                "@type": "Country",
                "name": flag.getAttribute('title')
            });
        });
        item.schema['properties']['countryOfOrigin'] = countryOfOrigin;
    }
    /*['режиссер', 'сценарий', 'продюсер', 'оператор', 'композитор', 'художник', 'монтаж', 'актеры']
        .forEach(type => {
            let regex = (type === 'актеры')
                ? new RegExp('<h4>В главных ролях:</h4>\n?(.*?)</ul>')
                : new RegExp('<tr><td class="type">' + type + '</td><td(.*?)</td></tr>');
            let str = item.raw.match(regex);
            if (str && str.length) {
                const {document} = (new JSDOM(str[0])).window;
                let items = document.querySelectorAll('a');
                if (items && items.length) {
                    let person = [];
                    items.forEach(item => {
                        if (item.innerHTML === '...') return;
                        person.push({
                            "@type": "Person",
                            "url": item.getAttribute('href'),
                            "name": item.innerHTML
                        });
                    });
                    item.schema['properties'][type] = person;
                    item.schema['properties']['url'] = item.url;
                }
            }
        });*/
    ['director', 'actor', 'producer', 'voice_director', 'translator', 'voice', 'writer', 'operator', 'composer', 'design', 'editor']
        .forEach(j => {
            if (j === 'voice_director' || j === 'translator' || j === 'voice') return;
            let reg = '<a name="' + j + '"></a>([^]*?)(<a name="(director|actor|producer|voice_director|translator|voice|writer|operator|composer|design|editor|metafilm)"></a>|<table)'
                .replace(j + '|', '');
            let regex = new RegExp(reg);
            let str = item.raw.match(regex);
            let department = '';
            let job = '';
            switch (j) {
                case 'director':
                    department = 'directing';
                    job = 'director';
                    break;
                case 'writer':
                    department = 'writing';
                    job = '';
                    break;
                case 'producer':
                    department = 'production';
                    job = '';
                    break;
                case 'operator':
                    department = 'camera';
                    job = '';
                    break;
                case 'composer':
                    department = 'sound';
                    job = '';
                    break;
                case 'design':
                    department = 'art';
                    job = '';
                    break;
                case 'editor':
                    department = 'editing';
                    job = '';
                    break;
                case 'actor':
                    department = 'actors';
                    job = 'actor';
                    break;
            }
            if (str && str.length) {
                const {document} = (new JSDOM(str[0])).window;
                let items = document.querySelectorAll('.dub');
                if (items && items.length) {
                    let persons = [];
                    items.forEach(item => {
                        let person = credit(item, department, job);
                        if (person.kp_id && person.name) {
                            persons.push(person);
                        }
                    });
                    if (
                        item.schema['people'] &&
                        item.schema['people'].length
                    ) {
                        item.schema['people'] = [...item.schema['people'], ...persons];
                    }
                    else {
                        item.schema['people'] = persons;
                    }
                }
            }
        });
    return item;
};

const credit = (item, department, job) => {
    let res = {};
    const {document} = (new JSDOM('<p></p>')).window;
    let textarea = document.createElement('textarea');
    let kp_id = item.querySelector('.photo a');
    let name_ru = item.querySelector('.info .name a');
    let name_en = item.querySelector('.info .name .gray');
    let image = item.querySelector('.photo a img');
    let character = item.querySelector('.role');
    res.department = department || '';
    res.job = job || '';
    if (kp_id && kp_id.getAttribute('href')) {
        res.kp_id = kp_id
            .getAttribute('href').replace(/[^0-9]/g, '');
    }
    if (name_en && name_en.innerHTML) {
        res.name = name_en.innerHTML
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, '');
        textarea.innerHTML = res.name;
        res.name = (textarea.value
            .split(/\(|\//)[0])
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, '');
    }
    if (name_ru && name_ru.innerHTML) {
        textarea.innerHTML = name_ru.innerHTML
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, '');
        let name = (textarea.value
            .split(/\(|\//)[0])
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, '');
        if (name) {
            if (!res.name) {
                res.name = name;
                if (/[а-яё]/i.test(name)) {
                    res.name = transliterate(name);
                    res.translations = [
                        {
                            "country": "RU",
                            "language": "ru",
                            "name": name
                        },
                        {
                            "country": "US",
                            "language": "en",
                            "name": transliterate(name)
                        }
                    ];
                }
                else if (name.replace(/[0-9\s\-]/g, '') === '') {
                    res.translations = [
                        {
                            "country": "RU",
                            "language": "ru",
                            "name": name
                        },
                        {
                            "country": "US",
                            "language": "en",
                            "name": name
                        }
                    ];
                }
                else {
                    res.translations = [
                        {
                            "country": "US",
                            "language": "en",
                            "name": name
                        }
                    ];
                }
            }
            else {
                res.translations = [
                    {
                        "country": "RU",
                        "language": "ru",
                        "name": name
                    },
                    {
                        "country": "US",
                        "language": "en",
                        "name": res.name
                    }
                ];
            }
        }
    }
    if (image && image.getAttribute('title') && res.kp_id &&
        image.getAttribute('title').indexOf('no-poster') === -1) {
        res.image = {
            sm: 'https://st.kp.yandex.net/images/film_iphone/iphone90_' + res.kp_id + '.jpg',
            md: 'https://st.kp.yandex.net/images/film_iphone/iphone180_' + res.kp_id + '.jpg',
            lg: 'https://st.kp.yandex.net/images/film_iphone/iphone360_' + res.kp_id + '.jpg',
            og: 'https://st.kp.yandex.net/images/film_iphone/iphone360_' + res.kp_id + '.jpg',
        };
    }
    if (character && character.innerHTML && department === 'actors') {
        res.character = character.innerHTML
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, '');
        textarea.innerHTML = res.character;
        res.character = (textarea.value
            .replace(/\.\.\.\s?/g, '')
            .replace(/,?\s?<font[^]*?/i, '')
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, ''))
            .replace(/(^|,\s|\s)в титрах не указана(,|\s|$)/i, '$1uncredited$2')
            .replace(/(^|\s)в титрах не указан(,|\s|$)/i, '$1uncredited$2')
            .replace(/(^|\s)озвучка(,|\s|$)/i, '$1voice$2')
            .replace(/(^|\s)актер(,|\s|$)/i, '$1Actor$2')
            .replace(/(^|\s)продюсер(,|\s|$)/i, '$1producer$2')
            .replace(/(^|\s)режиссер(,|\s|$)/i, '$1director$2')
            .replace(/(^|\s)сценарист(,|\s|$)/i, '$1writer$2')
            .replace(/(^|\s)оператор(,|\s|$)/i, '$1operator$2')
            .replace(/(^|\s)композитор(,|\s|$)/i, '$1composer$2')
            .replace(/(^|\s)художник(,|\s|$)/i, '$1design$2')
            .replace(/(^|\s)монтажер(,|\s|$)/i, '$1editor$2')
            .replace(/(^|\s)рассказчик(,|\s|$)/i, '$1narrator$2')
            .replace(/(^|\s)играет саму себя(,|\s|$)/i, '$1herself$2')
            .replace(/(^|\s)играет самого себя(,|\s|$)/i, '$1himself$2')
            .replace(/(^|\s)играют самих себя(,|\s|$)/i, '$1themselves$2')
            .replace(/(^|\s)презентатор(,|\s|$)/i, '$1presenter$2')
            .replace(/(^|\s)соведущий(,|\s|$)/i, '$1co-host$2')
            .replace(/(^|\s)ведущий(,|\s|$)/i, '$1host$2')
            .replace(/(^|\s)специальный гость(,|\s|$)/i, '$1special guest$2')
            .replace(/(^|\s)специальные гости(,|\s|$)/i, '$1special guests$2')
            .replace(/(^|\s)музыкальный гость(,|\s|$)/i, '$1musical guest$2')
            .replace(/(^|\s)музыкальные гости(,|\s|$)/i, '$1musical guests$2')
            .replace(/(^|\s)интервьюируемый(,|\s|$)/i, '$1interviewee$2')
            .replace(/(^|\s)гость(,|\s|$)/i, '$1guest$2')
            .replace(/(^|\s)танцор(,|\s|$)/i, '$1dancer$2')
            .replace(/(^,*)|(,*)$/g, '')
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, '');
    }
    return res;
};