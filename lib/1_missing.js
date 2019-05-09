const Downloading = require('downloading');
const {JSDOM} = require('jsdom');
const axios = require('axios');

/**
 * Getting the missing information:
 * X season douban_id -> 1 season douban_id
 * douban_id          -> imdb_id
 * tmdb_id            -> imdb_id
 * imdb_id            -> tmdb_id
 *
 * @param {Object} params
 * @return {Object}
 */

module.exports = params => {

    let bar, si;

    if (params.gs) {
        bar = new Downloading(':bar [:title] :percent', {
            title: 'GETTING MISSING INFORMATION',
            width: 50,
            total: 5,
            clear: true
        });

        si = setInterval(() => {
            bar.tick(0);
        }, 300);
    }

    const useragent = () => {
        let w = ['5.1', '6.1', '6.2', '6.3', '10.0'];
        let v = ['65.0.3325.181', '67.0.3396.99', '68.0.3440.106', '69.0.3497.100', '70.0.3538.102'];
        return 'Mozilla/5.0 (Windows NT ' +
            w[Math.floor(Math.random() * w.length)] +
            '; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' +
            v[Math.floor(Math.random() * v.length)] +
            ' Safari/537.36';
    };

    const douban_season = params => {

        if (
            typeof params.douban_id === 'undefined'
        ) {
            return Promise.resolve(params);
        }

        let url = 'https://movie.douban.com/subject/' + params.douban_id + '/';
        let headers = {'User-Agent': useragent()};
        let responseType = 'text';
        let proxy = params.proxy || null;

        return new Promise(resolve => {
            return axios({url, headers, responseType, proxy})
                .then(res => {
                    if (res.data) {
                        const {document} = (new JSDOM(res.data)).window;
                        let option = document.querySelector('#season > option');
                        if (
                            option &&
                            option.innerHTML &&
                            option.innerHTML.replace(/[^0-9]/g, '') === '1'
                        ) {
                            if (option.value.replace(/[^0-9]/g, '') === params.douban_id) {
                                let id = /(title\/tt)([0-9]{1,8})/i.exec(res.data);
                                if (id && id[2]) {
                                    params.imdb_id = id[2];
                                }
                            }
                            else {
                                params.douban_id = option.value.replace(/[^0-9]/g, '');
                            }
                        }
                        else {
                            let id = /(title\/tt)([0-9]{1,8})/i.exec(res.data);
                            if (id && id[2]) {
                                params.imdb_id = id[2];
                            }
                        }
                    }
                    resolve(params);
                })
                .catch(() => {
                    resolve(params);
                });
        });
    };

    const douban_id = params => {

        if (
            typeof params.imdb_id !== 'undefined' ||
            typeof params.douban_id === 'undefined'
        ) {
            return Promise.resolve(params);
        }

        let url = 'https://movie.douban.com/subject/' + params.douban_id + '/';
        let headers = {'User-Agent': useragent()};
        let responseType = 'text';
        let proxy = params.proxy || null;

        return new Promise(resolve => {
            return axios({url, headers, responseType, proxy})
                .then(res => {
                    if (res.data) {
                        let id = /(title\/tt)([0-9]{1,8})/i.exec(res.data);
                        if (id && id[2]) {
                            params.imdb_id = id[2];
                        }
                    }
                    resolve(params);
                })
                .catch(() => {
                    resolve(params);
                });
        });
    };

    const tmdb_id = params => {

        if (
            (
                typeof params.tmdb_id !== 'undefined' ||
                typeof params.imdb_id === 'undefined'
            ) || typeof params.tmdb_key === 'undefined'
        ) {
            return Promise.resolve(params);
        }

        let url = 'https://api.themoviedb.org/3/find/tt' + params.imdb_id + '?' +
            'external_source=imdb_id&api_key=' + params.tmdb_key;
        let headers = {'User-Agent': useragent()};
        let proxy = params.proxy || null;

        return new Promise(resolve => {
            return axios({url, headers, proxy})
                .then(res => {
                    if (
                        res.data &&
                        Object
                            .keys(res.data)
                            .filter(k => res.data[k].length)
                    ) {
                        let k = Object
                            .keys(res.data)
                            .filter(k => res.data[k].length
                                ? res.data[k][0].id
                                : false)
                            .join();
                        params.tmdb_id = res.data[k][0].id.toString();
                    }
                    resolve(params);
                })
                .catch(() => {
                    resolve(params);
                });
        });
    };

    const imdb_id = params => {

        if (
            (
                typeof params.imdb_id !== 'undefined' ||
                typeof params.tmdb_id === 'undefined'
            ) || typeof params.tmdb_key === 'undefined'
        ) {
            return Promise.resolve(params);
        }

        let url = (params.season || params.episode)
            ? 'https://api.themoviedb.org/3/tv/' + params.tmdb_id + '?' +
            'append_to_response=external_ids&api_key=' + params.tmdb_key
            : 'https://api.themoviedb.org/3/movie/' + params.tmdb_id + '?' +
            'append_to_response=external_ids&api_key=' + params.tmdb_key;
        let headers = {'User-Agent': useragent()};
        let proxy = params.proxy || null;

        return new Promise(resolve => {
            return axios({url, headers, proxy})
                .then(res => {
                    if (
                        res.data &&
                        res.data.external_ids &&
                        res.data.external_ids.imdb_id
                    ) {
                        params.imdb_id = res.data.external_ids.imdb_id
                            .toString()
                            .replace(/[^0-9]/ig, '');
                    }
                    resolve(params);
                })
                .catch(() => {
                    resolve(params);
                });
        });
    };

    return Promise.resolve(params)
        .then(params => {
            if (params.gs) bar.tick(1, {title: 'DOUBAN SEASON'});
            return params;
        })
        .then(douban_season)
        .then(params => {
            if (params.gs) bar.tick(1, {title: 'DOUBAN ID'});
            return params;
        })
        .then(douban_id)
        .then(params => {
            if (params.gs) bar.tick(1, {title: 'TMDB ID'});
            return params;
        })
        .then(tmdb_id)
        .then(params => {
            if (params.gs) bar.tick(1, {title: 'IMDB ID'});
            return params;
        })
        .then(imdb_id)
        .then(params => {
            if (params.gs) clearInterval(si);
            if (params.gs) bar.tick();
            return params;
        });
};