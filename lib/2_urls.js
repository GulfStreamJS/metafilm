const Downloading = require('downloading');

/**
 * Forming a list of URLs.
 *
 * @param {Object} params
 * @return {Object}
 */

module.exports = params => {

    let bar;

    if (params.progress) {
        bar = new Downloading(':bar [:title] :percent', {
            title: 'URLs',
            width: 50,
            total: 2,
            clear: true
        });
        bar.tick(1);
    }

    return new Promise(resolve => {
        let types = [];
        let data = [];

        let season = params.season ? params.season : undefined;

        if (
            typeof params.tmdb_id !== 'undefined' &&
            typeof params.tmdb_key !== 'undefined'
        ) {
            types.push('tmdb');
        }

        if (
            typeof params.imdb_id !== 'undefined'
        ) {
            types.push('imdb');
        }

        if (
            typeof params.kp_id !== 'undefined'
        ) {
            types.push('kp');
        }

        if (
            typeof params.douban_id !== 'undefined'
        ) {
            types.push('douban');
        }

        if (types.indexOf('imdb') + 1) {
            data.push({
                type: 'imdb',
                source: 'schema',
                imdb_id: params.imdb_id,
                url: 'https://www.imdb.com/title/tt' + params.imdb_id + '/'
            });
            if (season && typeof season === 'object') {
                season.map(season => {
                    data.push({
                        type: 'imdb',
                        source: 'schema',
                        season: season,
                        imdb_id: params.imdb_id,
                        url: 'https://www.imdb.com/title/tt' + params.imdb_id + '/episodes?' +
                            'season=' + season
                    });
                });
            }
            if (typeof params.imdb_key !== 'undefined') {
                let imdb_key = [
                    ('apikey=' + params.imdb_key),
                    ('i=tt' + params.imdb_id)
                ];
                data.push({
                    type: 'imdb',
                    source: 'omdb',
                    imdb_id: params.imdb_id,
                    url: 'https://www.omdbapi.com/?' + imdb_key.join('&')
                });
                if (season && typeof season === 'object') {
                    season.map(season => {
                        data.push({
                            type: 'imdb',
                            source: 'omdb',
                            season: season,
                            imdb_id: params.imdb_id,
                            url: 'https://www.omdbapi.com/?' + imdb_key.join('&') + '&' +
                                'Season=' + season
                        });
                    });
                }
            }
        }
        if (types.indexOf('tmdb') + 1) {
            let tmdb_key = [
                ('api_key=' + params.tmdb_key),
                ('language=en')
            ];
            if (season && typeof season === 'object') {
                data.push({
                    type: 'tmdb',
                    source: 'tmdb',
                    tmdb_id: params.tmdb_id,
                    url: 'https://api.themoviedb.org/3/tv/' +
                        params.tmdb_id + '?append_to_response=alternative_titles,content_ratings,credits,episode_groups,external_ids,images,keywords,recommendations,similar,translations,videos&' + tmdb_key.join('&')
                });
                season.map(season => {
                    data.push({
                        type: 'tmdb',
                        source: 'tmdb',
                        season: season,
                        episode: 'all',
                        tmdb_id: params.tmdb_id,
                        url: 'https://api.themoviedb.org/3/tv/' +
                            params.tmdb_id + '/season/' + season + '?append_to_response=credits,external_ids,images,videos&' + tmdb_key.join('&')
                    });
                });
            } else {
                data.push({
                    type: 'tmdb',
                    source: 'tmdb',
                    tmdb_id: params.tmdb_id,
                    url: 'https://api.themoviedb.org/3/movie/' +
                        params.tmdb_id + '?append_to_response=alternative_titles,credits,external_ids,images,keywords,release_dates,videos,translations,recommendations,similar,lists&' + tmdb_key.join('&')
                });
            }
        }
        if (types.indexOf('kp') + 1) {
            data.unshift({
                type: 'kp',
                source: 'schema',
                kp_id: params.kp_id,
                url: 'https://www.kinopoisk.ru/film/' + params.kp_id + '/'
            });
            data.push({
                type: 'kp',
                source: 'schema',
                kp_id: params.kp_id,
                url: 'https://www.kinopoisk.ru/film/' + params.kp_id + '/cast/'
            });
            if (season && typeof season === 'object') {
                data.push({
                    type: 'kp',
                    source: 'schema',
                    kp_id: params.kp_id,
                    url: 'https://www.kinopoisk.ru/film/' + params.kp_id + '/cast/who_is/director/'
                });
            }
        }
        if (types.indexOf('douban') + 1) {
            data.push({
                type: 'douban',
                source: 'schema',
                douban_id: params.douban_id,
                url: 'https://movie.douban.com/subject/' + params.douban_id + '/'
            });
        }

        params.data = data;

        if (params.progress) bar.tick(1);

        return resolve(params);
    });

};