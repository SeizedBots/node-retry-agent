const delay = require('../util/delay');

function constantBackOff(config, attempt){
    let timeout = config.minTimeout;
    if(config.randomize) timeout += (Math.random() - 0.5) * config.minTimeout;
    return delay(timeout);
}

module.exports = constantBackOff;