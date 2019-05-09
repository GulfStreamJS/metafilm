let {compareTwoStrings} = require('string-similarity');
const Downloading = require('downloading');

/**
 * Merge data.
 *
 * @param {Object} params
 * @return {Object}
 */

module.exports = params => {

    let bar;

    if (params.gs) {
        bar = new Downloading(':bar [:title] :percent', {
            title: 'OUTPUT',
            width: 50,
            total: 2,
            clear: true
        });
        bar.tick(1);
    }

    return new Promise(resolve => {
        let output = {};
        let priorities = ['tmdb_id', 'imdb_id', 'douban_id', 'kp_id'];
        priorities.forEach(priority => {
            let d = JSON.parse(JSON.stringify(params.data));
            d.forEach(p => {
                let processed = p.processed || {};
                if (
                    typeof processed[priority] === 'undefined' ||
                    !processed[priority]
                ) return;
                Object.keys(processed).forEach(key => {
                    if (typeof output[key] === 'undefined') {
                        output[key] = processed[key];
                    } else {
                        if (Array.isArray(processed[key])) {
                            if (typeof processed[key][0] === 'string') {
                                output[key] = [...new Set([...processed[key], ...output[key]])];
                            } else if (typeof processed[key][0] === 'object') {
                                if (key === 'translations') {
                                    if (output[key]) {
                                        processed[key].forEach(str => {
                                            let add = true;
                                            output[key].forEach(out => {
                                                if (
                                                    str.country === out.country &&
                                                    str.language === out.language
                                                ) {
                                                    add = false;
                                                }
                                            });
                                            if (add) {
                                                output[key].push(str);
                                            }
                                            output[key].forEach((out, i) => {
                                                if (
                                                    str.country === out.country &&
                                                    str.language === out.language
                                                ) {
                                                    for (let key in str) {
                                                        if (str.hasOwnProperty(key) && str[key] === '') {
                                                            delete str[key];
                                                        }
                                                    }
                                                    for (let key in out) {
                                                        if (out.hasOwnProperty(key) && out[key] === '') {
                                                            delete out[key];
                                                        }
                                                    }
                                                    output[key][i] = {...str, ...out};
                                                }
                                                if (
                                                    str.poster && str.poster.md.indexOf('amazon') + 1 &&
                                                    out.poster && out.poster.md.indexOf('tmdb') + 1
                                                ) {
                                                    output[key][i].poster = str.poster;
                                                }
                                            });
                                        });
                                    } else {
                                        output[key] = processed[key];
                                    }
                                }
                                else if (key === 'episodes') {
                                    if (output[key]) {
                                        processed[key].forEach(str => {
                                            let add = true;
                                            output[key].forEach(out => {
                                                if (
                                                    str.season === out.season &&
                                                    str.episode === out.episode
                                                ) {
                                                    add = false;
                                                }
                                            });
                                            if (add) {
                                                output[key].push(str);
                                            }
                                            output[key].forEach((out, i) => {
                                                if (
                                                    str.season === out.season &&
                                                    str.episode === out.episode
                                                ) {
                                                    for (let key in str) {
                                                        if (str.hasOwnProperty(key) && str[key] === '') {
                                                            delete str[key];
                                                        }
                                                    }
                                                    for (let key in out) {
                                                        if (out.hasOwnProperty(key) && out[key] === '') {
                                                            delete out[key];
                                                        }
                                                    }
                                                    output[key][i] = {...str, ...out};
                                                }
                                            });
                                        });
                                    } else {
                                        output[key] = processed[key];
                                    }
                                }
                                else if (key === 'people') {
                                    if (output[key]) {
                                        processed[key].forEach(str => {
                                            let add = true;
                                            let str_en = str.translations.filter(t => {
                                                return t.country === 'US' && t.language === 'en'
                                            });
                                            output[key].forEach(out => {
                                                let out_en = out.translations.filter(t => {
                                                    return t.country === 'US' && t.language === 'en'
                                                });
                                                if (
                                                    str_en && str_en.length &&
                                                    out_en && out_en.length &&
                                                    compareTwoStrings(str_en[0].name, out_en[0].name) > 0.7
                                                ) {
                                                    add = false;
                                                }
                                            });
                                            if (add && str_en && str_en.length) {
                                                output[key].push(str);
                                            }
                                            output[key].forEach((out, i) => {
                                                let str_en = str.translations
                                                    ? str.translations.filter(t => {
                                                        return t.country === 'US' && t.language === 'en'
                                                    })
                                                    : '';
                                                let out_en = out.translations
                                                    ? out.translations.filter(t => {
                                                        return t.country === 'US' && t.language === 'en'
                                                    })
                                                    : '';
                                                if (
                                                    str_en && str_en.length &&
                                                    out_en && out_en.length &&
                                                    compareTwoStrings(str_en[0].name, out_en[0].name) > 0.7
                                                ) {
                                                    output[key][i] = {...str, ...out};
                                                    str.translations.forEach(str => {
                                                        let add = true;
                                                        out.translations.forEach(out => {
                                                            if (
                                                                str.country === out.country &&
                                                                str.language === out.language
                                                            ) {
                                                                add = false;
                                                            }
                                                        });
                                                        if (add) {
                                                            output[key][i].translations.push(str);
                                                        }
                                                    });
                                                }
                                            });
                                        });
                                    } else {
                                        output[key] = processed[key];
                                    }
                                }
                            }
                        } else if (typeof processed[key] === 'object') {
                            output[key] = Object.assign({}, processed[key], output[key]);
                        } else if (typeof processed[key] === 'string') {
                            if (processed[key] && !output[key]) {
                                output[key] = processed[key];
                            }
                            if (key === 'premiere') {
                                let d1 = new Date(output[key]);
                                let d2 = new Date(processed[key]);
                                if (d1.getTime() > d2.getTime()) {
                                    output[key] = processed[key];
                                }
                            }
                        }
                    }
                });
            });
        });

        if (output['translations']) {
            output['name'] = output['translations']
                .map(t => t.name ? t.name : false)
                .filter(Boolean)
                .join(' | ');
            output['translations'] = output['translations']
                .map(t => {
                    if (t.name || t.overview) {
                        Object.keys(t).forEach(key => {
                            if (typeof t[key] === 'string' && t[key] === '') {
                                delete t[key];
                            }
                        });
                        return t;
                    }
                    else {
                        return false;
                    }
                })
                .filter(Boolean);
        }
        if (output['episodes']) {
            output['episodes'] = output['episodes']
                .map(e => {
                    if (typeof e.season === 'number' && typeof e.episode === 'number') {
                        Object.keys(e).forEach(key => {
                            if (typeof e[key] === 'string' && e[key] === '') {
                                delete e[key];
                            }
                        });
                        return e;
                    }
                    else {
                        return false;
                    }
                })
                .filter(Boolean);
        }
        if (output['people']) {
            output['people'] = output['people']
                .map(p => {
                    if (p.name) {
                        Object.keys(p).forEach(key => {
                            if (typeof p[key] === 'string' && p[key] === '') {
                                delete p[key];
                            }
                        });
                        return p;
                    }
                    else {
                        return false;
                    }
                })
                .filter(Boolean);
            output['people'].forEach((p, i) => {
                output['people'][i]['name'] = output['people'][i]['translations']
                    .map(t => t.name ? t.name : false)
                    .filter(Boolean)
                    .join(' | ');
            });
        }

        Object.keys(output).forEach(key => {
            if (typeof output[key] === 'string' && output[key] === '') {
                delete output[key];
            }
        });

        if (params.debug) {
            require('fs').writeFileSync('../test/params.json', JSON.stringify(params, null, 2));
            require('fs').writeFileSync('../test/output.json', JSON.stringify(output, null, 2));
        }

        if (params.gs) bar.tick(1);

        delete params.data;

        return resolve({output, params});
    });

};