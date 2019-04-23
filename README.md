## What is `metafilm`?

Getting metadata information about films and TV shows (title, actors, genres, etc.) from IMDb, TMDb, Kinopoisk, Douban

## Installation

```bash
npm i metafilm
```

## Usage

Import the library in your code:

```js
const metafilm = require('metafilm');
```

### IMDb

- Movie from `imdb.com`

```js
metafilm.id({imdb_id: '6146586'}).then(movie => {
    console.log(movie);
}).catch(console.error);

// alternative (use string ID '6146586' or 'tt6146586' or 'imdb6146586')

metafilm.id('6146586').then(movie => {
    console.log(movie);
}).catch(console.error);
```

- Movie from `omdbapi.com` (get <a href="http://www.omdbapi.com/apikey.aspx" target="_blank">apikey</a>)

```js
metafilm.id({imdb_id: '5884052', imdb_key: 'apikey'}).then(movie => {
    console.log(movie);
}).catch(console.error);

// alternative (use string ID '5884052' or 'tt5884052' or 'imdb5884052')

metafilm.id('tt5884052', null, 'apikey').then(movie => {
    console.log(movie);
}).catch(console.error);
```

- TV Series from `imdb.com`

```js
metafilm.id({imdb_id: '9561862', season: 1}).then(tv => {
    console.log(tv);
}).catch(console.error);

// alternative (use string ID '9561862' or 'tt9561862' or 'imdb9561862')

metafilm.id('imdb9561862', '1').then(tv => {
    console.log(tv);
}).catch(console.error);
```

- TV Series from `omdbapi.com` (get <a href="http://www.omdbapi.com/apikey.aspx" target="_blank">apikey</a>)

```js
metafilm.id({imdb_id: '9253866', season: '1', imdb_key: 'apikey'}).then(tv => {
    console.log(tv);
}).catch(console.error);

// alternative (use string ID '9253866' or 'tt9253866' or 'imdb9253866')

metafilm.id('9253866', [1], 'apikey').then(tv => {
    console.log(tv);
}).catch(console.error);

```

### TMDb

- Movie from `themoviedb.org` (get <a href="https://www.themoviedb.org/settings/api" target="_blank">api_key</a>)

```js
metafilm.id({tmdb_id: '299534', tmdb_key: 'api_key'}).then(movie => {
    console.log(movie);
}).catch(console.error);

// alternative (use integer ID 299534 or string ID 'tmdb299534')

metafilm.id(299534, null, 'api_key').then(movie => {
    console.log(movie);
}).catch(console.error);
```

- TV Series from `themoviedb.org` (get <a href="https://www.themoviedb.org/settings/api" target="_blank">api_key</a>)

```js
metafilm.id({tmdb_id: '82883', season: [1], tmdb_key: 'api_key'}).then(tv => {
    console.log(tv);
}).catch(console.error);

// alternative (use integer ID 82883 or string ID 'tmdb82883')

metafilm.id('tmdb82883', 1, 'api_key').then(tv => {
    console.log(tv);
}).catch(console.error);
```

### Douban

- Movie/TV Series from `movie.douban.com`

```js
metafilm.id({douban_id: '26662282'}).then(movie => {
    console.log(movie);
}).catch(console.error);

// alternative (use string ID 'douban26662282')

metafilm.id('douban26662282').then(movie => {
    console.log(movie);
}).catch(console.error);
```

### Kinopoisk

- Movie/TV Series from `kinopoisk.ru`
> It is recommended to use the `cookie` setting, otherwise your requests may be blocked.

```js
metafilm.id({kp_id: '1047883'}).then(movie => {
    console.log(movie);
}).catch(console.error);

// alternative (use string ID 'kp1047883')

metafilm.id('kp1047883').then(movie => {
    console.log(movie);
}).catch(console.error);
```

### From all sources

- Movie/TV Series from `imdb.com`, `omdbapi.com`, `themoviedb.org`, `kinopoisk.ru`

```js
metafilm.id({
    "imdb_id": "0944947",
    "tmdb_id": 1399,
    "douban_id": 26584183,
    "kp_id": "464963",
    "season": [7,8],
    "tmdb_key": "e547e17d4e91c3e62a571656cd1ccaff",
    "imdb_key": "966f4f4f"
}).then(tv => {
    console.log(tv);
}).catch(console.error);
```

### Output data

- shortened output (more actors, translations, episodes)

