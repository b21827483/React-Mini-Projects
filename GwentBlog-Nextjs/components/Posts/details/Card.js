import Image from "next/image";
import classes from './Card.module.css';

const Card = props => {
  return (
      <div className={classes.card}>
          <h3>{props.title}</h3>
          <div>
              <Image src={props.image} alt={props.title} width={200} height={300}/>
          </div>
          <div>
            <p>Color/Tier</p>
            <p>Leader</p>
          </div>
          <div>
            <p>Rarity</p>
            <p>Legendary</p>
          </div>
      </div>
  )
}

export default Card;