import express from 'express';
import cors from 'cors';
import { router } from './src/routes/route';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path';
import dotenv from 'dotenv'
import axios from 'axios';

const app = express();

// ENV 세팅
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: path.join(__dirname, '../.env.production') })
} else if (process.env.NODE_ENV === 'develop') {
    dotenv.config({ path: path.join(__dirname, './.env.develop') })
} else {
    throw new Error('process.env.NODE_ENV를 설정하지 않았습니다!')
}

// axios 인스턴스 생성
export const axiosInstance = axios.create({
    baseURL: process.env.SITE_URL
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Swagger 문서 생성
const swaggerSpec = YAML.load(path.join(__dirname, String(process.env.SWAGGER_PATH)))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// 포트 지정
const port = 4000;

// 서버 실행
app.listen(port, () => {
    console.log("Server listening on port", port)
});

// 주소에 따른 사용할 라우터 지정
app.use('/api/', router);
