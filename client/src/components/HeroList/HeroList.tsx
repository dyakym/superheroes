import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHeroes } from "../../api/api";
import { Superhero } from "../../types/superhero";
import { Header } from "../Header/Header";
import { HeroCard } from "../HeroCard/HeroCard";

export const HeroList = () => {
  const [superheroesList, setSuperheroesList] = useState<Superhero[]>([]);

  useEffect(() => {
    getAllHeroes()
      .then((res) => {
        setSuperheroesList(res);
      })
      .catch((error) => {
        console.error("Помилка при отриманні героїв:", error);
      });
  }, []);

  return (
    <>
      <Header></Header>
      <div>
        {superheroesList.length !== 0 ? (
          <ul className="grid grid-cols-1 mx-7 mt-6 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-4 xl:gap-x-8">
            {superheroesList.map((superhero) => (
              <HeroCard
                key={superhero.id}
                id={superhero.id}
                name={superhero.nickname}
                img={superhero.images?.[0] || "logo.png"}
              />
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center ">
            <Link
              to={"/createhero"}
              className="text-white bg-green-900 p-4 px-6 mt-6 rounded-md hover:bg-green-800 transition-all duration-300"
            >
              Create First Hero
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
