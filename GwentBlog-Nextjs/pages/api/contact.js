// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {

  if (req.method === 'POST') {

    const {name, email, message} = req.body;

    if (!name || name.trim() === '' || !email || email.trim() === 0 || !message || message.trim() === 0) {
      res.status(422).json({message: 'Invalid input, please try sending it again.'})
    }

    let client;

    try {
      client = await MongoClient.connect('mongodb+srv://bug:0fkwdsRA6r5wIiiJ@cluster0.jkhsyu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    } catch (err) {
      res.status(500).json({message: 'Could not manage to connect to database.'});
      return;
    }

    const messageInfo =  {name, email, message}

    const db = await client.db();
    const inserted = await db.collection('MESSAGES').insertOne(messageInfo);
    messageInfo.id = inserted.insertedId;

    client.close();

    res.status(200).json({ message: 'Your message successfully stored.', respond: messageInfo});
  }
}