const webpack = require('webpack');
const { removeModuleScopePlugin } = require('customize-cra');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        url: require.resolve('url/'),
        fs: false,
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        zlib: require.resolve('browserify-zlib'),
        querystring: require.resolve('querystring-es3'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );
    removeModuleScopePlugin()(config);

    return config;
}