```json
{
   "imdb_id":"0944947",
   "tmdb_id":"1399",
   "douban_id":"3016187",
   "kp_id":"464963",
   "facebook_id":"GameOfThrones",
   "instagram_id":"gameofthrones",
   "twitter_id":"GameOfThrones",
   "name":"Game of Thrones | Игра престолов | 冰與火之歌：權力遊戲",
   "premiere":"2011-04-17",
   "year":2011,
   "genres":[
      "14",
      "1",
      "12",
      "26",
      "3",
      "27"
   ],
   "countries":[
      "US",
      "GB"
   ],
   "imdb_rating":95,
   "imdb_vote":1443985,
   "tmdb_rating":82,
   "tmdb_vote":5599,
   "douban_rating":94,
   "douban_vote":231688,
   "kp_rating":90,
   "kp_vote":249095,
   "rt_rating":0,
   "metacritic_rating":0,
   "image":{
      "sm":"https://image.tmdb.org/t/p/w300/qsD5OHqW7DSnaQ2afwz8Ptht1Xb.jpg",
      "md":"https://image.tmdb.org/t/p/w780/qsD5OHqW7DSnaQ2afwz8Ptht1Xb.jpg",
      "lg":"https://image.tmdb.org/t/p/w1280/qsD5OHqW7DSnaQ2afwz8Ptht1Xb.jpg",
      "og":"https://image.tmdb.org/t/p/original/qsD5OHqW7DSnaQ2afwz8Ptht1Xb.jpg"
   },
   "people":[
      {
         "department":"actors",
         "job":"actor",
         "name":"Emilia Clarke | 艾米莉亚·克拉克 | Эмилия Кларк",
         "character":"Daenerys Targaryen",
         "imdb_id":"3592338",
         "tmdb_id":"1223786",
         "douban_id":"1314668",
         "kp_id":"1830611",
         "gender":1,
         "translations":[
            {
               "country":"US",
               "language":"en",
               "name":"Emilia Clarke"
            },
            {
               "country":"CN",
               "language":"zh",
               "name":"艾米莉亚·克拉克"
            },
            {
               "country":"RU",
               "language":"ru",
               "name":"Эмилия Кларк"
            }
         ],
         "image":{
            "sm":"https://image.tmdb.org/t/p/w45/j7d083zIMhwnKro3tQqDz2Fq1UD.jpg",
            "md":"https://image.tmdb.org/t/p/w185/j7d083zIMhwnKro3tQqDz2Fq1UD.jpg",
            "lg":"https://image.tmdb.org/t/p/h632/j7d083zIMhwnKro3tQqDz2Fq1UD.jpg",
            "og":"https://image.tmdb.org/t/p/original/j7d083zIMhwnKro3tQqDz2Fq1UD.jpg"
         }
      },
      {
         "department":"actors",
         "job":"actor",
         "name":"John Bradley | 约翰·C·布莱德利 | Джон Брэдли",
         "character":"Samwell Tarly",
         "imdb_id":"4263213",
         "tmdb_id":"1010135",
         "douban_id":"1314665",
         "kp_id":"2353578",
         "gender":2,
         "translations":[
            {
               "country":"US",
               "language":"en",
               "name":"John Bradley"
            },
            {
               "country":"CN",
               "language":"zh",
               "name":"约翰·C·布莱德利"
            },
            {
               "country":"RU",
               "language":"ru",
               "name":"Джон Брэдли"
            }
         ],
         "image":{
            "sm":"https://image.tmdb.org/t/p/w45/yrRfy2LUab8i6bjEb0LFEe0wDK2.jpg",
            "md":"https://image.tmdb.org/t/p/w185/yrRfy2LUab8i6bjEb0LFEe0wDK2.jpg",
            "lg":"https://image.tmdb.org/t/p/h632/yrRfy2LUab8i6bjEb0LFEe0wDK2.jpg",
            "og":"https://image.tmdb.org/t/p/original/yrRfy2LUab8i6bjEb0LFEe0wDK2.jpg"
         }
      }
   ],
   "translations":[
      {
         "country":"US",
         "language":"en",
         "name":"Game of Thrones",
         "overview":"Seven noble families fight...",
         "poster":{
            "sm":"https://m.media-amazon.com/images/M/MV5BMjA5NzA5NjMwNl5BMl5BanBnXkFtZTgwNjg2OTk2NzM@._V1_UX100_.jpg",
            "md":"https://m.media-amazon.com/images/M/MV5BMjA5NzA5NjMwNl5BMl5BanBnXkFtZTgwNjg2OTk2NzM@._V1_UX200_.jpg",
            "lg":"https://m.media-amazon.com/images/M/MV5BMjA5NzA5NjMwNl5BMl5BanBnXkFtZTgwNjg2OTk2NzM@._V1_UX400_.jpg",
            "og":"https://m.media-amazon.com/images/M/MV5BMjA5NzA5NjMwNl5BMl5BanBnXkFtZTgwNjg2OTk2NzM@.jpg"
         }
      },
      {
         "country":"RU",
         "language":"ru",
         "name":"Игра престолов",
         "overview":"К концу подходит время благоденствия...",
         "poster":{
            "sm":"https://st.kp.yandex.net/images/film_iphone/iphone90_464963.jpg",
            "md":"https://st.kp.yandex.net/images/film_iphone/iphone180_464963.jpg",
            "lg":"https://st.kp.yandex.net/images/film_iphone/iphone360_464963.jpg",
            "og":"https://st.kp.yandex.net/images/film_big/464963.jpg"
         }
      },
      {
         "country":"CN",
         "language":"zh",
         "name":"权力的游戏",
         "overview":"故事背景是一个虚构的世界...",
         "poster":{
            "sm":"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p896064368.jpg",
            "md":"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p896064368.jpg",
            "lg":"https://img1.doubanio.com/view/photo/m_ratio_poster/public/p896064368.jpg",
            "og":"https://img1.doubanio.com/view/photo/l_ratio_poster/public/p896064368.jpg"
         }
      }
   ],
   "episodes":[
      {
         "imdb_id":"5654088",
         "name":"Dragonstone",
         "premiere":"2017-07-16",
         "season":7,
         "episode":1,
         "imdb_rating":87,
         "imdb_vote":37904,
         "tmdb_rating":83,
         "tmdb_vote":66,
         "overview":"Jon organizes the defense of the North...",
         "image":{
            "sm":"https://image.tmdb.org/t/p/w92/3SB4PUzZAnY6HnZbVbktIZoopGs.jpg",
            "md":"https://image.tmdb.org/t/p/w185/3SB4PUzZAnY6HnZbVbktIZoopGs.jpg",
            "lg":"https://image.tmdb.org/t/p/w300/3SB4PUzZAnY6HnZbVbktIZoopGs.jpg",
            "og":"https://image.tmdb.org/t/p/original/3SB4PUzZAnY6HnZbVbktIZoopGs.jpg"
         }
      },
      {
         "imdb_id":"5655178",
         "name":"Stormborn",
         "premiere":"2017-07-23",
         "season":7,
         "episode":2,
         "imdb_rating":90,
         "imdb_vote":31803,
         "tmdb_rating":82,
         "tmdb_vote":46,
         "overview":"Daenerys receives an unexpected visitor...",
         "image":{
            "sm":"https://image.tmdb.org/t/p/w92/dVf1gfi80js9qyxm78479o4RNUr.jpg",
            "md":"https://image.tmdb.org/t/p/w185/dVf1gfi80js9qyxm78479o4RNUr.jpg",
            "lg":"https://image.tmdb.org/t/p/w300/dVf1gfi80js9qyxm78479o4RNUr.jpg",
            "og":"https://image.tmdb.org/t/p/original/dVf1gfi80js9qyxm78479o4RNUr.jpg"
         }
      }
   ]
}
```

