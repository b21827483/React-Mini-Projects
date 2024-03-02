import {Outlet, useLoaderData, useSubmit} from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import {useEffect} from "react";
import {getExpirationDur} from "../util/util";

function RootLayout() {
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === 'TOKEN EXPIRED') {
            submit(null, {method:'post', action:'/logout'});
            return;
        }

        const duration = getExpirationDur();
        setTimeout(() => {
            submit(null, {method:'post', action:'/logout'});
        }, duration);

    }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
