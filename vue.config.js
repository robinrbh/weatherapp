const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                src: path.resolve(__dirname, 'src'),
                public: path.resolve(__dirname, 'public'),
            }
        },
    },
}
