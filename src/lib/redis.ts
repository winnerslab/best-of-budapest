import Redis from 'ioredis'

const url = process.env.best_of_budapest_kv_REDIS_URL
if (!url) throw new Error('Missing env var: best_of_budapest_kv_REDIS_URL')

const redis = new Redis(url)

export default redis
