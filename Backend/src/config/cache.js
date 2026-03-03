const Redis = require("ioredis").default

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,

})

// connnect server to redis
redis.on("connect", () => {
    console.log("Server is Connected to redis");

})

redis.on("error", (error) => {
    console.log("Redis connection failed", error);
})


module.exports = redis
