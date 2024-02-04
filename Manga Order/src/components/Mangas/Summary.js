import classes from './Summary.module.css';

const Summary = () => {
  return (
    <section className={classes.summary}>
      <h2>Interesting stories that something to tell, for you to read.</h2>
      <p>
        Choose your manga to your liking, it will be delivered to you in 2-3 days.
      </p>
      <p>
        All of our mangas are printed on high quality papers and they are hard-cover. You can 
        return the mangas you bought within 1 week period after the purchase.
      </p>
    </section>
  );
};

export default Summary;