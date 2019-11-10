const {transliterate} = require('transliteration');
const colage = require('colage');
const {JSDOM} = require('jsdom');

/**
 * Douban Schema.
 *
 * @param {Object} schema
 * @return {Object}
 */

module.exports = schema => {

    if (!schema.schema) return {};

    let data = schema.schema;

    if (!data['url'] || !data['name']) return;

    let douban_id = data['url'].replace(/[^0-9]/g, '');
    let names = parseZhName(data['name']);
    let name = (names && names.en)
        ? names.en
        : (names && names.zh)
            ? names.zh
            : '';
    let poster = data['image']
        ? {
            sm: data['image'].split('?')[0].replace(/(s|m|l)_ratio_poster/i, 's_ratio_poster'),
            md: data['image'].split('?')[0].replace(/(s|m|l)_ratio_poster/i, 's_ratio_poster'),
            lg: data['image'].split('?')[0].replace(/(s|m|l)_ratio_poster/i, 'm_ratio_poster'),
            og: data['image'].split('?')[0].replace(/(s|m|l)_ratio_poster/i, 'l_ratio_poster')
        }
        : '';
    let image = data['pic']
        ? data['pic']
        : null;
    let premiere = data['datePublished']
        ? data['datePublished']
        : '';
    let year = premiere
        ? (new Date(premiere)).getFullYear()
        : data['year']
            ? data['year']
            : '';
    let genres = data['genre']
        ? colage.ge(data['genre'].join(','))
        : '';
    let countries = data['countryOfOrigin'] && data['countryOfOrigin'].length
        ? colage.co(data['countryOfOrigin'].map(co => co.name).join(','))
        : '';
    let overview = data['description']
        ? data['description']
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
    let douban_rating = data['aggregateRating'] && data['aggregateRating']['ratingValue']
        ? parseFloat(data['aggregateRating']['ratingValue']) * 10
        : 0;
    let douban_vote = data['aggregateRating'] && data['aggregateRating']['ratingCount']
        ? parseInt(data['aggregateRating']['ratingCount'])
        : 0;
    let translations = [];
    if (names && names.en) {
        if (/[а-яё]/i.test(names.en)) {
            translations.push({
                country: 'RU',
                language: 'ru',
                name: names.en
            });
        }
        else {
            translations.push({
                country: 'US',
                language: 'en',
                name: names.en
            });
        }
    }
    if (names && names.zh) {
        translations.push({
            country: 'CN',
            language: 'zh',
            name: names.zh,
            overview: overview,
            poster: poster
        })
    }
    let people = [];
    ['director', 'actor', 'author'].forEach(j => {
        if (data[j] && data[j].length) {
            data[j].forEach(p => {
                if (p['@type'] === 'Person') {
                    let douban_id = p['url'].replace(/[^0-9]/g, '');
                    let names = parseZhName(p['name']);
                    let name = names.en || transliterate(names.zh);
                    let department = '';
                    let job = '';
                    if (j === 'director') {
                        department = 'directing';
                        job = 'director';
                    }
                    else if (j === 'actor') {
                        department = 'actors';
                        job = 'actor';
                    }
                    else if (j === 'author') {
                        department = 'writing';
                        job = '';
                    }
                    let translations = [];
                    if (names && names.zh && !names.en) {
                        translations.push({
                            country: 'US',
                            language: 'en',
                            name: transliterate(names.zh)
                        });
                    }
                    if (names && names.en) {
                        translations.push({
                            country: 'US',
                            language: 'en',
                            name: names.en
                        });
                    }
                    if (names && names.zh) {
                        translations.push({
                            country: 'CN',
                            language: 'zh',
                            name: names.zh
                        });
                    }
                    people.push({
                        douban_id,
                        name,
                        department,
                        job,
                        translations
                    });
                }
            });
        }
    });

    return {
        douban_id,
        name,
        overview,
        year,
        poster,
        image,
        premiere,
        genres,
        countries,
        people,
        douban_rating,
        douban_vote,
        translations
    };

};

module.exports.processed = item => {
    let countries = item.raw.match(/制片国家\/地区:<\/span>(.*?)<br\/>/g);
    if (countries && countries.length) {
        let countryOfOrigin = [];
        (countries[0]
            .replace(/<(?:.|\n)*?>/gm, '')
            .split(/\/|,|:/))
            .forEach(country => {
                country = country
                    .replace(/\s+/g, ' ')
                    .replace(/(^\s*)|(\s*)$/g, '');
                if (['制片国家', '地区'].indexOf(country) + 1) return;
                if (country === '中国大陆') {
                    country = '中国';
                }
                countryOfOrigin.push({
                    "@type": "Country",
                    "name": country
                });
            });
        item.schema['countryOfOrigin'] = countryOfOrigin;
    }
    let year = item.raw.match(/property="v:initialReleaseDate" content="([0-9]{4})"/);
    if (year && year.length) {
        item.schema['year'] = year[0].replace(/[^0-9]/g, '');
    }
    let pic = item.raw.match(/https:\/\/[a-z0-9\-.\/]*?\/img\/trailer\/(small|medium)\/([0-9]{1,11})\.(jpg|png|jpeg|gif)/i);
    if (pic && pic.length) {
        item.schema['pic'] = {
            sm: pic[0].replace(/\/(small|medium)\//i, 'small'),
            md: pic[0].replace(/\/(small|medium)\//i, 'medium'),
            lg: pic[0].replace(/\/(small|medium)\//i, 'medium'),
            og: pic[0].replace(/\/(small|medium)\//i, 'medium'),
        };
    }
    const {document} = (new JSDOM(item.raw)).window;
    let images = document.querySelectorAll('#related-pic li a img');
    if (images && images.length && !item.schema['pic']) {
        images.forEach(image => {
            if (image && image.getAttribute('src') && !item.schema['pic'] &&
                /p[0-9]{1,11}\./.test(image.getAttribute('src'))) {
                item.schema['pic'] = {
                    sm: image.getAttribute('src').replace(/\/(s|m|l|sqxs)\//i, '/s/'),
                    md: image.getAttribute('src').replace(/\/(s|m|l|sqxs)\//i, '/m/'),
                    lg: image.getAttribute('src').replace(/\/(s|m|l|sqxs)\//i, '/l/'),
                    og: image.getAttribute('src').replace(/\/(s|m|l|sqxs)\//i, '/l/'),
                };
            }
        });
    }
    return item;
};

const parseZhName = name => {
    name = name
        .replace(/\s+/g, ' ')
        .replace(/(^\s*)|(\s*)$/g, '');
    let zh = /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/iu.test(name)
        ? (name
            .split(/\s[а-яёa-z0-9]/ig)[0])
            .replace(/\s.*?季$/g, '')
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, '')
        : '';
    let en = (name
        .replace(zh, ''))
        .replace(/^.*?季\s?/g, '')
        .replace(/(\s(Season|Сезон)\s[0-9]{1,3})$/g, '')
        .replace(/\s+/g, ' ')
        .replace(/(^\s*)|(\s*)$/g, '');
    if (en && en.replace(/[0-9]/g, '') === '') {
        zh = en;
    }
    return {
        en: en,
        zh: zh
    }
};