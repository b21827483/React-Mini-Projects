import {redirect} from "react-router-dom";

export function getExpirationDur() {
    const expirationDate = localStorage.getItem('expiration');
    const expiration = new Date(expirationDate);
    const current = new Date();
    return expiration.getTime() - current.getTime();
}

export function GetAuthToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const duration = getExpirationDur();

    if (duration < 0) {
        return 'TOKEN EXPIRED';
    }

    console.log(duration)

    return localStorage.getItem('token');
}

export function tokenLoader() {
    return GetAuthToken();
}

export function checkValidity() {
    const token = GetAuthToken();

    if (!token){
        return redirect('/auth')
    }
}