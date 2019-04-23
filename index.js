/**
 * Getting information about film by ID (IMDb, TMDb, Kinopoisk, Douban)
 *
 * @param {Object|String|Number} id
 * @param {String|Number|Array} [season]
 * @param {String} [key]
 * @return {Object}
 */

module.exports.id = (id, season, key) => {
    if (!id) return Promise.resolve(null);

    let params = {};

    if (typeof id === 'string' || typeof id === 'number') {
        let domain = typeof id === 'string'
            ? id.replace(/[^a-z]/g, '')
                ? id.replace(/[^a-z]/g, '')
                : 'imdb'
            : 'tmdb';
        id = typeof id === 'number'
            ? id.toString()
            : id.replace(/[^0-9]/g, '');
        switch (domain) {
            case 'kp':
                params.kp_id = id;
                break;
            case 'douban':
                params.douban_id = id;
                break;
            case 'tmdb':
                params.tmdb_id = id;
                if (key) params.tmdb_key = key;
                break;
            case 'imdb':
            case 'tt':
                params.imdb_id = id;
                if (key) params.imdb_key = key;
                break;
        }
        if (typeof season !== 'undefined' && season !== null) {
            params.season = typeof season === 'number'
                ? [season.toString()]
                : typeof season === 'string'
                    ? season
                        .split(',')
                        .map(s => s.replace(/[^0-9]/g, ''))
                        .filter(Boolean)
                    : typeof season === 'object'
                        ? season
                            .map(s => s.toString().replace(/[^0-9]/g, ''))
                            .filter(Boolean)
                        : season;
        }
    } else if (typeof id === 'object') {
        Object.keys(id).forEach(i => {
            if (['imdb_id', 'tmdb_id', 'kp_id', 'douban_id'].indexOf(i) + 1) {
                id[i] = typeof id[i] === 'number'
                    ? id[i].toString()
                    : id[i].replace(/[^0-9]/g, '');
            }
            if (i === 'season') {
                id[i] = typeof id[i] === 'number'
                    ? [id[i].toString()]
                    : typeof id[i] === 'string'
                        ? id[i]
                            .split(',')
                            .map(se => se.replace(/[^0-9]/g, ''))
                            .filter(Boolean)
                        : typeof id[i] === 'object'
                            ? id[i]
                                .map(se => se.toString().replace(/[^0-9]/g, ''))
                                .filter(Boolean)
                            : id[i];
            }
            if (i === 'cookie' && typeof id[i] === 'object') {
                Object.keys(id[i]).forEach(domain => {
                    let c = id[i][domain].map(cookie => {
                        return cookie.name + '=' + cookie.value;
                    });
                    id[i][domain] = c.join(';');
                });
            }
            if (id[i]) {
                params[i] = id[i];
            }
        });
    } else {
        return Promise.resolve(null);
    }

    return Promise.resolve(params)
        .then(require('./lib/1_missing'))
        .then(require('./lib/2_urls'))
        .then(require('./lib/3_raw'))
        .then(require('./lib/4_processed'))
        .then(require('./lib/5_output'))
        .then(require('./lib/6_validation'))
};