import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './src/route/api';
import LoggerFactory from "./src/util/LoggerFactory";
require('dotenv').config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    LoggerFactory.info(`Server is running on ${process.env.SERVER_URL}:${PORT}`);
});
