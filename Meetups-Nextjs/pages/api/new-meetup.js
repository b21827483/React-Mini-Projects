import {MongoClient} from "mongodb";

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const {title, image, address, description} = req.body;

        const client = await MongoClient.connect('mongodb+srv://bug:NuvH56WQMAsSULW8@cluster0.jkhsyu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        const db = client.db('test');
        const meetupsCollection = db.collection('meetups');

        const result = meetupsCollection.insertOne(req.body)

        res.status(201).json({message: 'Successfully added to meetups.'})
    }
}
