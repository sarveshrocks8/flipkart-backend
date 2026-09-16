import express from 'express';
import dotenv from 'dotenv';
import {Connection} from './database/db.js'
import DefaultData from './default.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import Routes from './routes/route.js';
import { v4 as uuid } from 'uuid';

const app = express();
dotenv.config();

//const PORT = 8000;

const DB_USERNAME = process.env.DB_USERNAME;
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;
//#################################
let isConnected = false;
async function connectToMongoDB () {
    Connection(DB_USERNAME, DB_USER_PASSWORD);
    isConnected = true;
}

//add middeleware
app.use((req, res, next) => {
    if(!isConnected){
        connectToMongoDB();
    }
    next();
})
//##########################################

//app.listen(PORT, ()=>console.log(`Server is running on port http://localhost:${PORT}`))



DefaultData();


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//#########################
// app.get('/', (req, res) => {
//     res.send('Flipkart Backend is running');
// });
//##########################
app.use('/', Routes);

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(),
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'https://flipkart-backend-mu.vercel.app/callback'
paytmParams['EMAIL'] = 'sc418760@gmail.com'
paytmParams['MOBILE_NO'] = '1234567852'

export default app;