const delay = require('../util/delay');

function linearBackOff(config, attempt){
    let timeout = config.minTimeout + ((attempt - 1) * (config.maxTimeout - config.minTimeout) / config.retries);
    if(config.randomize) timeout += (Math.random() - 0.5) * config.minTimeout;
    return delay(timeout);
}

module.exports = linearBackOff;