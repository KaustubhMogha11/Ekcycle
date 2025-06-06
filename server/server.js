
import express from 'express'
const port = 8000;
const app = express();

import DbConnection from './config/mongoose.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
// import DefaultData from './default.js';
import router from './router/router.js';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', router);


// DbConnection(username, password).then(() => {
    app.listen(port, () => {
        console.log(`✅ Server is running on port: ${port}`);
    });
// }).catch((error) => {
//     console.error('❌ Failed to connect to DB or start server:', error);
//     process.exit(1); // Use 1 for general errors, not 0 (which means successful exit)
// });
