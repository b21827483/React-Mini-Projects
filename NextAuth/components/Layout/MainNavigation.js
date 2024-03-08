import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    const {data: session, status} = useSession();

    return (
        <header className={classes.header}>
            <Link href={'/'}>
                <h1>Next Auth</h1>
            </Link>
            <nav>
                <ul>
                    {!session && status === 'unauthenticated' &&
                    <li>
                        <Link href={'/auth'} className={classes.link}>Login</Link>
                    </li>}
                    {session &&
                    <li>
                        <Link href={'/profile'} className={classes.link}>Profile</Link>
                    </li>}
                    {session && <li>
                        <button onClick={() => signOut()}>Sign out</button>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation