require('dotenv').config()

const config = {
    env: process.env.NODE_ENV  || 'dev',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbServiceName: process.env.DB_SERVICENAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    jwtSecret: process.env.SECRET_KEY as string,
}

export default config;