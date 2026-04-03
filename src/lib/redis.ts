import Redis from 'ioredis'

const redis = new Redis(process.env.best_of_budapest_kv_REDIS_URL!)

export default redis
