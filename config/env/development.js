'use strict';

const CONFIG = {
    version: '1.0.0.0',
    server: {
        host: 'localhost',
        port: process.env.PORT || 3009,
        domain: 'http://localhost:3009'
    },
    api: {
        // url: 'http://localhost:3008'
        url: 'https://api-laboro.amela.vn'
    },
    secret_key: '11nfvsMof10XnUdQEWuxgAZta22'//'11nfvsMof10XnUdQEWuxgAZta22'//'UJ5EUbDyM44pxZupxcaJ4G29ZqqWQSjp'
};

module.exports = CONFIG;   