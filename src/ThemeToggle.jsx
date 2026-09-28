import { useGlobalContext } from "./Context";
import { BsFillSunFill, BsFillMoonFill, BsTools } from "react-icons/bs";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext(); //isDarkTheme cu true e pe night, cu false e light
  return (
    <section className="toggle-container">
      <button className="dark-toggle" onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <BsFillSunFill className="" style={{ color: "white" }} />
        ) : (
          <BsFillMoonFill className="" />
        )}
      </button>
    </section>
  );
};

export default ThemeToggle;
