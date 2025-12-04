import Redis from 'ioredis';

const REDIS_URL_FROM_ENV = process.env.REDIS_URL;

if (!REDIS_URL_FROM_ENV) { 
    throw new Error("❌ REDIS_URL is not set in environment variables.");
}

const redisClient = new Redis(REDIS_URL_FROM_ENV);

redisClient.on('connect', () => {
    console.log('✅ Redis Client: Connected successfully!');
});


redisClient.on('error', (err) => { 

    console.error('❌ Redis Connection Error:', err);
    
});

export default redisClient;

