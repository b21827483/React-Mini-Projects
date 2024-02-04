import classes from "./AvailableMangas.module.css";
import Card from "../UI/Card";
import MangaItem from "./MangaItem";

const DUMMY_MANGAS = [
  {
    id: "m1",
    name: "Hunter x Hunter Vol. 37",
    description: "Bastard starts to wreak havoc",
    price: 11.99,
  },
  {
    id: "m2",
    name: "Berserk Vol. 1",
    description: "The Black Knight",
    price: 12.89,
  },
  {
    id: "m3",
    name: "Vagabond Vol. 9",
    description: "Invincible under the Heaven",
    price: 16.04,
  },
  {
    id: "m4",
    name: "Jujutsu Kaisen vol. 18",
    description: "Idle Death Gamble",
    price: 7.68,
  },
];

const AvailableMangas = () => {
  const mangasList = DUMMY_MANGAS.map((manga) => (
    <MangaItem
      id={manga.id}
      key={manga.id}
      name={manga.name}
      description={manga.description}
      price={manga.price}
    />
  ));

  return (
    <section className={classes.mangas}>
      <Card>
        <ul>{mangasList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMangas;
