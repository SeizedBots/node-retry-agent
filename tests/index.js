const {delay, RetryAgent, Strategies} = require('../index');

var maxTries = 5;
var tries = 0;

function testFunction(){
    return new Promise((resolve, reject) => {
        if(tries < maxTries){
            tries++;
            reject('Failure');
        }else resolve('Success');
    });
}

delay(1000).then(() => {
    console.log('Waited 1000 ms!');
    
    const retry = new RetryAgent();
    
    retry.execute(testFunction).then(console.log).catch(console.log).then(() => {
        retry.strategy = Strategies.LinearBackOff;
        retry.config.maxTimeout = 10 * 1000;

        tries = 0;
        
        retry.execute(testFunction).then(console.log).catch(console.log).then(() => {
            retry.strategy = Strategies.ExponentialBackOff;
            retry.config.maxTimeout = 10 * 1000;
    
            tries = 0;
            
            retry.execute(testFunction).then(console.log).catch(console.log);
        });
    });
});