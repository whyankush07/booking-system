import RedisClient from "ioredis";

export class Redis {
    private q: RedisClient;

    constructor(redisUrl: string) {
        this.q = new RedisClient(redisUrl, {
            enableOfflineQueue: false,
            retryStrategy: (times) => {
                if (times > 5) {
                    return null;
                }
                return Math.min(times * 500, 2000);
            },
        });
    }

    getMessageQueue(): RedisClient {
        return this.q;
    }
}