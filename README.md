# Installing

Using npm:

```bash
$ npm install retry-agent
```

Using git:

```bash
$ git clone https://github.com/SeizedBots/retry-agent.git
```

# Getting Started

To get started, just instantiate `RetryAgent` from the package.

```js
const {RetryAgent} = require('retry-agent');

const agent = new RetryAgent();

//YOUR CODE HERE
```

# Config

There are several options, passed by value, available for instantiating a RetryAgent. (Listed values are default.)

```js
new RetryAgent({
    minTimeout: 1000, //min time a between retries (assuming randomized is false) in milliseconds
    maxTimeout: 1000, //max time a between retries (assuming randomized is false) in milliseconds
    randomize: false, //if timing should be slightly randomized (up to minTimeout / 2 more or less for standard strategies)
    retries: 5 //the number of retries done before rejecting (if set to -1, it will retry until it resolves)
});
```

These can be accessed and changed at any time by accessing the `config` property of the agent.

## Strategies

A strategy can be passed to the constructor under the `strategy` property, defaulting to `Strategies.ConstantBackOff`.
This property can be accessed and changed at any time by accessing the `strategy` property of the agent.

### Constant Back Off

This strategy (`Strategies.ConstantBackOff`) will retry with a constant delay between each attempt using the `minTimeout` value.

### Exponential Back Off

This strategy (`Strategies.ExponentialBackOff`) will retry with exponentially increasing delays between retries until reaching `maxTimeout` on the final retry.
If `retries` is set to `-1`, `maxTimeout` will be ignored, with the timeout being multiplied by e for each subsequent retry.

### Linear Back Off

This strategy (`Strategies.ExponentialBackOff`) will retry with linearly increasing delays between retries until reaching `maxTimeout` on the final retry.
If `retries` is set to `-1`, `maxTimeout` will be ignored, increasing by `minTimeout` each subsequent retry.

### Strategy Interface

The `Strategy` interface is very simple, taking in a `config` from a `RetryAgent` and the retry attempt number ([1, `config.retry`]).

```js
const {delay} = require('retry-agent');

function myStrategy(config, attempt){
    //YOUR CODE HERE

    return delay(/* timeout in milliseconds */);
}
```

Feel free to make a pull request adding any strategies that might be useful [here](https://github.com/SeizedBots/retry-agent/pulls)!

### Delay

The function `delay` is a promise-based alternative to `setTimeout`.
It takes only a timeout in milliseconds as an input and returns a promise that resolves after said timeout.

### Access Patterns

The `retry-agent` module exports an the following:

```js
{
    delay: require('./util/delay'),
    RetryAgent: require('./RetryAgent'),
    Strategies: require('./Strategies')
}
```

### Contributing

If you would like to contribute or create an issue, please do so at the official [GitHub page](https://github.com/SeizedBots/retry-agent).