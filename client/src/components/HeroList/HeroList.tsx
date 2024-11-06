import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHeroes } from "../../api/api";
import { Superhero } from "../../types/superhero";
import { Header } from "../Header/Header";
import { HeroCard } from "../HeroCard/HeroCard";

export const HeroList = () => {
  const [superheroesList, setSuperheroesList] = useState<Superhero[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = superheroesList.slice(firstIndex, lastIndex);
  const npage = Math.ceil(superheroesList.length / recordsPerPage);

  const numbers = [];
  for (let i = 1; i <= npage; i++) {
    numbers.push(i);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

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
        {records.length !== 0 ? (
          <>
            <ul className="grid grid-cols-1 mx-7 mt-6 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-4 xl:gap-x-8">
              {records.map((superhero) => (
                <HeroCard
                  key={superhero.id}
                  id={superhero.id}
                  name={superhero.nickname}
                  img={superhero.images?.[0] || "logo.png"}
                />
              ))}
            </ul>
            <ul className="flex justify-center space-x-2 my-10">
              {currentPage !== 1 && (
                <li>
                  <a
                    href="#"
                    className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-md transition duration-300 hover:bg-blue-500 hover:text-white"
                    onClick={prePage}
                  >
                    Prev
                  </a>
                </li>
              )}

              {numbers.map((n, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-md transition duration-300 hover:bg-blue-500 hover:text-white"
                    onClick={() => changeCPage(n)}
                  >
                    {n}
                  </a>
                </li>
              ))}
              {currentPage !== npage && (
                <li>
                  <a
                    href="#"
                    className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-md transition duration-300 hover:bg-blue-500 hover:text-white"
                    onClick={nextPage}
                  >
                    Next
                  </a>
                </li>
              )}
            </ul>
          </>
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
