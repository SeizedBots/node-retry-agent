const Strategies = require('./Strategies');

function RetryAgent(config = {}){
    this.config = Object.assign({
        minTimeout: 1000,
        maxTimeout: 1000,
        randomize: false,
        retries: 5
    }, config);

    this.strategy = config.strategy || Strategies.ConstantBackOff;

    delete config.strategy;

    function retry(strategy, config, attempt, _function, ...args){
        return new Promise(async (resolve, reject) => {
            try{
                resolve(await _function(...args));
            }catch(err){
                if(config.retries === -1 || attempt <= config.retries){
                    strategy(config, attempt).then(() => {
                        retry(strategy, config, attempt + 1, _function, ...args).then(resolve).catch(reject);
                    });
                }else reject(err);
            }
        });
    }

    this.create = (_function) => {
        return (...args) => {
            return retry(this.strategy, this.config, 1, _function, ...args);
        }
    }

    this.execute = (_function, ...args) => {
        return this.create(_function)(...args);
    }
}

module.exports = RetryAgent;