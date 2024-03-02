import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";

function MeetupDetails(props) {

    return <MeetupDetail
        img={props.meetup.img}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}/>
}

export default MeetupDetails;

export async function getStaticPaths(filter, options) {
    const client = await MongoClient.connect('mongodb+srv://bug:NuvH56WQMAsSULW8@cluster0.jkhsyu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db('test');
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({},{_id: 1}).toArray();

    return {
        fallback: true,
        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
    }
}

export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://bug:NuvH56WQMAsSULW8@cluster0.jkhsyu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db('test');
    const meetupsCollection = db.collection('meetups');
    
    const meetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)});
    console.log(meetup)

    return {
        props: {
            meetup: {id: meetup._id.toString(),
                     img: meetup.image,
                     title: meetup.title,
                     description: meetup.description,
                     address: meetup.address}
        }
    }
}