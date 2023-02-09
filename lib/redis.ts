// https://makerkit.dev/blog/tutorials/nextjs-redis (I got tired of having redis issues)
import Redis, { RedisOptions } from "ioredis";

const configuration = {
  redis: {
    host: process.env.REDIS_HOST ?? "localhost",
    port: parseInt(process.env.REDIS_PORT ?? "6379"),
    password: process.env.REDIS_PASSWORD ?? null,
  },
};

function getRedisConfiguration(): {
  port: number;
  host: string;
  password: string | null;
} {
  return configuration.redis;
}

export function createRedisInstance(config = getRedisConfiguration()) {
  try {
    const options: RedisOptions = {
      host: config.host,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 3,
      retryStrategy: (times: number) => {
        if (times > 3) {
          console.log(`[Redis] Could not connect after ${times} attempts`);
          return undefined;
        }

        return Math.min(times * 200, 1000);
      },
    };

    if (config.port) {
      options.port = config.port;
    }

    if (config.password) {
      options.password = config.password;
    }

    const redis = new Redis(options);

    redis.on("error", (error: unknown) => {
      console.warn("[Redis] ", error);
    });

    return redis;
  } catch (e) {
    console.log(`[Redis] Could not create a Redis instance`);
  }
}
