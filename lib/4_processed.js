/**
 * Data processing.
 *
 * @param {Object} params
 * @return {Object}
 */

module.exports = params => {
    return new Promise(resolve => {
        Promise.all(
            params.data.map(data => {
                let r =
                    data.type.charAt(0).toUpperCase() +
                    data.source.charAt(0).toUpperCase();
                data.processed = require('./_' + r)(data);
                return data;
            })
        ).then(data => {
            params.data = data;
            return resolve(params);
        });
    });
};