'use strict';

const CONFIG = {
    version: '1.0.0.0',
    server: {
        host: 'localhost',
        port: process.env.PORT || 3009,
        domain: 'http://localhost:3009'
    },
    // api: {        
    //     url: 'https://thejworks-api.amela.vn'
    // },
    // secret_key: '11nfvsMof10XnUdQEWuxgAZta22'

    api: {    
        url: 'https://api.laboro.jp'
    },
    secret_key: 'UJ5EUbDyM44pxZupxcaJ4G29ZqqWQSjp'
};

module.exports = CONFIG;