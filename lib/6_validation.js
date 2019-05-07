const ajv = new (require('ajv'))({removeAdditional: true});
const Downloading = require('downloading');

/**
 * Validation of data.
 *
 * @param {Object} data
 * @return {Object}
 */

module.exports = data => {

    let params = data.params;
    let output = data.output;

    let bar;

    if (params.progress) {
        bar = new Downloading(':bar [:title] :percent', {
            title: 'VALIDATION',
            width: 50,
            total: 1
        });
    }

    return new Promise((resolve, reject) => {
        let validate = ajv.compile(
            {
                $id: 'metafilm',
                type: 'object',
                additionalProperties: false,
                required: ['name'],
                anyOf: [
                    {required: ['imdb_id']},
                    {required: ['tmdb_id']},
                    {required: ['kp_id']},
                    {required: ['douban_id']}
                ],
                properties: {
                    imdb_id: {
                        type: 'string',
                        pattern: '[0-9]{1,11}'
                    },
                    tmdb_id: {
                        type: 'string',
                        pattern: '[0-9]{1,11}'
                    },
                    kp_id: {
                        type: 'string',
                        pattern: '[0-9]{1,11}'
                    },
                    douban_id: {
                        type: 'string',
                        pattern: '[0-9]{1,11}'
                    },
                    facebook_id: {
                        type: 'string',
                        pattern: '[A-Za-z0-9_\\-.]{1,255}',
                    },
                    instagram_id: {
                        type: 'string',
                        pattern: '[A-Za-z0-9_\\-.]{1,255}',
                    },
                    twitter_id: {
                        type: 'string',
                        pattern: '[A-Za-z0-9_\\-.]{1,255}',
                    },
                    vk_id: {
                        type: 'string',
                        pattern: '[A-Za-z0-9_\\-.]{1,255}',
                    },
                    name: {
                        type: 'string',
                        maxLength: 1024
                    },
                    year: {
                        type: 'integer',
                        minimum: 1874,
                        maximum: 2050
                    },
                    image: {
                        type: 'object',
                        properties: {
                            sm: {
                                type: 'string',
                                format: 'uri',
                                maxLength: 255
                            },
                            md: {
                                type: 'string',
                                format: 'uri',
                                maxLength: 255
                            },
                            lg: {
                                type: 'string',
                                format: 'uri',
                                maxLength: 255
                            },
                            og: {
                                type: 'string',
                                format: 'uri',
                                maxLength: 255
                            }
                        }
                    },
                    premiere: {
                        type: 'string',
                        format: 'date'
                    },
                    countries: {
                        type: 'array',
                        items: {
                            type: 'string',
                            enum: ['AF','AX','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AC','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BA','BW','BR','IO','VG','BN','BG','BF','BI','KH','CM','CA','IC','CV','BQ','KY','CF','EA','TD','CL','CN','CX','CC','CO','KM','CG','CD','CK','CR','CI','HR','CU','CW','CY','CZ','DK','DG','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','ET','EZ','FK','FO','FJ','FI','FR','GF','PF','TF','GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','GT','GG','GN','GW','GY','HT','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IM','IL','IT','JM','JP','JE','JO','KZ','KE','KI','XK','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MQ','MR','MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA','NR','NP','NL','NC','NZ','NI','NE','NG','NU','NF','KP','MP','NO','OM','PK','PW','PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','RE','RO','RU','RW','WS','SM','ST','SA','SN','RS','SC','SL','SG','SX','SK','SI','SB','SO','ZA','GS','KR','SS','ES','LK','BL','SH','KN','LC','MF','PM','VC','SD','SR','SJ','SZ','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TK','TO','TT','TA','TN','TR','TM','TC','TV','UM','VI','UG','UA','AE','GB','UN','US','UY','UZ','VU','VA','VE','VN','WF','EH','YE','ZM','ZW',
                                'AB','AA','AK','SQ','AN','HY','AV','AY','EU','CE','ZH','CS','DA','DV','EN','EO','FF','LG','KA','EL','HA','HE','HZ','HI','HO','IG','IA','IU','IK','JA','JV','KL','KS','KK','KV','KO','KJ','KU','LO','LN','GV','MI','NV','ND','NB','NN','NY','OC','OJ','OR','OS','PI','FA','QU','RM','RN','II','SU','SW','TY','TE','TI','TS','UK','UR','VO','WA','FY','WO','XH','YI','YO','ZU']
                        }
                    },
                    genres: {
                        type: 'array',
                        items: {
                            type: 'string',
                            enum: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35']
                        }
                    },
                    imdb_rating: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 100
                    },
                    imdb_vote: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 999999999
                    },
                    tmdb_rating: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 100
                    },
                    tmdb_vote: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 999999999
                    },
                    kp_rating: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 100
                    },
                    kp_vote: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 999999999
                    },
                    douban_rating: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 100
                    },
                    douban_vote: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 999999999
                    },
                    rt_rating: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 100
                    },
                    metacritic_rating: {
                        type: 'integer',
                        minimum: 0,
                        maximum: 100
                    },
                    album_id: {
                        type: 'string',
                        pattern: '[0-9]{1,11}'
                    },
                    translations: {
                        type: 'array',
                        items: {
                            type: 'object',
                            additionalProperties: false,
                            required: ['country', 'language'],
                            anyOf: [
                                {required: ['name']},
                                {required: ['overview']}
                            ],
                            properties: {
                                country: {
                                    type: 'string',
                                    enum: ['AF','AX','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AC','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BA','BW','BR','IO','VG','BN','BG','BF','BI','KH','CM','CA','IC','CV','BQ','KY','CF','EA','TD','CL','CN','CX','CC','CO','KM','CG','CD','CK','CR','CI','HR','CU','CW','CY','CZ','DK','DG','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','ET','EZ','FK','FO','FJ','FI','FR','GF','PF','TF','GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','GT','GG','GN','GW','GY','HT','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IM','IL','IT','JM','JP','JE','JO','KZ','KE','KI','XK','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MQ','MR','MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA','NR','NP','NL','NC','NZ','NI','NE','NG','NU','NF','KP','MP','NO','OM','PK','PW','PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','RE','RO','RU','RW','WS','SM','ST','SA','SN','RS','SC','SL','SG','SX','SK','SI','SB','SO','ZA','GS','KR','SS','ES','LK','BL','SH','KN','LC','MF','PM','VC','SD','SR','SJ','SZ','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TK','TO','TT','TA','TN','TR','TM','TC','TV','UM','VI','UG','UA','AE','GB','UN','US','UY','UZ','VU','VA','VE','VN','WF','EH','YE','ZM','ZW',
                                        'AB','AA','AK','SQ','AN','HY','AV','AY','EU','CE','ZH','CS','DA','DV','EN','EO','FF','LG','KA','EL','HA','HE','HZ','HI','HO','IG','IA','IU','IK','JA','JV','KL','KS','KK','KV','KO','KJ','KU','LO','LN','GV','MI','NV','ND','NB','NN','NY','OC','OJ','OR','OS','PI','FA','QU','RM','RN','II','SU','SW','TY','TE','TI','TS','UK','UR','VO','WA','FY','WO','XH','YI','YO','ZU']
                                },
                                language: {
                                    type: 'string',
                                    enum: ['ab','aa','af','ak','sq','am','ar','an','hy','as','av','ae','ay','az','bm','ba','eu','be','bn','bi','bs','br','bg','my','ca','ch','ce','zh','cu','cv','kw','co','cr','hr','cs','da','dv','nl','dz','en','eo','et','ee','fo','fj','fi','fr','ff','gl','lg','ka','de','el','gn','gu','ht','ha','he','hz','hi','ho','hu','is','io','ig','id','ia','ie','iu','ik','ga','it','ja','jv','kl','kn','kr','ks','kk','km','ki','rw','kv','kg','ko','kj','ku','ky','lo','la','lv','li','ln','lt','lu','lb','mk','mg','ms','ml','mt','gv','mi','mr','mh','mn','na','nv','ng','ne','nd','se','no','nb','nn','ny','oc','oj','or','om','os','pi','ps','fa','pl','pt','pa','qu','ro','rm','rn','ru','sm','sg','sa','sc','gd','sr','sh','sn','ii','sd','si','sk','sl','so','nr','st','es','su','sw','ss','sv','tl','ty','tg','ta','tt','te','th','bo','ti','to','ts','tn','tr','tk','tw','uk','ur','ug','uz','ve','vi','vo','wa','cy','fy','wo','xh','yi','yo','za','zu']
                                },
                                name: {
                                    type: 'string',
                                    maxLength: 255
                                },
                                overview: {
                                    type: 'string'
                                },
                                poster: {
                                    type: 'object',
                                    properties: {
                                        sm: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        },
                                        md: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        },
                                        lg: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        },
                                        og: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        }
                                    }
                                }
                            }
                        }
                    },
                    people: {
                        type: 'array',
                        items: {
                            type: 'object',
                            additionalProperties: false,
                            required: ['name'],
                            anyOf: [
                                {required: ['imdb_id']},
                                {required: ['tmdb_id']},
                                {required: ['kp_id']},
                                {required: ['douban_id']}
                            ],
                            properties: {
                                imdb_id: {
                                    type: 'string',
                                    pattern: '[0-9]{1,11}'
                                },
                                tmdb_id: {
                                    type: 'string',
                                    pattern: '[0-9]{1,11}'
                                },
                                kp_id: {
                                    type: 'string',
                                    pattern: '[0-9]{1,11}'
                                },
                                douban_id: {
                                    type: 'string',
                                    pattern: '[0-9]{1,11}'
                                },
                                facebook_id: {
                                    type: 'string',
                                    pattern: '[A-Za-z0-9_\\-.]{1,255}',
                                },
                                instagram_id: {
                                    type: 'string',
                                    pattern: '[A-Za-z0-9_\\-.]{1,255}',
                                },
                                twitter_id: {
                                    type: 'string',
                                    pattern: '[A-Za-z0-9_\\-.]{1,255}',
                                },
                                vk_id: {
                                    type: 'string',
                                    pattern: '[A-Za-z0-9_\\-.]{1,255}',
                                },
                                name: {
                                    type: 'string',
                                    maxLength: 1024
                                },
                                birthday: {
                                    type: 'string',
                                    format: 'date'
                                },
                                deathday: {
                                    type: 'string',
                                    format: 'date'
                                },
                                gender: {
                                    type: 'integer',
                                    minimum: 0,
                                    maximum: 2,
                                },
                                image: {
                                    type: 'object',
                                    properties: {
                                        sm: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        },
                                        md: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        },
                                        lg: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        },
                                        og: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        }
                                    }
                                },
                                translations: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        additionalProperties: false,
                                        required: ['country', 'language'],
                                        anyOf: [
                                            {required: ['name']},
                                            {required: ['overview']}
                                        ],
                                        properties: {
                                            country: {
                                                type: 'string',
                                                enum: ['AF','AX','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AC','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BA','BW','BR','IO','VG','BN','BG','BF','BI','KH','CM','CA','IC','CV','BQ','KY','CF','EA','TD','CL','CN','CX','CC','CO','KM','CG','CD','CK','CR','CI','HR','CU','CW','CY','CZ','DK','DG','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','ET','EZ','FK','FO','FJ','FI','FR','GF','PF','TF','GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','GT','GG','GN','GW','GY','HT','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IM','IL','IT','JM','JP','JE','JO','KZ','KE','KI','XK','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MQ','MR','MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA','NR','NP','NL','NC','NZ','NI','NE','NG','NU','NF','KP','MP','NO','OM','PK','PW','PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','RE','RO','RU','RW','WS','SM','ST','SA','SN','RS','SC','SL','SG','SX','SK','SI','SB','SO','ZA','GS','KR','SS','ES','LK','BL','SH','KN','LC','MF','PM','VC','SD','SR','SJ','SZ','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TK','TO','TT','TA','TN','TR','TM','TC','TV','UM','VI','UG','UA','AE','GB','UN','US','UY','UZ','VU','VA','VE','VN','WF','EH','YE','ZM','ZW',
                                                    'AB','AA','AK','SQ','AN','HY','AV','AY','EU','CE','ZH','CS','DA','DV','EN','EO','FF','LG','KA','EL','HA','HE','HZ','HI','HO','IG','IA','IU','IK','JA','JV','KL','KS','KK','KV','KO','KJ','KU','LO','LN','GV','MI','NV','ND','NB','NN','NY','OC','OJ','OR','OS','PI','FA','QU','RM','RN','II','SU','SW','TY','TE','TI','TS','UK','UR','VO','WA','FY','WO','XH','YI','YO','ZU']
                                            },
                                            language: {
                                                type: 'string',
                                                enum: ['ab','aa','af','ak','sq','am','ar','an','hy','as','av','ae','ay','az','bm','ba','eu','be','bn','bi','bs','br','bg','my','ca','ch','ce','zh','cu','cv','kw','co','cr','hr','cs','da','dv','nl','dz','en','eo','et','ee','fo','fj','fi','fr','ff','gl','lg','ka','de','el','gn','gu','ht','ha','he','hz','hi','ho','hu','is','io','ig','id','ia','ie','iu','ik','ga','it','ja','jv','kl','kn','kr','ks','kk','km','ki','rw','kv','kg','ko','kj','ku','ky','lo','la','lv','li','ln','lt','lu','lb','mk','mg','ms','ml','mt','gv','mi','mr','mh','mn','na','nv','ng','ne','nd','se','no','nb','nn','ny','oc','oj','or','om','os','pi','ps','fa','pl','pt','pa','qu','ro','rm','rn','ru','sm','sg','sa','sc','gd','sr','sh','sn','ii','sd','si','sk','sl','so','nr','st','es','su','sw','ss','sv','tl','ty','tg','ta','tt','te','th','bo','ti','to','ts','tn','tr','tk','tw','uk','ur','ug','uz','ve','vi','vo','wa','cy','fy','wo','xh','yi','yo','za','zu']
                                            },
                                            name: {
                                                type: 'string',
                                                maxLength: 255
                                            },
                                            overview: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                },
                                department: {
                                    type: 'string',
                                    maxLength: 255
                                },
                                job: {
                                    type: 'string',
                                    maxLength: 255
                                },
                                character: {
                                    type: 'string',
                                    maxLength: 255
                                }
                            }
                        }
                    },
                    episodes: {
                        type: 'array',
                        minItems: 1,
                        items: {
                            type: 'object',
                            required: ['name', 'season', 'episode'],
                            properties: {
                                imdb_id: {
                                    type: 'string',
                                    pattern: '[0-9]{1,11}'
                                },
                                name: {
                                    type: 'string',
                                    maxLength: 255
                                },
                                overview: {
                                    type: 'string'
                                },
                                image: {
                                    type: 'object',
                                    properties: {
                                        sm: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        },
                                        md: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        },
                                        lg: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        },
                                        og: {
                                            type: 'string',
                                            format: 'uri',
                                            maxLength: 255
                                        }
                                    }
                                },
                                premiere: {
                                    type: 'string',
                                    format: 'date'
                                },
                                season: {
                                    type: 'integer',
                                    minimum: 1,
                                    maximum: 100
                                },
                                episode: {
                                    type: 'integer',
                                    minimum: 0,
                                    maximum: 9999
                                },
                                imdb_rating: {
                                    type: 'integer',
                                    minimum: 0,
                                    maximum: 100
                                },
                                imdb_vote: {
                                    type: 'integer',
                                    minimum: 0,
                                    maximum: 999999999
                                },
                                tmdb_rating: {
                                    type: 'integer',
                                    minimum: 0,
                                    maximum: 100
                                },
                                tmdb_vote: {
                                    type: 'integer',
                                    minimum: 0,
                                    maximum: 999999999
                                }
                            }
                        }
                    }
                }
            }
        );
        let valid = validate(output);
        if (valid) {
            if (params.progress) bar.tick(1, {title: 'METAFILM'});
            if (params.progress) return resolve({...params, ...{metafilm: output}});
            return resolve(output);
        }
        else {
            if (params.progress) bar.tick(1, {title: 'ERROR'});
            let errors = validate.errors;
            return reject({
                errors
            });
        }
    });

};