const colage = require('colage');
const {JSDOM} = require('jsdom');

/**
 * IMDb Schema.
 *
 * @param {Object} schema
 * @return {Object}
 */

module.exports = schema => {

    if (!schema.schema) return {};

    let data = schema.schema;

    if (typeof data['episodes'] === 'object') {
        return {
            imdb_id: schema['imdb_id'],
            episodes: data['episodes']
        };
    }

    if (!data['url'] || !data['name']) return;

    let imdb_id = data['url'].replace(/[^0-9]/g, '');
    let name = data['name']
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
        .replace(/(^\s*)|(\s*)$/g, '');
    let overview = data['description'] && !(/Know what this is about/i.test(data['description']))
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
    let poster = data['image']
        ? {
            sm: data['image'].replace(/@[^@]*?\.jpg/i, '@._V1_UX100_.jpg'),
            md: data['image'].replace(/@[^@]*?\.jpg/i, '@._V1_UX200_.jpg'),
            lg: data['image'].replace(/@[^@]*?\.jpg/i, '@._V1_UX400_.jpg'),
            og: data['image'].replace(/@[^@]*?\.jpg/i, '@.jpg')
        }
        : '';
    let image = data['trailer'] && data['trailer']['thumbnailUrl']
        ? {
            sm: data['trailer']['thumbnailUrl'].replace(/@[^@]*?\.jpg/i, '@._V1_UX100_.jpg'),
            md: data['trailer']['thumbnailUrl'].replace(/@[^@]*?\.jpg/i, '@._V1_UX200_.jpg'),
            lg: data['trailer']['thumbnailUrl'].replace(/@[^@]*?\.jpg/i, '@._V1_UX400_.jpg'),
            og: data['trailer']['thumbnailUrl'].replace(/@[^@]*?\.jpg/i, '@.jpg')
        }
        : '';
    let premiere = data['datePublished']
        ? data['datePublished']
        : '';
    let year = premiere
        ? (new Date(premiere)).getFullYear()
        : '';
    let genres = data['genre'] && typeof data['genre'] === 'object'
        ? colage.ge(data['genre'].join(','))
        : data['genre'] && typeof data['genre'] === 'string'
            ? colage.ge(data['genre'])
            : '';
    let countries = data['countryOfOrigin'] && data['countryOfOrigin'].length
        ? colage.co(data['countryOfOrigin'].map(co => co.name).join(','))
        : '';
    let imdb_rating = data['aggregateRating'] &&
            data['aggregateRating']['ratingValue'] &&
            parseFloat(data['aggregateRating']['ratingValue'])
        ? parseFloat(data['aggregateRating']['ratingValue']) * 10
        : 0;
    let imdb_vote = data['aggregateRating'] &&
            data['aggregateRating']['ratingCount'] &&
            parseInt(data['aggregateRating']['ratingCount'])
        ? parseInt(data['aggregateRating']['ratingCount'])
        : 0;
    let translations = [];
    translations.push({
        country: 'US',
        language: 'en',
        name: name,
        overview: overview,
        poster: poster
    });
    let people = data['actors'] && data['actors'].length
        ? data['actors']
        : [];
    ['director', 'creator'].forEach(j => {
        if (data[j] && data[j].length) {
            data[j].forEach(p => {
                if (p['@type'] === 'Person') {
                    let department = '';
                    let job = '';
                    if (j === 'director') {
                        department = 'directing';
                        job = 'director';
                    }
                    else if (j === 'creator') {
                        department = 'writing';
                        job = '';
                    }
                    let imdb_id = p['url'].replace(/[^0-9]/g, '');
                    let name = p['name'];
                    let translations = [];
                    translations.push({
                        country: 'US',
                        language: 'en',
                        name: name
                    });
                    people.push({
                        imdb_id,
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
        imdb_id,
        name,
        overview,
        year,
        poster,
        image,
        premiere,
        genres,
        countries,
        people,
        imdb_rating,
        imdb_vote,
        translations
    };

};

module.exports.processed = item => {
    let regex_country = new RegExp('<h4 class="inline">Country:</h4>\n?([^]*?)<div class="txt-block">');
    let match_country = item.raw.match(regex_country);
    if (match_country && match_country.length) {
        const {document} = (new JSDOM('<div>' + match_country[0] + '</div>')).window;
        let items = document.querySelectorAll('a');
        if (items && items.length) {
            let countryOfOrigin = [];
            items.forEach(item => {
                let country = item.innerHTML.trim();
                if (country === 'UK') {
                    country = 'United Kingdom';
                }
                countryOfOrigin.push({
                    "@type": "Country",
                    "name": country
                });
            });
            item.schema['countryOfOrigin'] = countryOfOrigin;
        }
    }
    let regex_episode = new RegExp('<h3 id="episode_top"([^]*?)<div id="sidebar">');
    let match_episode = item.raw.match(regex_episode);
    if (match_episode && match_episode.length) {
        const {document} = (new JSDOM(match_episode[0])).window;
        let textarea = document.createElement('textarea');
        let items = document.querySelectorAll('.eplist .list_item');
        if (items && items.length) {
            let episodes = [];
            items.forEach(item => {
                let episode = {};
                let name = item.querySelector('[itemprop="name"]');
                let imdb_id = item.querySelector('.image a .hover-over-image');
                let ep = item.querySelector('.hover-over-image div');
                let image = item.querySelector('.image img');
                let premiere = item.querySelector('.info .airdate');
                let overview = item.querySelector('.info .item_description');
                let imdb_rating = item.querySelector('.info .ipl-rating-star__rating');
                let imdb_vote = item.querySelector('.info .ipl-rating-star__total-votes');
                if (imdb_id && imdb_id.getAttribute('data-const')) {
                    episode.imdb_id = imdb_id
                        .getAttribute('data-const').replace(/[^0-9]/g, '');
                }
                if (image && image.getAttribute('src')) {
                    episode.image = {
                        sm: image.getAttribute('src').replace(/@[^@]*?\.jpg/i, '@._V1_UX100_.jpg'),
                        md: image.getAttribute('src').replace(/@[^@]*?\.jpg/i, '@._V1_UX200_.jpg'),
                        lg: image.getAttribute('src').replace(/@[^@]*?\.jpg/i, '@._V1_UX400_.jpg'),
                        og: image.getAttribute('src').replace(/@[^@]*?\.jpg/i, '@.jpg')
                    };
                }
                if (name && name.innerHTML) {
                    textarea.innerHTML = name.innerHTML;
                    episode.name = textarea.value
                        .replace(/\s+/g, ' ')
                        .replace(/(^\s*)|(\s*)$/g, '');
                }
                if (ep) {
                    let match = ep.innerHTML.match(/S([0-9]{1,3}), Ep([0-9]{1,3})/i);
                    if (match) {
                        episode.season = parseInt(match[1]);
                        episode.episode = parseInt(match[2]);
                    }
                }
                if (premiere && premiere.innerHTML &&
                    premiere.innerHTML
                        .replace(/a-z0-9\s-/gi, '')
                        .replace(/\s+/g, ' ')
                        .replace(/(^\s*)|(\s*)$/g, '')
                ) {
                    episode.premiere = formatDate(premiere.innerHTML
                        .replace(/a-z0-9\s-/gi, '')
                        .replace(/\s+/g, ' ')
                        .replace(/(^\s*)|(\s*)$/g, ''));
                }
                if (overview && overview.innerHTML && !(/Know what this is about/i.test(overview.innerHTML))) {
                    textarea.innerHTML = overview.innerHTML;
                    episode.overview = textarea.value
                        .replace(/\s+/g, ' ')
                        .replace(/(^\s*)|(\s*)$/g, '');
                }
                if (imdb_rating && imdb_rating.innerHTML && parseFloat(imdb_rating.innerHTML)) {
                    episode.imdb_rating = Math.floor(parseFloat(imdb_rating.innerHTML) * 10);
                }
                if (imdb_vote && imdb_vote.innerHTML && imdb_vote.innerHTML.replace(/[^0-9]/g, '')) {
                    episode.imdb_vote = parseInt(imdb_vote.innerHTML.replace(/[^0-9]/g, ''));
                }
                if (
                    typeof episode.name !== 'undefined' &&
                    typeof episode.season !== 'undefined' &&
                    typeof episode.episode !== 'undefined'
                ) {
                    episodes.push(episode);
                }
            });
            item.schema['episodes'] = episodes;
        }
    }
    let regex_actors = new RegExp('<table class="cast_list">([^]*?)</table>');
    let match_actors = item.raw.match(regex_actors);
    if (match_actors && match_actors.length) {
        const {document} = (new JSDOM(match_actors[0])).window;
        let textarea = document.createElement('textarea');
        let items = document.querySelectorAll('tr');
        if (items && items.length) {
            let actors = [];
            items.forEach(item => {
                var elements = item.querySelectorAll('.toggle-episodes');
                if (elements) {
                    elements.forEach(function (element) {
                        element.parentNode.removeChild(element);
                    });
                }
                let actor = {};
                let imdb_id = item.querySelector('.primary_photo a');
                let name = item.querySelector('.primary_photo a img');
                let image = item.querySelector('.primary_photo a img');
                let character_a = item.querySelector('.character a:not(.toggle-episodes)');
                let character = character_a && character_a.innerHTML
                    ? character_a
                    : item.querySelector('.character');
                actor.department = 'actors';
                actor.job = 'actor';
                if (imdb_id && imdb_id.getAttribute('href')) {
                    actor.imdb_id = imdb_id.getAttribute('href')
                        .split('?')[0]
                        .replace(/[^0-9]/g, '');
                }
                if (name && name.getAttribute('alt')) {
                    actor.name = name.getAttribute('alt')
                        .replace(/\s+/g, ' ')
                        .replace(/(^\s*)|(\s*)$/g, '');
                    textarea.innerHTML = actor.name;
                    actor.name = textarea.value
                        .replace(/\s+/g, ' ')
                        .replace(/(^\s*)|(\s*)$/g, '');
                    actor.translations = [
                        {
                            "country": "US",
                            "language": "en",
                            "name": actor.name
                        }
                    ];
                }
                if (image && image.getAttribute('loadlate')) {
                    actor.image = {
                        sm: image.getAttribute('loadlate').replace(/@[^@]*?\.jpg/i, '@._V1_UX100_.jpg'),
                        md: image.getAttribute('loadlate').replace(/@[^@]*?\.jpg/i, '@._V1_UX200_.jpg'),
                        lg: image.getAttribute('loadlate').replace(/@[^@]*?\.jpg/i, '@._V1_UX400_.jpg'),
                        og: image.getAttribute('loadlate').replace(/@[^@]*?\.jpg/i, '@.jpg')
                    };
                }
                if (character && character.innerHTML) {
                    actor.character = (character.innerHTML
                        .replace(/<\/?[^>]+(>|$)/g, '')
                        .replace(/\/\s\.\.\./g, ''))
                        .replace(/\s+/g, ' ')
                        .replace(/(^\s*)|(\s*)$/g, '');
                    textarea.innerHTML = actor.character;
                    actor.character = textarea.value
                        .replace(/\s+/g, ' ')
                        .replace(/(^\s*)|(\s*)$/g, '');
                }
                if (actor.imdb_id && actor.name) {
                    actors.push(actor);
                }
            });
            item.schema['actors'] = actors;
        }
    }
    return item;
};

const formatDate = date => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};