# Installing

Using npm:

```bash
npm install retry-agent
```

Using git:

```bash
git clone https://github.com/SeizedBots/node-retry-agent.git
```

# Getting Started

To get started, just instantiate `RetryAgent` from the package.

```js
const {RetryAgent} = require('retry-agent');

const agent = new RetryAgent();

//YOUR CODE HERE
```

# Config

There are several options, passed by value, available for instantiating a `RetryAgent`. (Listed values are default.)

```js
new RetryAgent({
    strategy: Strategies.ConstantBackOff, //see Constant Back Off in Strategies
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

- [Constant Back Off](#constant-back-off)
- [Exponential Back Off](#exponential-back-off)
- [Linear Back Off](#linear-back-off)

### Constant Back Off

This strategy (`Strategies.ConstantBackOff`) will retry with a constant delay between each attempt using the `minTimeout` value.

### Exponential Back Off

This strategy (`Strategies.ExponentialBackOff`) will retry with exponentially increasing delays between retries until reaching `maxTimeout` on the final retry.
If `retries` is set to `-1`, `maxTimeout` will be ignored, with the timeout being multiplied by e for each subsequent retry.

### Linear Back Off

This strategy (`Strategies.ExponentialBackOff`) will retry with linearly increasing delays between retries until reaching `maxTimeout` on the final retry.
If `retries` is set to `-1`, `maxTimeout` will be ignored, increasing by `minTimeout` each subsequent retry.

# Usage

- [Create](#create)
- [Execute](#execute)

## Create

This takes a function that returns a promise as an input and returns a new function that executes the code in the given function using the `RetryAgent`'s current `Strategy`.
(NOTE: When the `Strategy` changes for a `RetryAgent`, functions created with that `RetryAgent` will use the new `Strategy`.)

```js
const getExample = agent.create(() => {
    return new Promise((resolve, reject) => {
        axios.get('https://example.com').then(resolve).catch(reject);
    });
});
```

## Execute

This is a helper method that [Create](#create)s and executes the given function using the current `Strategy`.
(NOTE: When the `Strategy` changes for a `RetryAgent`, functions created with that `RetryAgent` will use the new `Strategy`.)

```js
agent.execute((resource) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://example.com/${resource}`).then(resolve).catch(reject);
    });
}, 'stuff');
```

# Strategy Interface

The `Strategy` interface is very simple, taking in a `config` from a `RetryAgent` and the retry attempt number ([1, `config.retry`]).

```js
const {delay} = require('retry-agent');

function myStrategy(config, attempt){
    //YOUR CODE HERE

    return delay(/* timeout in milliseconds */);
}
```

Feel free to make a pull request adding any strategies that might be useful [here](https://github.com/SeizedBots/node-retry-agent/pulls)!

# Delay

The function `delay` is a promise-based alternative to `setTimeout`.
It takes only a timeout in milliseconds as an input and returns a promise that resolves after said timeout.

# Access Patterns

The `retry-agent` module exports the following:

```js
{
    delay: require('./util/delay'),
    RetryAgent: require('./RetryAgent'),
    Strategies: require('./Strategies')
}
```

# Contributing

If you would like to contribute or create an issue, please do so at the official [GitHub page](https://github.com/SeizedBots/node-retry-agent).