import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import LoginSingupForm from "../components/LoginSignupForm/LoginSingupForm";


function AuthPage() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.replace('/');
            } else {
                setIsLoading(false);
            }
        });
    }, [router]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return <LoginSingupForm />
}

export default AuthPage;
