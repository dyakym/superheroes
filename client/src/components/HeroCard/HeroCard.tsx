import { Link } from "react-router-dom";

interface Props {
  id: string;
  name: string;
  img: string;
}

export const HeroCard: React.FC<Props> = ({ id, name, img }) => {
  const imageUrl = `http://localhost:5000/uploads/${img.split("\\").pop()}`;
  return (
    <li className=" border-2 border-gray-300 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/superhero/${id}`}>
        <img
          className="w-full h-48 object-cover"
          src={imageUrl}
          alt={`${name}`}
        />
        <h3 className="p-6 ml-4 text-xl font-semibold text-gray-800 truncate">
          {name}
        </h3>
      </Link>
    </li>
  );
};
