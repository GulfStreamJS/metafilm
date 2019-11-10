const metafilm = require('../');

describe('Movies', function() {
    describe('#id()', function() {
        this.timeout(30000);
        it('get data ID 1047883 from kinopoisk.ru', function (done) {
            metafilm.id({
                "kp_id": "1047883",
                "debug": "kp_id_1047883",
                "cookie": {"kp": [
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1556385470,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "cmtchd",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "MTU1NTc4MDY3MDAzMQ==",
                        "id": 1
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1556990270,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "crookie",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "s4SXEWa1bbvRflj8IE2FCrV4OaQaQOzUfsS3ppVl5yZoyj2fz+YYe3s5SsoVwX463aWSl5LW+ewMGV++A4LPELgFy1E=",
                        "id": 2
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1871140692.239494,
                        "hostOnly": false,
                        "httpOnly": true,
                        "name": "i",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "QKjtLQuGiOSXuXZg1FxW+2TOsfZ+8C5+G3Q4H4JlwP+GJ6YNyt/ORiGe23Ya4LT0QrhufkirvM7H1ZrBUyEurQSlxS0=",
                        "id": 3
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1556990277,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "kpunk",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "1",
                        "id": 4
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1587316695,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "mda_exp_enabled",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "1",
                        "id": 5
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1556385468.376572,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "mobile",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "no",
                        "id": 6
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1555867095,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "noflash",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "true",
                        "id": 7
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "hostOnly": false,
                        "httpOnly": true,
                        "name": "PHPSESSID",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": true,
                        "storeId": "0",
                        "value": "s4sumrj4qv33ltuutn6hvoqq15",
                        "id": 8
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1556385470.287959,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "refresh_yandexuid",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "5344596731519857438",
                        "id": 9
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1555780829,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "sso_status",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "sso.passport.yandex.ru:synchronized",
                        "id": 10
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1555867094.033452,
                        "hostOnly": false,
                        "httpOnly": true,
                        "name": "tc",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "2",
                        "id": 11
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "uid",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": true,
                        "storeId": "0",
                        "value": "20078739",
                        "id": 12
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1555784294.033318,
                        "hostOnly": false,
                        "httpOnly": true,
                        "name": "user_country",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "ru",
                        "id": 13
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 2147483645.239326,
                        "hostOnly": false,
                        "httpOnly": true,
                        "name": "ya_sess_id",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "3:1555780694.5.0.1555780694008:ZEJJTQ:6.1|868349656.0.2|30:180070.526249.-TQOMG9iwyQaCrwCt0akcTYQn7Y",
                        "id": 14
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "hostOnly": false,
                        "httpOnly": true,
                        "name": "yandex_gid",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": true,
                        "storeId": "0",
                        "value": "2",
                        "id": 15
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 2147483645.239415,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "yandex_login",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "mochatest",
                        "id": 16
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "expirationDate": 1871140692.23946,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "yandexuid",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "5344596731519857438",
                        "id": 17
                    },
                    {
                        "domain": ".kinopoisk.ru",
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "ys",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": true,
                        "storeId": "0",
                        "value": "udn.cDptb2NoYXRlc3Q%3D#c_chck.1054960076",
                        "id": 18
                    },
                    {
                        "domain": "www.kinopoisk.ru",
                        "hostOnly": true,
                        "httpOnly": true,
                        "name": "_csrf_csrf_token",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": true,
                        "storeId": "0",
                        "value": "PraNS_nylLWC2A8l5UjF6zSSRGjRk9jxIE_XD09uu18",
                        "id": 19
                    },
                    {
                        "domain": "www.kinopoisk.ru",
                        "hostOnly": true,
                        "httpOnly": true,
                        "name": "desktop_session_key",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": true,
                        "storeId": "0",
                        "value": "a0b6324ed17e324ea8c298bfcc9776f2890cb213245252edc2a366d7c284ece04b1cd7a7be16554cf46d5d33e51761fd3293f223c015ab5b7ceeac3e2ff26a4e8312a88bd07cacc9f645650625fc375ead837b2e4194f991fd7b32403858503d",
                        "id": 20
                    },
                    {
                        "domain": "www.kinopoisk.ru",
                        "hostOnly": true,
                        "httpOnly": true,
                        "name": "desktop_session_key.sig",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": true,
                        "storeId": "0",
                        "value": "jFLeed94uYpt4jqt97mPA8e8yBo",
                        "id": 21
                    },
                    {
                        "domain": "www.kinopoisk.ru",
                        "hostOnly": true,
                        "httpOnly": false,
                        "name": "rheftjdd",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": true,
                        "storeId": "0",
                        "value": "rheftjddVal",
                        "id": 22
                    },
                    {
                        "domain": "www.kinopoisk.ru",
                        "hostOnly": true,
                        "httpOnly": true,
                        "name": "user-geo-country-id",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": true,
                        "storeId": "0",
                        "value": "2",
                        "id": 23
                    },
                    {
                        "domain": "www.kinopoisk.ru",
                        "hostOnly": true,
                        "httpOnly": true,
                        "name": "user-geo-region-id",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": true,
                        "storeId": "0",
                        "value": "2",
                        "id": 24
                    },
                    {
                        "domain": "www.kinopoisk.ru",
                        "expirationDate": 1555782478,
                        "hostOnly": true,
                        "httpOnly": false,
                        "name": "yandex_plus_metrika_cookie",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "true",
                        "id": 25
                    }
                ]}
            }).then(movie => {
                if (movie.year === 2019) return done();
                else return done('Not Found!');
            }).catch(error => {
                if (error && error.errors && error.errors.length) {
                    return done(error.errors.map(e => e.message).join(' | '));
                }
                return done(error);
            });
        });
        it('get data ID 26662282 from movie.douban.com', function (done) {
            metafilm.id({
                "douban_id": "26662282",
                "debug": "douban_id_26662282",
                "cookie": {"douban": [
                    {
                        "domain": ".douban.com",
                        "expirationDate": 1555789795,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "ap_v",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "0,6.0",
                        "id": 1
                    },
                    {
                        "domain": ".douban.com",
                        "expirationDate": 1587318594.100273,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "bid",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "euEDoX84VZk",
                        "id": 2
                    },
                    {
                        "domain": ".douban.com",
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "ck",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": true,
                        "storeId": "0",
                        "value": "KNNC",
                        "id": 3
                    },
                    {
                        "domain": ".douban.com",
                        "hostOnly": false,
                        "httpOnly": true,
                        "name": "dbcl2",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": true,
                        "storeId": "0",
                        "value": "\"195278176:7T7tgQJKZok\"",
                        "id": 4
                    },
                    {
                        "domain": ".douban.com",
                        "expirationDate": 1587318611.179134,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "ll",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "\"108198\"",
                        "id": 5
                    },
                    {
                        "domain": ".douban.com",
                        "expirationDate": 1558374617,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "push_doumail_num",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "0",
                        "id": 6
                    },
                    {
                        "domain": ".douban.com",
                        "expirationDate": 1558374617,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "push_noty_num",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "0",
                        "id": 7
                    }
                ]}
            }).then(movie => {
                if (movie.year === 2019) return done();
                else return done('Not Found!');
            }).catch(error => {
                if (error && error.errors && error.errors.length) {
                    return done(error.errors.map(e => e.message).join(' | '));
                }
                return done(error);
            });
        });
        it('get data ID 299534 from themoviedb.org', function (done) {
            metafilm.id({
                "tmdb_key": "e547e17d4e91f3e62a571655cd1ccaff",
                "tmdb_id": "299534",
                "debug": "tmdb_id_299534"
            }).then(movie => {
                if (movie.year === 2019) return done();
                else return done('Not Found!');
            }).catch(error => {
                if (error && error.errors && error.errors.length) {
                    return done(error.errors.map(e => e.message).join(' | '));
                }
                return done(error);
            });
        });
        it('get data ID 6146586 from imdb.com', function (done) {
            metafilm.id({
                "imdb_id": "6146586",
                "debug": "imdb_id_6146586",
                "cookie": {"imdb": [
                    {
                        "domain": ".imdb.com",
                        "expirationDate": 1587322809,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "adblk",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "adblk_yes",
                        "id": 1
                    },
                    {
                        "domain": ".imdb.com",
                        "expirationDate": 2186506806.182661,
                        "hostOnly": false,
                        "httpOnly": true,
                        "name": "at-main",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "Atza|IwEBIEsXLGQ-yzMst6bfk3jKr6ulqLGngV-y4ZBGCFb3bnw1GcD4-ZLCZQMRHk7mEPir4aAgAqwjEP2_R-FrBQnys7YBMey09T1UBrndHhJyjehIdS20MQAqxpG-1_kNWvgZ4MIFAgTelRHVDnZW5j5q5p6N2ICY1DFinZw6fjY3g30oBSBZ-6kAHjWpJML6EYUyzUJNar52HO6mCxv-mSB807su6xtj2SBpY7WREwOpKgpVn7aoJ0CNaUtkvBNyJH4tuxj09q3S2H0-PVyB9qOKF3tmEWDKI_VkYLS20URwRcZeZBvLRnGp4WgeT_gXr3QcRITES7QzZTAABLpSUoSa_QVBrpcvRbLDG0RLYQFVVnK45wDh7nQ7T0x97RO9pjRFdpwXej4YYCdXDv3sGTN3hqEk",
                        "id": 2
                    },
                    {
                        "domain": ".imdb.com",
                        "expirationDate": 1618945197.441254,
                        "hostOnly": false,
                        "httpOnly": true,
                        "name": "id",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "BCYto20Cts9lrFhKdlWKeMcC5exjQyxQ-xuywjHG7gOsYX8eVZLXxcmjVWz4tJT-HkGopLBYBMrk%0D%0AIkKwzUkGMpAfB05zrQDsqz3Iuck0sxGpdyHTWmBpRAAByHZjIf928r97lYT0880fYGl3UM0F_RjK%0D%0Ang%0D%0A",
                        "id": 3
                    },
                    {
                        "domain": ".imdb.com",
                        "expirationDate": 2186506806.182684,
                        "hostOnly": false,
                        "httpOnly": true,
                        "name": "sess-at-main",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "\"M88RCNQkIHDSFP7tsspqNPN+vpSHkcp+pz7wsqiObjA=\"",
                        "id": 4
                    },
                    {
                        "domain": ".imdb.com",
                        "expirationDate": 3703270442.980965,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "session-id",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "139-3354755-8079538",
                        "id": 5
                    },
                    {
                        "domain": ".imdb.com",
                        "expirationDate": 3703270442.980985,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "session-id-time",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "2186506797",
                        "id": 6
                    },
                    {
                        "domain": ".imdb.com",
                        "expirationDate": 2186506806.182599,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "session-token",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "\"L5ixe8CyG1rTIE/1Vba9EbU7tK7OSOMU+Va0JvvmvambjCYrJvCkjFvCH+z8MH2dMKTBKtjNTTcQMrXWeHkcYhfrWOHXn01kz+ZeaCxttKig54MSpnTEQVQIA3WMKZyaG4KQpY4kzYBgc5GQGfXVqQLLyFupFeZf1DUUZt2mwHfcilMg8f+V503Sy2h9audC6ulgw5MH+fRDLsmtYdjNzc0zORoC3laI16x9h9WpT7o=\"",
                        "id": 7
                    },
                    {
                        "domain": ".imdb.com",
                        "expirationDate": 1618945206.44137,
                        "hostOnly": false,
                        "httpOnly": true,
                        "name": "sid",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "BCYsAvEnMFaFiFs3Un4CDWdcA5T_mi8UbdCnrkMtTdsgfoxMPgP61AqwQRlXVMtUhzC2n-AzvVyv%0D%0A_w5CQV8g7BXqdRJJMhctIwWCvQzvpE6lurXtcZuST5QjIkiDSH_IL0dwSms7KG2iMxjxL2mQZqsb%0D%0A5g%0D%0A",
                        "id": 8
                    },
                    {
                        "domain": ".imdb.com",
                        "expirationDate": 2186506806.182543,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "ubid-main",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "133-4485010-3285445",
                        "id": 9
                    },
                    {
                        "domain": ".imdb.com",
                        "expirationDate": 3703270454.441327,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "uu",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": true,
                        "session": false,
                        "storeId": "0",
                        "value": "BCYmCfmBWocRaKZgzhkh7VO0zSuDSpVmtcE5rqkh-pGKwkKCGQyrnvQ17DE1k6QLnxDSY1exhn3y%0D%0Ay9vr64QZe0Mb1ezTxv0ztSA9nOfKVbLhzvFYwQgcnxfGwVNzcrzP0XHq8wPWLu6vkfkF6R61gH4r%0D%0ACdKCO1SZfm_FgYkP0MJhFo0%0D%0A",
                        "id": 10
                    },
                    {
                        "domain": ".imdb.com",
                        "expirationDate": 2186506806.182626,
                        "hostOnly": false,
                        "httpOnly": false,
                        "name": "x-main",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "\"igMaTO3zCFNOo5RThpT?2U8463zHQvUz7RT3SBXDFcUiaZSyqUADBuQtCU?DyUrE\"",
                        "id": 11
                    },
                    {
                        "domain": "www.imdb.com",
                        "expirationDate": 1616266809,
                        "hostOnly": true,
                        "httpOnly": false,
                        "name": "csm-hit",
                        "path": "/",
                        "sameSite": "no_restriction",
                        "secure": false,
                        "session": false,
                        "storeId": "0",
                        "value": "adb:adblk_yes&t:1555786809358&tb:s-CYJRDY1DG2PA3BTCC6QE|1555786808736",
                        "id": 12
                    }
                ]}
            }).then(movie => {
                if (movie.year === 2019) return done();
                else return done('Not Found!');
            }).catch(error => {
                if (error && error.errors && error.errors.length) {
                    return done(error.errors.map(e => e.message).join(' | '));
                }
                return done(error);
            });
        });
        it('get data ID 5884052 from omdbapi.com', function (done) {
            metafilm.id({
                "imdb_key": "966c4f4f",
                "imdb_id": "5884052",
                "debug": "imdb_id_5884052"
            }).then(movie => {
                if (movie.year === 2019) return done();
                else return done('Not Found!');
            }).catch(error => {
                if (error && error.errors && error.errors.length) {
                    return done(error.errors.map(e => e.message).join(' | '));
                }
                return done(error);
            });
        });
    });
});

