module.exports = {
    ConstantBackOff: require('./strategies/constantBackOff'),
    ExponentialBackOff: require('./strategies/exponentialBackOff'),
    LinearBackOff: require('./strategies/linearBackOff')
}