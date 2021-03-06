require("dotenv").config()
const line = require('@line/bot-sdk')
const fetch = require("node-fetch")

const {
	CHANNEL_TOKEN,
	CHANNEL_SECRET
  } = process.env

const client = new line.Client(clientConfig);


const API_ROOT = 'https://api.unsplash.com';
  
const handler = async (event, context) => {

	//驗證格式

	// 如果是訊息而且訊息是文字的話
	// 需再拆分
	if (event.type !== 'message' || event.message.type !== 'text') {
		const response = {
			type: 'text',
			text: `我還沒空支援這個格式...`,
		}
		await client.replyMessage(replyToken, response)
	}

	const { replyToken } = event;
    const { text } = event.message;

	//回應方式及內容
	const response = {
		type: 'text',
		text: `我現在只會重覆你講的話：${text}～`,
	}

	//line sdk 回應訊息
	await client.replyMessage(replyToken, response)

	//驗證
	try {
		const response = await fetch(API_ENDPOINT);
		const data = await response.json();
		return { 
			statusCode: 200, 
			body: JSON.stringify({ message: "debug message" }) }
			// 回應內容
			// body: JSON.stringify({ data })
	  } catch (error) {
		console.log(error)
		return {
		  statusCode: 500,
		  body: JSON.stringify({ error: 'Failed fetching data' }),
		}
	  }
}

//輸出
module.exports = { handler }
