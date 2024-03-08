import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {MongoClient} from 'mongodb'
import {checkPassword} from "../../../utils/passwordHash";

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({name: 'credentials', credentials: { email: { label: "Email", type: "email", placeholder: "" },
                                    password: { label: "Password", type: "password" }},
            async authorize(credentials) {

                console.log('auth')

                const client = await MongoClient.connect('mongodb+srv://bug:D4Tb1Vdnuf5vLvPR@cluster0.jkhsyu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

                const collections = client.db().collection('users');

                const user = await collections.findOne({email: credentials.email});

                if (!user) {
                    client.close();
                    throw new Error('No user registered with that email.');
                }

                const isValid = await checkPassword(credentials.password, user.password);

                if (!isValid) {
                    client.close();
                    throw new Error('Entered password does not match.');
                }

                return { email: user.email };

            },
        }),
    ],
});
