const colage = require('colage');

/**
 * IMDb OMDb.
 *
 * @param {Object} schema
 * @return {Object}
 */

module.exports = schema => {

    if (!schema.schema) return {};

    let data = schema.schema;

    if (typeof data['Episodes'] === 'object') {
        return {
            imdb_id: schema['imdb_id'],
            episodes: data['Episodes'].map(e => {
                return {
                    name: e['Title'] ? e['Title'] : '',
                    premiere: e['Released'] ? e['Released'] : '',
                    season: data['Season'] ? parseInt(data['Season']) : '',
                    episode: e['Episode'] ? parseInt(e['Episode']) : '',
                    imdb_rating: e['imdbRating'] && parseFloat(e['imdbRating'])
                        ? Math.floor(parseFloat(e['imdbRating']) * 10)
                        : '',
                    imdb_id: e['imdbID'] ? e['imdbID'].replace(/[^0-9]/g, '') : ''
                }
            })
        }
    }

    if (!data['Title'] || !data['imdbID']) return;

    let imdb_id = data['imdbID'].replace(/[^0-9]/g, '');
    let name = data['Title']
        .replace(/\s+/g, ' ')
        .replace(/(^\s*)|(\s*)$/g, '');
    let poster = data['Poster'] && data['Poster'] !== 'N/A'
        ? {
            sm: data['Poster'].replace(/@[^@]*?\.jpg/i, '@._V1_UX100_.jpg'),
            md: data['Poster'].replace(/@[^@]*?\.jpg/i, '@._V1_UX200_.jpg'),
            lg: data['Poster'].replace(/@[^@]*?\.jpg/i, '@._V1_UX400_.jpg'),
            og: data['Poster'].replace(/@[^@]*?\.jpg/i, '@.jpg')
        }
        : '';
    let premiere = data['Released'] && data['Released'] !== 'N/A'
        ? formatDate(data['Released'])
        : '';
    let year = data['Year'] && data['Year'] !== 'N/A'
        ? parseInt((data['Year'].split('-'))[0])
        : premiere
            ? (new Date(premiere)).getFullYear()
            : '';
    let countries = data['Country'] && data['Country'] !== 'N/A'
        ? colage.co(data['Country'].replace(/UK/, 'United Kingdom'))
        : '';
    let genres = data['Genre'] && data['Genre'] !== 'N/A'
        ? colage.ge(data['Genre'])
        : '';
    let overview = data['Plot'] && data['Plot'] !== 'N/A'
        ? data['Plot']
            .replace(/\s+/g, ' ')
            .replace(/(^\s*)|(\s*)$/g, '')
        : '';
    let imdb_rating = data['imdbRating'] && data['imdbRating'] !== 'N/A'
        ? parseFloat(data['imdbRating']) * 10
        : 0;
    let imdb_vote = data['imdbVotes'] && data['imdbVotes'] !== 'N/A'
        ? parseInt(data['imdbVotes'].replace(',', ''))
        : 0;
    let rt_rating = (
        data['Ratings'] &&
        data['Ratings'].length &&
        data['Ratings'].filter(r => r['Source'] === 'Rotten Tomatoes').length
    )
        ? parseInt(data['Ratings'].filter(r => r['Source'] === 'Rotten Tomatoes')[0]['Value'])
        : 0;
    let metacritic_rating = (
        data['Ratings'] &&
        data['Ratings'].length &&
        data['Ratings'].filter(r => r['Source'] === 'Metacritic').length
    )
        ? parseInt(data['Ratings'].filter(r => r['Source'] === 'Metacritic')[0]['Value'])
        : 0;
    let translations = [];
    translations.push({
        country: 'US',
        language: 'en',
        name: name,
        overview: overview,
        poster: poster
    });
    let people = [];
    ['Director', 'Actors', 'Writer'].forEach(j => {
        if (data[j] && data[j] !== 'N/A') {
            data[j].split(',').forEach(p => {
                let name = p.trim().split('(')[0].trim();
                let department = '';
                let job = '';
                if (j === 'Director') {
                    department = 'directing';
                    job = 'director';
                } else if (j === 'Actors') {
                    department = 'actors';
                    job = 'actor';
                } else if (j === 'Writer') {
                    department = 'writing';
                    let jobs = p.match(/\((.*?)\)/i);
                    job = (jobs && jobs.length)
                        ? jobs[0].trim()
                        : '';
                }
                let translations = [];
                translations.push({
                    country: 'US',
                    language: 'en',
                    name: name
                });
                people.push({
                    name,
                    department,
                    job,
                    translations
                });
            });
        }
    });

    return {
        imdb_id,
        name,
        overview,
        poster,
        year,
        premiere,
        countries,
        genres,
        people,
        imdb_rating,
        imdb_vote,
        rt_rating,
        metacritic_rating,
        translations
    };

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