**How to get genres and countries?**

```bash
npm i colage
```

```js
const colage = require('colage');

let en_countries = colage.co([ 'RU', 'DE', 'CN' ], 'en');
console.log(en_countries);  //=> [ 'Russia', 'Germany', 'China' ]

let en_languages = colage.la([ 'ru', 'de', 'zh' ], 'en');
console.log(en_languages);  //=> [ 'Russian', 'German', 'Chinese' ]

let en_genres = colage.ge([ '8', '21', '1' ], 'en');
console.log(en_genres);  //=> [ 'comedy', 'musical', 'action' ]
```

## API

##### `metafilm.id(id, [season], [key])`

### id

**Type:** `Object|String|Number`

```json
{
  "imdb_id": "String|Number",
  "tmdb_id": "String|Number",
  "douban_id": "String|Number",
  "kp_id": "String|Number",
  "season": "String|Number|Array",
  "cookie": {
    "imdb": "Array|String",
    "douban": "Array|String",
    "kp": "Array|String"
  },
  "proxy": {
    "host": "String",
    "port": "Number",
    "auth": {
      "username": "String",
      "password": "String"
    }
  }
}
```

**Example:**

```json
{
  "imdb_id": "0944947",
  "tmdb_id": 1399,
  "douban_id": 26584183,
  "kp_id": "464963",
  "season": [1,2,3,4,5,6,7,8],
  "tmdb_key": "e547e17d4e91c3e62a571656cd1ccaff",
  "imdb_key": "966f4f4f",
  "cookie": {
    "imdb": [
      {
        "name": "hello",
        "value": "world"
      }
    ],
    "douban": "hello=world;hi=baby",
    "kp": [
      {
        "name": "hello",
        "value": "world"
      },
      {
        "name": "hi",
        "value": "baby"
      }
    ]
  },
  "proxy": {
    "host": "192.168.0.1",
    "port": 80,
    "auth": {
      "username": "login",
      "password": "pass"
    }
  }
}
```

**How to use cookie?**
- Install Chrome extensions <a href="https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg" target="_blank">EditThisCookie</a>
- Log in with your username on the website (`imdb`,`douban`,`kp`)
- Click on the cookie icon, then `Export`
- Insert an array of data in the field `{cookie:{website:[cookie]}}`

### season

**Type:** `String|Number|Array`

Required to determine the series (season specified) or movie (season not specified).

**Example:** `'3'`,`'3,4,5'`,`6`,`[7]`,`[8,9]`

### key

**Type:** `String`

Required to receive data from TMDb and OMDb.

**Example:** `'e547e17d4e91c3e62a571656cd1ccaff'`,`'966f4f4f'`

## Running tests

```bash
npm test
```