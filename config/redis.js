const redis = require("redis");

const createRedisClient = async () => {
  const client = redis.createClient("redis://localhost:6379");

  await client
    .connect()
    .then(() => {
      console.log("Redis is connected");
    })
    .catch((error) => {
      console.log("Redis is not connecting");
    });

  return client;
};

module.exports = createRedisClient();
