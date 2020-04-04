const redis = require("redis");
const keys = require("./keys");

const fib = (index) => {
  if (index < 2) return 1;

  return fib(index - 1) + fib(index - 2);
};

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

sub.on("message", (channel, index) => {
  redisClient.hset("values", index, fib(parseInt(index)));
});

sub.subscribe("insert");
