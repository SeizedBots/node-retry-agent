const {delay, RetryAgent, Strategies} = require('../src/index');

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
    
    const agent = new RetryAgent();
    
    agent.execute(testFunction).then(console.log).catch(console.log).then(() => {
        agent.strategy = Strategies.LinearBackOff;
        agent.config.maxTimeout = 10 * 1000;

        tries = 0;
        
        agent.execute(testFunction).then(console.log).catch(console.log).then(() => {
            agent.strategy = Strategies.ExponentialBackOff;
            agent.config.maxTimeout = 10 * 1000;
    
            tries = 0;
            
            agent.execute(testFunction).then(console.log).catch(console.log);
        });
    });
});