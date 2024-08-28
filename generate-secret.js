/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const crypto = require('crypto');
const dotenv = require('dotenv');
const path = require('path');

// 生成隨機的 JWT secret
const jwtSecret = crypto.randomBytes(32).toString('hex');

// 定位 .env 文件
const envPath = path.resolve(__dirname, '.env');

// 讀取現有的 .env 文件內容
let envConfig = dotenv.config({ path: envPath }).parsed || {};

// 更新或添加 JWT_SECRET
envConfig.JWT_SECRET = jwtSecret;

// 生成新的 .env 文件內容
const envContent = Object.keys(envConfig)
  .map((key) => `${key}=${envConfig[key]}`)
  .join('\n');

// 將更新後的內容寫回 .env 文件
fs.writeFileSync(envPath, envContent);

console.log('JWT Secret generated and saved to .env:', jwtSecret);
