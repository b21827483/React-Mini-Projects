import {MongoClient} from "mongodb";
import {encryptPassword} from "../../../utils/passwordHash";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {email, password} = req.body;

        if (!email || !email.match(/^\S+@\S+\.\S+$/) || !password || password.trim() === '') {
            res.status(422).json({message: 'Invalid input.'});
            return;
        }

        const client = await MongoClient.connect('mongodb+srv://bug:D4Tb1Vdnuf5vLvPR@cluster0.jkhsyu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

        const collections = client.db().collection('users');

        const isExistingUser = await collections.findOne({email: email});

        if (isExistingUser) {
            res.status(422).json({message: 'User already exist.'});
            return
        }

        const hashedPassword = await encryptPassword(password);

        await collections.insertOne({email: email, password: hashedPassword});

        res.status(201).json({message: 'Successfully signed up.'});
    }
}