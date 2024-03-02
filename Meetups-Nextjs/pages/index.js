import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";


function HomePage(props) {
    return <MeetupList meetups={props.meetups}/>
}

export default HomePage;

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://bug:NuvH56WQMAsSULW8@cluster0.jkhsyu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db('test');
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    return {
        props: {
            meetups: meetups.map(meetup => ({id: meetup._id.toString(), title: meetup.title, image: meetup.image, address: meetup.address, description: meetup.description}))
        },
        revalidate: 10
    }
}

