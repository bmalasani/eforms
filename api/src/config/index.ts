import dotenv from 'dotenv';

enum ENVIRONMENT {
  DEVElOPMENT = 'development',
  PRODUCTION = 'production',
}

dotenv.config();

const serverDefaultPort = '3000';

export const apiConfig = Object.freeze({
  environment: process.env.NODE_ENV || ENVIRONMENT.DEVElOPMENT,
  port: process.env.PORT || serverDefaultPort,
  database: process.env.MONGO_DB_NAME || 'eforms',
  mongoConnection: process.env.MONGO_CONNECTION || 'mongodb+srv://mongoforms:Apcg%40121994@cluster0.isnebhs.mongodb.net/eforms?retryWrites=true&w=majority',
});
