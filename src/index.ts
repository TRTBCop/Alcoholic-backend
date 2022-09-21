import express from 'express';
import cors from 'cors';
import { router } from './routes/route';


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = 4000; // 포트 지정

// 서버 실행
app.listen(port, () => {
    console.log("Server listening on port", port)
});

// 주소에 따른 사용할 라우터 지정
app.use('/api/', router);

