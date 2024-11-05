import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";

export const Header = () => {
  return (
    <header className="bg-blue-950 shadow w-full flex items-center gap-6 py-5 px-6 lg:px-8">
      <Logo />

      <Link
        to={"/"}
        className="text-white text-xl bg-green-900 p-1 px-2 rounded-md hover:bg-green-800 transition-all duration-300"
      >
        Home
      </Link>
      <Link
        to={"/createhero"}
        className="text-white text-xl bg-green-900 p-1 px-2 rounded-md hover:bg-green-800 transition-all duration-300"
      >
        Create new hero
      </Link>
    </header>
  );
};
