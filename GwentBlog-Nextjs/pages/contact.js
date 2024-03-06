import ContactForm from "../components/Contact/ContactForm";
import {Fragment} from "react";
import Head from "next/head";

const Contact = () => {
  return (
  <Fragment>
    <Head>
      <title>Contact</title>
      <meta name='contact' content='Send messages.' />
    </Head>
    <ContactForm />
  </Fragment>
  )
}

export default Contact;