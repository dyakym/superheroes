import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className="relative flex justify-between items-center cursor-pointer "
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => navigate("/")}
    >
      <img
        src="/logo.png"
        alt="logo"
        className={"h-10 w-auto absolute top-0 left-0"}
      />
      <span
        className={`text-xl transition-all duration-300 ml-16 ${
          isHover ? "text-red-500" : "text-white"
        }`}
      >
        Superheroes
      </span>
    </div>
  );
};
