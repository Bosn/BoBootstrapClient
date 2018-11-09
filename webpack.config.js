function buildConfig(env) {
    const path = `./config/webpack.${env}.config.js`
    return require(path)(env)
}

module.exports = buildConfig;