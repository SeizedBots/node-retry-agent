const delay = require('../util/delay');

function exponentialBackOff(config, attempt){
    let timeout = config.minTimeout * (config.retries === -1 ? config.minTimeout * Math.exp(attempt - 1) : Math.pow(config.maxTimeout / config.minTimeout, attempt / config.retries));
    if(config.randomize) timeout += (Math.random() - 0.5) * config.minTimeout;
    return delay(timeout);
}

module.exports = exponentialBackOff;