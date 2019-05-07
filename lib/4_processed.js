const Downloading = require('downloading');

/**
 * Data processing.
 *
 * @param {Object} params
 * @return {Object}
 */

module.exports = params => {

    let bar, si;

    if (params.progress) {
        bar = new Downloading(':bar [:title] :percent', {
            title: 'PROCESSING',
            width: 50,
            total: params.data.length + 1,
            clear: true
        });

        si = setInterval(() => {
            bar.tick(0);
        }, 300);
    }

    return new Promise(resolve => {
        Promise.all(
            params.data.map(data => {
                let r =
                    data.type.charAt(0).toUpperCase() +
                    data.source.charAt(0).toUpperCase();
                if (params.progress) bar.tick(1, {title: r});
                data.processed = require('./_' + r)(data);
                return data;
            })
        ).then(data => {
            if (params.progress) clearInterval(si);
            if (params.progress) bar.tick();
            params.data = data;
            return resolve(params);
        });
    });
};