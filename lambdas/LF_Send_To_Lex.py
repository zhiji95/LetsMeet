"use strict";

const AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';
const lexruntime = new AWS.LexRuntime();

// send message to Lex
const sendToLex = async (message) => {

    if (message == "\"1\"") {
        message = "1.";
    }
    else if (message == "\"2\"") {
        message = "2.";
    }
    else if (message == "\"3\"") {
        message = "3.";
    }

    const params = {
        botAlias: 'default',
        botName: 'LetsMeetBot',
        inputText: message,
        userId: 'test',
        sessionAttributes: {}
    }

    const result = await lexPromise(params);
    return { res: { message: result.message } };
}

// Promise function for sendToLex
const lexPromise = async (params) => {
    return new Promise((resolve, reject) => {
        lexruntime.postText(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

const done = async ({err, res}) => {
    return {
        statusCode: '200',
        body: err ? err : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}


exports.handler = async (event) => {
    const lexResponse = await sendToLex(event.body);
    const response = await done(lexResponse);
    return response;
}
