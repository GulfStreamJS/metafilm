const microdata = require('microdata-node');
const iconv = require('iconv-lite');
const {JSDOM} = require('jsdom');
const axios = require('axios');

const IS = require('./_IS');
const DS = require('./_DS');
const KS = require('./_KS');

/**
 * Schema information.
 *
 * @param {Object} params
 * @return {Object}
 */

module.exports = params => {

    return new Promise(resolve => {
        let proxy = params.proxy || null;
        let cookie = params.cookie || {};
        Promise.all(
            params.data.map((data, i) => get(data, i * 2000, proxy, cookie))
        ).then(data => {
            params.data = data;
            return resolve(params);
        });
    });

};

const get = (item, delay, proxy = null, cookie = {}) => {

    const useragent = () => {
        let w = ['5.1', '6.1', '6.2', '6.3', '10.0'];
        let v = ['65.0.3325.181', '67.0.3396.99', '68.0.3440.106', '69.0.3497.100', '70.0.3538.102'];
        return 'Mozilla/5.0 (Windows NT ' +
            w[Math.floor(Math.random() * w.length)] +
            '; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' +
            v[Math.floor(Math.random() * v.length)] +
            ' Safari/537.36';
    };

    return new Promise(resolve => {
        setTimeout(() => {
            let url = item.url;
            let headers = {
                'User-Agent': useragent(),
                'Cookie': url.indexOf('kinopoisk') + 1
                    ? cookie['kp'] || cookie['kinopoisk']
                        ? cookie['kp'] || cookie['kinopoisk']
                        : ''
                    : url.indexOf('imdb') + 1
                        ? cookie['imdb']
                            ? cookie['imdb']
                            : ''
                        : url.indexOf('douban') + 1
                            ? cookie['douban']
                                ? cookie['douban']
                                : ''
                            : ''
            };
            let responseType = item.source === 'schema'
                ? 'arraybuffer'
                : 'json';
            return axios({url, headers, responseType, proxy})
                .then(res => {
                    item.raw = res.data;
                    return resolve(parse(item));
                })
                .catch(err => {
                    console.log(
                        '\n',
                        err.response
                            ? err.response.status
                            : err,
                        err.response
                            ? err.response.config.url
                            : ''
                    );
                    return resolve(item);
                });
        }, delay || 0);
    });

};

const parse = item => {

    const {origin, hostname} = new URL(item.url);
    item.hostname = hostname;
    item.schema = {};

    if (item.source !== 'schema') {
        item.schema = item.raw;
        delete item.raw;
        return item;
    }

    item.raw = /charset=.?windows-1251/i.test(item.raw)
        ? iconv.encode(iconv.decode(item.raw, 'win1251'), 'utf8').toString()
        : iconv.encode(item.raw, 'utf8').toString();
    const {document} = (new JSDOM(item.raw)).window;

    if (hostname.indexOf('kinopoisk') + 1) {
        let actorList = document.querySelector('#actorList > ul:nth-child(4)');
        if (actorList) actorList.remove();
    }

    let schema = microdata.toJson(document.body.innerHTML, {base: origin});
    if (schema && schema.items && schema.items.length) {
        schema.items.forEach(i => {
            if (['type', '@type'].filter(t =>
                i[t] && (
                i[t].indexOf('Movie') + 1 ||
                i[t].indexOf('TVSeries') + 1 ||
                i[t].indexOf('Episode') + 1 ||
                i[t].indexOf('MovieSeries') + 1 ||
                i[t].indexOf('TVEpisode') + 1 ||
                i[t].indexOf('TVSeason') + 1 ||
                i[t].indexOf('http://schema.org/Movie') + 1 ||
                i[t].indexOf('http://schema.org/TVSeries') + 1 ||
                i[t].indexOf('http://schema.org/Episode') + 1 ||
                i[t].indexOf('http://schema.org/MovieSeries') + 1 ||
                i[t].indexOf('http://schema.org/TVEpisode') + 1 ||
                i[t].indexOf('http://schema.org/TVSeason') + 1)
            ).length) {
                item.schema = i;
            }
        });
    }

    let lds = document.querySelectorAll('script[type="application/ld+json"]');
    if (lds && lds.length) {
        lds.forEach(ld => {
            try {
                let html = ld.innerHTML.replace(/\n/g, '');
                if (
                    html.indexOf('"Movie"') + 1 ||
                    html.indexOf('"TVSeries"') + 1 ||
                    html.indexOf('"Episode"') + 1 ||
                    html.indexOf('"MovieSeries"') + 1 ||
                    html.indexOf('"TVEpisode"') + 1 ||
                    html.indexOf('"TVSeason"') + 1 ||
                    html.indexOf('http://schema.org/Movie') + 1 ||
                    html.indexOf('http://schema.org/TVSeries') + 1 ||
                    html.indexOf('http://schema.org/Episode') + 1 ||
                    html.indexOf('http://schema.org/MovieSeries') + 1 ||
                    html.indexOf('http://schema.org/TVEpisode') + 1 ||
                    html.indexOf('http://schema.org/TVSeason') + 1
                ) {
                    item.schema = JSON.parse(html);
                }
            } catch (e) {
                console.error(e);
            }
        });
    }

    if (hostname.indexOf('imdb') + 1) {
        item = IS.processed(item);
    }
    if (hostname.indexOf('douban') + 1) {
        item = DS.processed(item);
    }
    if (hostname.indexOf('kinopoisk') + 1) {
        item = KS.processed(item);
    }

    if (item && item.raw) {
        delete item.raw;
    }

    return item;
};