describe('TV Series', function() {
    describe('#id()', function() {
        this.timeout(30000);
        it('get data ID 1167154 from kinopoisk.ru', function (done) {
            metafilm.id({
                "kp_id": "1167154",
                "season": 1,
                "debug": "kp_id_1167154",
                "cookie": {"kp": [
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1556385470,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "cmtchd",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "MTU1NTc4MDY3MDAzMQ==",
                            "id": 1
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1556990270,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "crookie",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "s4SXEWa1bbvRflj8IE2FCrV4OaQaQOzUfsS3ppVl5yZoyj2fz+YYe3s5SsoVwX463aWSl5LW+ewMGV++A4LPELgFy1E=",
                            "id": 2
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1871140692.239494,
                            "hostOnly": false,
                            "httpOnly": true,
                            "name": "i",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "QKjtLQuGiOSXuXZg1FxW+2TOsfZ+8C5+G3Q4H4JlwP+GJ6YNyt/ORiGe23Ya4LT0QrhufkirvM7H1ZrBUyEurQSlxS0=",
                            "id": 3
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1556990277,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "kpunk",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "1",
                            "id": 4
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1587316695,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "mda_exp_enabled",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "1",
                            "id": 5
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1556385468.376572,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "mobile",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "no",
                            "id": 6
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1555867095,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "noflash",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "true",
                            "id": 7
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "hostOnly": false,
                            "httpOnly": true,
                            "name": "PHPSESSID",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": true,
                            "storeId": "0",
                            "value": "s4sumrj4qv33ltuutn6hvoqq15",
                            "id": 8
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1556385470.287959,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "refresh_yandexuid",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "5344596731519857438",
                            "id": 9
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1555780829,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "sso_status",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "sso.passport.yandex.ru:synchronized",
                            "id": 10
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1555867094.033452,
                            "hostOnly": false,
                            "httpOnly": true,
                            "name": "tc",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "2",
                            "id": 11
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "uid",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": true,
                            "storeId": "0",
                            "value": "20078739",
                            "id": 12
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1555784294.033318,
                            "hostOnly": false,
                            "httpOnly": true,
                            "name": "user_country",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "ru",
                            "id": 13
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 2147483645.239326,
                            "hostOnly": false,
                            "httpOnly": true,
                            "name": "ya_sess_id",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "3:1555780694.5.0.1555780694008:ZEJJTQ:6.1|868349656.0.2|30:180070.526249.-TQOMG9iwyQaCrwCt0akcTYQn7Y",
                            "id": 14
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "hostOnly": false,
                            "httpOnly": true,
                            "name": "yandex_gid",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": true,
                            "storeId": "0",
                            "value": "2",
                            "id": 15
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 2147483645.239415,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "yandex_login",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "mochatest",
                            "id": 16
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "expirationDate": 1871140692.23946,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "yandexuid",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "5344596731519857438",
                            "id": 17
                        },
                        {
                            "domain": ".kinopoisk.ru",
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "ys",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": true,
                            "storeId": "0",
                            "value": "udn.cDptb2NoYXRlc3Q%3D#c_chck.1054960076",
                            "id": 18
                        },
                        {
                            "domain": "www.kinopoisk.ru",
                            "hostOnly": true,
                            "httpOnly": true,
                            "name": "_csrf_csrf_token",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": true,
                            "storeId": "0",
                            "value": "PraNS_nylLWC2A8l5UjF6zSSRGjRk9jxIE_XD09uu18",
                            "id": 19
                        },
                        {
                            "domain": "www.kinopoisk.ru",
                            "hostOnly": true,
                            "httpOnly": true,
                            "name": "desktop_session_key",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": true,
                            "storeId": "0",
                            "value": "a0b6324ed17e324ea8c298bfcc9776f2890cb213245252edc2a366d7c284ece04b1cd7a7be16554cf46d5d33e51761fd3293f223c015ab5b7ceeac3e2ff26a4e8312a88bd07cacc9f645650625fc375ead837b2e4194f991fd7b32403858503d",
                            "id": 20
                        },
                        {
                            "domain": "www.kinopoisk.ru",
                            "hostOnly": true,
                            "httpOnly": true,
                            "name": "desktop_session_key.sig",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": true,
                            "storeId": "0",
                            "value": "jFLeed94uYpt4jqt97mPA8e8yBo",
                            "id": 21
                        },
                        {
                            "domain": "www.kinopoisk.ru",
                            "hostOnly": true,
                            "httpOnly": false,
                            "name": "rheftjdd",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": true,
                            "storeId": "0",
                            "value": "rheftjddVal",
                            "id": 22
                        },
                        {
                            "domain": "www.kinopoisk.ru",
                            "hostOnly": true,
                            "httpOnly": true,
                            "name": "user-geo-country-id",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": true,
                            "storeId": "0",
                            "value": "2",
                            "id": 23
                        },
                        {
                            "domain": "www.kinopoisk.ru",
                            "hostOnly": true,
                            "httpOnly": true,
                            "name": "user-geo-region-id",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": true,
                            "storeId": "0",
                            "value": "2",
                            "id": 24
                        },
                        {
                            "domain": "www.kinopoisk.ru",
                            "expirationDate": 1555782478,
                            "hostOnly": true,
                            "httpOnly": false,
                            "name": "yandex_plus_metrika_cookie",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "true",
                            "id": 25
                        }
                    ]}
            }).then(tv => {
                if (tv.year === 2019) return done();
                else return done('Not Found!');
            }).catch(error => {
                if (error && error.errors && error.errors.length) {
                    return done(error.errors.map(e => e.message).join(' | '));
                }
                return done(error);
            });
        });
        it('get data ID 27594217 from movie.douban.com', function (done) {
            metafilm.id({
                "douban_id": "27594217",
                "season": 1,
                "debug": "douban_id_27594217",
                "cookie": {"douban": [
                        {
                            "domain": ".douban.com",
                            "expirationDate": 1555789795,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "ap_v",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "0,6.0",
                            "id": 1
                        },
                        {
                            "domain": ".douban.com",
                            "expirationDate": 1587318594.100273,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "bid",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "euEDoX84VZk",
                            "id": 2
                        },
                        {
                            "domain": ".douban.com",
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "ck",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": true,
                            "storeId": "0",
                            "value": "KNNC",
                            "id": 3
                        },
                        {
                            "domain": ".douban.com",
                            "hostOnly": false,
                            "httpOnly": true,
                            "name": "dbcl2",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": true,
                            "storeId": "0",
                            "value": "\"195278176:7T7tgQJKZok\"",
                            "id": 4
                        },
                        {
                            "domain": ".douban.com",
                            "expirationDate": 1587318611.179134,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "ll",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "\"108198\"",
                            "id": 5
                        },
                        {
                            "domain": ".douban.com",
                            "expirationDate": 1558374617,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "push_doumail_num",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "0",
                            "id": 6
                        },
                        {
                            "domain": ".douban.com",
                            "expirationDate": 1558374617,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "push_noty_num",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "0",
                            "id": 7
                        }
                    ]}
            }).then(tv => {
                if (tv.year === 2019) return done();
                else return done('Not Found!');
            }).catch(error => {
                if (error && error.errors && error.errors.length) {
                    return done(error.errors.map(e => e.message).join(' | '));
                }
                return done(error);
            });
        });
        it('get data ID 82883 from themoviedb.org', function (done) {
            metafilm.id({
                "tmdb_key": "e547e17d4e91f3e62a571655cd1ccaff",
                "tmdb_id": "82883",
                "season": 1,
                "debug": "tmdb_id_82883"
            }).then(tv => {
                if (tv.year === 2019) return done();
                else return done('Not Found!');
            }).catch(error => {
                if (error && error.errors && error.errors.length) {
                    return done(error.errors.map(e => e.message).join(' | '));
                }
                return done(error);
            });
        });
        it('get data ID 9561862 from imdb.com', function (done) {
            metafilm.id({
                "imdb_id": "9561862",
                "season": 1,
                "debug": "imdb_id_9561862",
                "cookie": {"imdb": [
                        {
                            "domain": ".imdb.com",
                            "expirationDate": 1587322809,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "adblk",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "adblk_yes",
                            "id": 1
                        },
                        {
                            "domain": ".imdb.com",
                            "expirationDate": 2186506806.182661,
                            "hostOnly": false,
                            "httpOnly": true,
                            "name": "at-main",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "Atza|IwEBIEsXLGQ-yzMst6bfk3jKr6ulqLGngV-y4ZBGCFb3bnw1GcD4-ZLCZQMRHk7mEPir4aAgAqwjEP2_R-FrBQnys7YBMey09T1UBrndHhJyjehIdS20MQAqxpG-1_kNWvgZ4MIFAgTelRHVDnZW5j5q5p6N2ICY1DFinZw6fjY3g30oBSBZ-6kAHjWpJML6EYUyzUJNar52HO6mCxv-mSB807su6xtj2SBpY7WREwOpKgpVn7aoJ0CNaUtkvBNyJH4tuxj09q3S2H0-PVyB9qOKF3tmEWDKI_VkYLS20URwRcZeZBvLRnGp4WgeT_gXr3QcRITES7QzZTAABLpSUoSa_QVBrpcvRbLDG0RLYQFVVnK45wDh7nQ7T0x97RO9pjRFdpwXej4YYCdXDv3sGTN3hqEk",
                            "id": 2
                        },
                        {
                            "domain": ".imdb.com",
                            "expirationDate": 1618945197.441254,
                            "hostOnly": false,
                            "httpOnly": true,
                            "name": "id",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "BCYto20Cts9lrFhKdlWKeMcC5exjQyxQ-xuywjHG7gOsYX8eVZLXxcmjVWz4tJT-HkGopLBYBMrk%0D%0AIkKwzUkGMpAfB05zrQDsqz3Iuck0sxGpdyHTWmBpRAAByHZjIf928r97lYT0880fYGl3UM0F_RjK%0D%0Ang%0D%0A",
                            "id": 3
                        },
                        {
                            "domain": ".imdb.com",
                            "expirationDate": 2186506806.182684,
                            "hostOnly": false,
                            "httpOnly": true,
                            "name": "sess-at-main",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "\"M88RCNQkIHDSFP7tsspqNPN+vpSHkcp+pz7wsqiObjA=\"",
                            "id": 4
                        },
                        {
                            "domain": ".imdb.com",
                            "expirationDate": 3703270442.980965,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "session-id",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "139-3354755-8079538",
                            "id": 5
                        },
                        {
                            "domain": ".imdb.com",
                            "expirationDate": 3703270442.980985,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "session-id-time",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "2186506797",
                            "id": 6
                        },
                        {
                            "domain": ".imdb.com",
                            "expirationDate": 2186506806.182599,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "session-token",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "\"L5ixe8CyG1rTIE/1Vba9EbU7tK7OSOMU+Va0JvvmvambjCYrJvCkjFvCH+z8MH2dMKTBKtjNTTcQMrXWeHkcYhfrWOHXn01kz+ZeaCxttKig54MSpnTEQVQIA3WMKZyaG4KQpY4kzYBgc5GQGfXVqQLLyFupFeZf1DUUZt2mwHfcilMg8f+V503Sy2h9audC6ulgw5MH+fRDLsmtYdjNzc0zORoC3laI16x9h9WpT7o=\"",
                            "id": 7
                        },
                        {
                            "domain": ".imdb.com",
                            "expirationDate": 1618945206.44137,
                            "hostOnly": false,
                            "httpOnly": true,
                            "name": "sid",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "BCYsAvEnMFaFiFs3Un4CDWdcA5T_mi8UbdCnrkMtTdsgfoxMPgP61AqwQRlXVMtUhzC2n-AzvVyv%0D%0A_w5CQV8g7BXqdRJJMhctIwWCvQzvpE6lurXtcZuST5QjIkiDSH_IL0dwSms7KG2iMxjxL2mQZqsb%0D%0A5g%0D%0A",
                            "id": 8
                        },
                        {
                            "domain": ".imdb.com",
                            "expirationDate": 2186506806.182543,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "ubid-main",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "133-4485010-3285445",
                            "id": 9
                        },
                        {
                            "domain": ".imdb.com",
                            "expirationDate": 3703270454.441327,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "uu",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": true,
                            "session": false,
                            "storeId": "0",
                            "value": "BCYmCfmBWocRaKZgzhkh7VO0zSuDSpVmtcE5rqkh-pGKwkKCGQyrnvQ17DE1k6QLnxDSY1exhn3y%0D%0Ay9vr64QZe0Mb1ezTxv0ztSA9nOfKVbLhzvFYwQgcnxfGwVNzcrzP0XHq8wPWLu6vkfkF6R61gH4r%0D%0ACdKCO1SZfm_FgYkP0MJhFo0%0D%0A",
                            "id": 10
                        },
                        {
                            "domain": ".imdb.com",
                            "expirationDate": 2186506806.182626,
                            "hostOnly": false,
                            "httpOnly": false,
                            "name": "x-main",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "\"igMaTO3zCFNOo5RThpT?2U8463zHQvUz7RT3SBXDFcUiaZSyqUADBuQtCU?DyUrE\"",
                            "id": 11
                        },
                        {
                            "domain": "www.imdb.com",
                            "expirationDate": 1616266809,
                            "hostOnly": true,
                            "httpOnly": false,
                            "name": "csm-hit",
                            "path": "/",
                            "sameSite": "no_restriction",
                            "secure": false,
                            "session": false,
                            "storeId": "0",
                            "value": "adb:adblk_yes&t:1555786809358&tb:s-CYJRDY1DG2PA3BTCC6QE|1555786808736",
                            "id": 12
                        }
                    ]}
            }).then(tv => {
                if (tv.year === 2019) return done();
                else return done('Not Found!');
            }).catch(error => {
                if (error && error.errors && error.errors.length) {
                    return done(error.errors.map(e => e.message).join(' | '));
                }
                return done(error);
            });
        });
        it('get data ID 9253866 from omdbapi.com', function (done) {
            metafilm.id({
                "imdb_key": "966c4f4f",
                "imdb_id": "9253866",
                "season": 1,
                "debug": "imdb_id_9253866"
            }).then(tv => {
                if (tv.year === 2019) return done();
                else return done('Not Found!');
            }).catch(error => {
                if (error && error.errors && error.errors.length) {
                    return done(error.errors.map(e => e.message).join(' | '));
                }
                return done(error);
            });
        });
    });
});