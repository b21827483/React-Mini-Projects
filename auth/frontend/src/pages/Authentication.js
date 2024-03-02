import {json, redirect} from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
    return <AuthForm/>;
}

export default AuthenticationPage;

export async function action({request}) {

    const mode = new URL(request.url).searchParams.get('mode') || 'login';

    if (mode !== 'signup' && mode !== 'login') {
        throw json({message: 'Mode unsupported. Try again with signup or login.'}, {status: 422});
    }

    const data = await request.formData();
    const authFormData = {email: data.get('email'), password: data.get('password')};

    const res = await fetch('http://localhost:8080/' + mode,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(authFormData)
        }
    )

    if (res.status === 422 || res.status === 401) {
        return res;
    }

    if (!res.ok) {
        throw json({message: 'Authentication could not managed'}, {status: 500});
    }

    const respondData = await res.json();
    const token = respondData.token;

    localStorage.setItem('token', token);
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    localStorage.setItem('expiration', expirationTime.toISOString());

    return redirect('/');
}