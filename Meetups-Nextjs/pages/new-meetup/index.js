import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";

function NewMeetup() {
    const router = useRouter()

    const meetupFormHandler = async (formData) => {
        const res = await fetch('/api/new-meetup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        });

        router.push('/');
    }

    return <NewMeetupForm onAddMeetup={meetupFormHandler}/>
}

export default NewMeetup;