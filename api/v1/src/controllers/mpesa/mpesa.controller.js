import express from "express";
import dotenv from "dotenv";
import axios from 'axios'

dotenv.config()

const router = express.Router();


// timestamp
function generateTimestamp() {
    const now = new Date();

    const year = now.getFullYear();
    const month = padZero(now.getMonth() + 1); // Adding 1 because months are zero-indexed
    const date = padZero(now.getDate());
    const hour = padZero(now.getHours());
    const minute = padZero(now.getMinutes());
    const second = padZero(now.getSeconds());

    const timestamp = `${year}${month}${date}${hour}${minute}${second}`;
    return timestamp;
}

function padZero(value) {
    return value < 10 ? `0${value}` : `${value}`;
}

//GET TOKEN MIDDLEAWARE
// GETTING AUTH TOKEN
export const getOuthToken = async (req, res, next) => {
    const consumer_key = process.env.CONSUMER_KEY;
    const consumer_secret = process.env.CONSUMER_SECRET;
    const url = process.env.OAUTHTOKEN_URL;

//     FORM A BUFFER FOR THE NEW CONSUMER KEY AND SECRET
    const buffer = new Buffer.from(consumer_key + ":" + consumer_secret);
    const auth = `Basic ${buffer.toString('base64')}`;

    try {
        let {data} = await axios.get(url, {
            "headers": {
                "Authorization": auth
            }
        })
        req.token = data['access_token'];
        return next();
    } catch (e) {
        console.log(e)
        return res.json({
            success: false,
            message: e.message
        })
    }
}


//STK PUSH CALL
export const lipaNaMpesaOnline = async (req, res) => {
    const token = req.token;
    // token
    const auth = `Bearer ${token}`;
//     timestamp function middleware
    const timestamp = generateTimestamp();
    const url = process.env.LIPA_NA_MPESA_URL
    const shortCode = process.env.SHORT_CODE
    const passKey = process.env.PASSKEY
    const password = new Buffer.from(`${shortCode}${passKey}${timestamp}`).toString('base64')
    const amount = req.body.amount;
    const phoneNumber = req.body.phone; //party sending funds
    let callBackUrl = process.env.CALLBACK_URL;
    let accountReference = req.body.account;
    let transaction_desc = "Testing lipa na mpesa functionality";

//     MAKE THE POST REQUEST
    await axios.post(url,
        {
            "BusinessShortCode": shortCode,
            "Password": password,
            "Timestamp": generateTimestamp(),
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phoneNumber,
            "PartyB": shortCode,
            "PhoneNumber": phoneNumber,
            "CallBackURL": callBackUrl,
            "AccountReference": accountReference,
            "TransactionDesc": transaction_desc
        }, {
            "headers": {
                "Authorization": auth
            }
        }).then(({data}) => {
        console.log(data)
        res.status(200).json(data)
    }).catch(err => {
        console.log(err.message), res.status(400).json(err.message)
    })
}

export const callBack = (req, res) => {
    console.log("STK PUSH CALLBACK");
    const merchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
    const checkoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
    const resultCode = req.body.Body.stkCallback.ResultCode;
    const resultDesc = req.body.Body.stkCallback.ResultDesc;
    const callbackMetadata = req.body.Body.stkCallback.CallbackMetadata;
    const amount = callbackMetadata.Item[0].Value;
    const mpesaReceiptNumber = callbackMetadata.Item[1].Value;
    const transactionDate = callbackMetadata.Item[3].Value;
    const phoneNumber = callbackMetadata.Item[4].Value;

    console.log("MerchantRequestID:", merchantRequestID);
    console.log("CheckoutRequestID:", checkoutRequestID);
    console.log("ResultCode:", resultCode);
    console.log("ResultDesc:", resultDesc);

    console.log("Amount:", amount);
    console.log("MpesaReceiptNumber:", mpesaReceiptNumber);
    console.log("TransactionDate:", transactionDate);
    console.log("PhoneNumber:", phoneNumber);
}