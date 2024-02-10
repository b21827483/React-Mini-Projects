import classes from "./AvailableMangas.module.css";
import Card from "../UI/Card";
import MangaItem from "./MangaItem";
import { useEffect, useState } from "react";

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
  const [mangas, setMangas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState();

  useEffect(() => {
    const fetchMangas = async () => {
      const response = await fetch(
        "https://custom-hook-ea362-default-rtdb.firebaseio.com/mangas.json"
      );

      if (!response.ok) {
        throw new Error(
          "Something went wrong. Please try refreshing the page."
        );
      }

      const data = await response.json();

      const loadedMangas = [];

      for (const key in data) {
        loadedMangas.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMangas(loadedMangas);
      setLoading(false);
    };
    fetchMangas().catch((err) => {
      setLoading(false);
      setHasError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.loading}>Loading...</p>
      </section>
    );
  }

  if (hasError) {
    return (
      <section>
        <p className={classes.error}>{hasError}</p>
      </section>
    );
  }

  const mangasList = mangas.map((manga) => (
    <MangaItem
      id={manga.id}
      key={manga.id}
      name={manga.name}
      description={manga.description}
      price={+manga.price}
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
