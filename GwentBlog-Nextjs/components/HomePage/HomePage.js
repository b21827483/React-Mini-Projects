import classes from './Home.module.css'
import Image from "next/image";

const HomePage = () => {
  return (
      <section className={classes.home}>
          <div className={classes.img}>
              <Image
                  src='/images/Home/OwnSideBase.png'
                  alt='Coin'
                  width={300}
                  height={300}/>
          </div>
          <h1>Gwent</h1>
          <p>GWENT is a card game of choices and consequences, where skill, not luck, is your greatest weapon. Pick a faction, build an army, and wage war against other players across multiple game modes. With hundreds of cards to collect — charismatic heroes, mighty spells and special abilities — new strategies are always a thought away.</p>
      </section>
  )
}

export default HomePage;