const colage = require('colage');

/**
 * IMDb TVMaze.
 *
 * @param {Object} schema
 * @return {Object}
 */

module.exports = schema => {

    if (!schema.schema) return {};

    let data = schema.schema;

    if (!data['id'] || !data['name']) return;

    var episodes = data['_embedded'] && typeof data['_embedded']['episodes'] === 'object'
        ? data['_embedded']['episodes'].map(e => {
            return {
                tvmaze_id: e['id'] ? e['id'].toString() : '',
                name: e['name'] ? e['name'] : '',
                overview: e['summary']
                    ? e['summary']
                        .replace(/<[^>]+>/ig, ' ')
                        .replace(/&nbsp;/ig, ' ')
                        .replace(/\s*([«])\s*/g, ' $1')
                        .replace(/\s*([(])\s*/g, ' $1')
                        .replace(/\s*([»])\s*/g, '$1 ')
                        .replace(/\s*([)])\s*/g, '$1 ')
                        .replace(/\s*(\.\.\.|[.,!?])\s*/gi, '$1 ')
                        .replace(/"([^"]*?)"/gi, '«$1»')
                        .replace('"', '\'')
                        .replace(/\s+/g, ' ')
                        .replace(/(^\s*)|(\s*)$/g, '')
                    : '',
                image: e['image'] && e['image']['original'] && e['image']['medium']
                    ? {
                        sm: e['image']['medium'],
                        md: e['image']['medium'],
                        lg: e['image']['original'],
                        og: e['image']['original']
                    }
                    : '',
                premiere: e['airdate'] ? e['airdate'] : '',
                season: e['season'] ? parseInt(e['season']) : '',
                episode: e['number'] ? parseInt(e['number']) : ''
            }})
        : '';

    let imdb_id = schema['imdb_id'].toString();
    let tvmaze_id = data['id'].toString();
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
    let overview = data['summary']
        ? data['summary']
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
    let poster = data['image'] && data['image']['original'] && data['image']['medium']
        ? {
            sm: data['image']['medium'],
            md: data['image']['medium'],
            lg: data['image']['original'],
            og: data['image']['original']
        }
        : '';
    let image = episodes && episodes[0] && episodes[0].image && episodes[0].image.og
        ? episodes[0].image
        : '';
    let premiere = data['premiered']
        ? data['premiered']
        : '';
    let year = premiere
        ? (new Date(premiere)).getFullYear()
        : '';
    let countries = data['network'] && data['network']['country'] && data['network']['country']['code']
        ? data['network']['country']['code']
        : '';
    let genres = data['genres'] && typeof data['genres'] === 'object'
        ? colage.ge(data['genres'].join(','))
        : data['genres'] && typeof data['genres'] === 'string'
            ? colage.ge(data['genres'])
            : '';
    let translations = [];
    translations.push({
        country: 'US',
        language: 'en',
        name: name,
        overview: overview,
        poster: poster
    });
    if (data['_embedded'] && data['_embedded']['akas']) {
        data['_embedded']['akas'].forEach(translate => {
            if (translate['name'] && translate['country'] && translate['country']['code']) {
                translations.push({
                    country: translate['country']['code'],
                    language: colage.c2l(translate['country']['code'])[0],
                    name: translate['name']
                });
            }
        });
    }
    let people = [];
    if (data['_embedded'] && data['_embedded']['cast']) {
        data['_embedded']['cast'].forEach(cast => {
            if (!cast['person'] || !cast['person']['name'] || !cast['person']['id']) return;

            let tvmaze_id = cast['person']['id'].toString();
            let name = cast['person']['name'] || '';
            let gender = cast['person']['gender'] === 'Male'
                ? 1
                : cast['person']['gender'] === 'Female'
                    ? 2
                    : 0;
            let birthday = cast['person']['birthday']
                ? cast['person']['birthday'] || ''
                : '';
            let deathday = cast['person']['deathday']
                ? cast['person']['deathday'] || ''
                : '';
            let character = cast['character']
                ? cast['character']['name'] || ''
                : '';
            if (character && cast['person'].voice) {
                character = character + ' (voice)';
            }
            if (character && cast['person'].self) {
                character = character + ' (self)';
            }
            let image = cast['person']['image'] && cast['person']['image']['original'] && cast['person']['image']['medium']
                ? {
                    sm: cast['character'] && cast['character']['image'] && cast['character']['image']['medium']
                        ? cast['character']['image']['medium']
                        : cast['person']['image']['medium'],
                    md: cast['person']['image']['medium'],
                    lg: cast['character'] && cast['character']['image'] && cast['character']['image']['original']
                        ? cast['character']['image']['original']
                        : cast['person']['image']['original'],
                    og: cast['person']['image']['original']
                }
                : '';
            let department = 'actors';
            let job = cast['person'].voice ? 'voice' : 'actor';
            let translations = [];
            translations.push({
                country: 'US',
                language: 'en',
                name: name
            });
            people.push({
                tvmaze_id,
                name,
                gender,
                birthday,
                deathday,
                character,
                department,
                job,
                image,
                translations
            });
        });
    }
    if (data['_embedded'] && data['_embedded']['crew']) {
        data['_embedded']['crew'].forEach(crew => {
            if (!crew['person'] || !crew['person']['name'] || !crew['person']['id']) return;

            let tvmaze_id = crew['person']['id'].toString();
            let name = crew['person']['name'] || '';
            let gender = crew['person']['gender'] === 'Male'
                ? 1
                : crew['person']['gender'] === 'Female'
                    ? 2
                    : 0;
            let birthday = crew['person']['birthday']
                ? crew['person']['birthday'] || ''
                : '';
            let deathday = crew['person']['deathday']
                ? crew['person']['deathday'] || ''
                : '';
            let image = crew['person']['image'] && crew['person']['image']['original'] && crew['person']['image']['medium']
                ? {
                    sm: crew['person']['image']['medium'],
                    md: crew['person']['image']['medium'],
                    lg: crew['person']['image']['original'],
                    og: crew['person']['image']['original']
                }
                : '';
            let department = colage.j2d(crew['type']) || 'crew';
            let job = crew['type'] || 'other';
            let translations = [];
            translations.push({
                country: 'US',
                language: 'en',
                name: name
            });
            people.push({
                tvmaze_id,
                name,
                gender,
                birthday,
                deathday,
                department,
                job,
                image,
                translations
            });
        });
    }

    return {
        imdb_id,
        tvmaze_id,
        name,
        overview,
        poster,
        year,
        genres,
        countries,
        image,
        premiere,
        people,
        translations,
        episodes
    };

};