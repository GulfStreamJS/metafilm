/**
 * TMDb TMDb.
 *
 * @param {Object} schema
 * @return {Object}
 */

module.exports = schema => {

    if (!schema.schema) return {};

    let data = schema.schema;

    if (typeof data['episodes'] === 'object') {
        return {
            tmdb_id: schema['tmdb_id'],
            episodes: data['episodes'].map(e => {
                return {
                    name: e['name']
                        ? e['name']
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
                        : '',
                    overview: e['overview']
                        ? e['overview']
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
                        : '',
                    image: e['still_path']
                        ? {
                            sm: ['https://image.tmdb.org/t/p/w92', e['still_path']].join(''),
                            md: ['https://image.tmdb.org/t/p/w185', e['still_path']].join(''),
                            lg: ['https://image.tmdb.org/t/p/w300', e['still_path']].join(''),
                            og: ['https://image.tmdb.org/t/p/original', e['still_path']].join('')
                        }
                        : '',
                    premiere: e['air_date'] ? e['air_date'] : '',
                    season: data['season_number'] ? parseInt(data['season_number']) : '',
                    episode: e['episode_number'] ? parseInt(e['episode_number']) : '',
                    tmdb_rating: e['vote_average'] ? Math.floor(parseFloat(e['vote_average']) * 10) : 0,
                    tmdb_vote: e['vote_count'] ? parseInt(e['vote_count']) : 0
                }
            })
        }
    }

    if (!data['id'] || (!data['original_title'] && !data['original_name'])) return;

    let tmdb_id = data['id'].toString();
    let name = (data['original_title'] || schema['original_name'])
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
    let overview = data['overview']
        ? data['overview']
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
    let poster = data['poster_path']
        ? {
            sm: ['https://image.tmdb.org/t/p/w92', data['poster_path']].join(''),
            md: ['https://image.tmdb.org/t/p/w185', data['poster_path']].join(''),
            lg: ['https://image.tmdb.org/t/p/w500', data['poster_path']].join(''),
            og: ['https://image.tmdb.org/t/p/original', data['poster_path']].join('')
        }
        : '';
    let image = data['backdrop_path']
        ? {
            sm: ['https://image.tmdb.org/t/p/w300', data['backdrop_path']].join(''),
            md: ['https://image.tmdb.org/t/p/w780', data['backdrop_path']].join(''),
            lg: ['https://image.tmdb.org/t/p/w1280', data['backdrop_path']].join(''),
            og: ['https://image.tmdb.org/t/p/original', data['backdrop_path']].join('')
        }
        : '';
    let premiere = data['release_date']
        ? data['release_date']
        : data['first_air_date']
            ? data['first_air_date']
            : '';
    let year = premiere
        ? (new Date(premiere)).getFullYear()
        : '';
    let genres = '';
    let tmdb_ids = data['genres']
        ? data['genres'].map(genre => genre['id'])
        : '';
    if (tmdb_ids) {
        genres = [];
        let ids = [[], [28, 10759], [], [12, 10759], [16], [], [], [], [35], [], [80], [99], [18], [10751], [14, 10765], [], [], [36], [27], [10762], [10402], [], [9648], [10763], [10768], [10764], [10749], [878, 10765], [], [10766], [], [10767], [53], [10770], [10752, 10768], [37]];
        for (let i = 0; i < tmdb_ids.length; i++) {
            for (let id = 0; id < ids.length; id++) {
                if (ids[id].indexOf(parseInt(tmdb_ids[i])) + 1) {
                    genres.push(id.toString());
                }
            }
        }
    }
    let countries = data['production_countries']
        ? data['production_countries'].map(country => {
            return country['iso_3166_1'];
        })
        : data['origin_country']
            ? data['origin_country'].map(country => {
                return country;
            })
            : '';
    let tmdb_rating = data['vote_average']
        ? parseFloat(data['vote_average']) * 10
        : 0;
    let tmdb_vote = data['vote_count']
        ? parseInt(data['vote_count'])
        : 0;
    let social = {};
    if (data['external_ids'] && (
        data['external_ids']['facebook_id'] ||
        data['external_ids']['instagram_id'] ||
        data['external_ids']['twitter_id']
    )) {
        Object.keys(data['external_ids']).forEach(id => {
            if (['facebook_id', 'instagram_id', 'twitter_id'].indexOf(id) + 1 && data['external_ids'][id]) {
                social[id] = data['external_ids'][id];
            }
        });
    }
    let {facebook_id, instagram_id, twitter_id} = social;
    facebook_id = facebook_id ? facebook_id.replace(/[^0-9a-z\-_]{1,255}/ig, '') : '';
    instagram_id = instagram_id ? instagram_id.replace(/[^0-9a-z\-_]{1,255}/ig, '') : '';
    twitter_id = twitter_id ? twitter_id.replace(/[^0-9a-z\-_]{1,255}/ig, '') : '';
    let translations = [];
    data['translations']['translations'].forEach(translate => {
        if (translate['data']['title'] || translate['data']['overview']) {
            let poster = data['images'] && data['images']['posters'] && data['images']['posters'].length
                ? data['images']['posters'].map(p => {
                    return p['iso_639_1'] === translate['iso_639_1']
                        ? {
                            sm: ['https://image.tmdb.org/t/p/w92', p['file_path']].join(''),
                            md: ['https://image.tmdb.org/t/p/w185', p['file_path']].join(''),
                            lg: ['https://image.tmdb.org/t/p/w500', p['file_path']].join(''),
                            og: ['https://image.tmdb.org/t/p/original', p['file_path']].join('')
                        }
                        : false;
                }).filter(Boolean)
                : '';
            if (translate['iso_639_1'] === data['original_language']) {
                translations.push({
                    country: translate['iso_3166_1'],
                    language: translate['iso_639_1'],
                    name: data['original_title'],
                    overview: translate['data']['overview'],
                    poster: poster && poster.length
                        ? poster[0]
                        : ''
                });
            }
            else {
                translations.push({
                    country: translate['iso_3166_1'],
                    language: translate['iso_639_1'],
                    name: translate['data']['title'] || translate['data']['name'],
                    overview: translate['data']['overview'],
                    poster: poster && poster.length
                        ? poster[0]
                        : ''
                });
            }
            if (translate['iso_639_1'] === 'en' && (translate['data']['title'] || translate['data']['name'])) {
                name = translate['data']['title'] || translate['data']['name'];
            }
            if (translate['iso_639_1'] === 'en' && translate['data']['overview']) {
                overview = translate['data']['overview'];
            }
        }
    });
    let people = [];
    data['credits']['cast'].forEach(cast => {
        if (!cast['name'] || !cast['id']) return;

        let tmdb_id = cast['id'].toString();
        let name = cast['name'] || '';
        let gender = cast['gender'] || 0;
        let character = cast['character'] || '';
        let image = cast['profile_path']
            ? {
                sm: ['https://image.tmdb.org/t/p/w45', cast['profile_path']].join(''),
                md: ['https://image.tmdb.org/t/p/w185', cast['profile_path']].join(''),
                lg: ['https://image.tmdb.org/t/p/h632', cast['profile_path']].join(''),
                og: ['https://image.tmdb.org/t/p/original', cast['profile_path']].join('')
            }
            : '';
        let department = 'actors';
        let job = 'actor';
        let translations = [];
        translations.push({
            country: 'US',
            language: 'en',
            name: name
        });
        people.push({
            tmdb_id,
            name,
            gender,
            character,
            department,
            job,
            image,
            translations
        });
    });
    data['credits']['crew'].forEach(crew => {
        if (!crew['name'] || !crew['id']) return;

        let tmdb_id = crew['id'].toString();
        let name = crew['name'];
        let department = crew['department']
            ? crew['department'].toLowerCase()
            : '';
        let job = crew['job']
            ? crew['job'].toLowerCase()
            : '';
        let gender = crew['gender'];
        let image = crew['profile_path']
            ? {
                sm: ['https://image.tmdb.org/t/p/w45', crew['profile_path']].join(''),
                md: ['https://image.tmdb.org/t/p/w185', crew['profile_path']].join(''),
                lg: ['https://image.tmdb.org/t/p/h632', crew['profile_path']].join(''),
                og: ['https://image.tmdb.org/t/p/original', crew['profile_path']].join('')
            }
            : '';
        let translations = [];
        translations.push({
            country: 'US',
            language: 'en',
            name: name
        });
        people.push({
            tmdb_id,
            name,
            gender,
            department,
            job,
            image,
            translations
        });
    });

    return {
        tmdb_id,
        facebook_id,
        instagram_id,
        twitter_id,
        name,
        overview,
        poster,
        year,
        genres,
        countries,
        image,
        premiere,
        tmdb_rating,
        tmdb_vote,
        people,
        translations
    };

};