const redis = require('redis');

async function createRedisClient() {
  const client = redis.createClient("127.0.0.1:6379");

  client.on('connect', () => console.log('Redis is running!'));
  client.on('error', (err) => console.log('Redis is not connecting'));

  await client.connect();

  return client;
}

module.exports = createRedisClient();