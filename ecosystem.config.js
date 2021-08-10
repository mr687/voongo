require('dotenv').config()

module.exports = {
  apps : [{
    name: process.env.APP_NAME,
    script: 'app.js',
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      APP_NAME:process.env.APP_NAME,
      APP_SECRET:process.env.APP_SECRET,
      APP_PORT:process.env.APP_PORT,
      DEPLOY_SSH_KEY:process.env.DEPLOY_SSH_KEY,
      DEPLOY_SSH_USER:process.env.DEPLOY_SSH_USER,
      DEPLOY_SSH_HOST:process.env.DEPLOY_SSH_HOST,
      DEPLOY_SSH_PATH:process.env.DEPLOY_SSH_PATH,
      MONGODB_URI:process.env.MONGODB_URI,
      REDIS_HOST:process.env.REDIS_HOST,
      REDIS_PORT:process.env.REDIS_PORT,
      REDIS_PASSWORD:process.env.REDIS_PASSWORD,
    },
  }],

  deploy : {
    production : {
      key: process.env.DEPLOY_SSH_KEY,
      user : process.env.DEPLOY_SSH_USER,
      host : process.env.DEPLOY_SSH_HOST,
      ref  : 'origin/master',
      repo : 'https://github.com/mr687/voongo.git',
      path : process.env.DEPLOY_SSH_PATH,
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
