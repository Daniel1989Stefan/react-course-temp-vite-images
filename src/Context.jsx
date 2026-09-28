import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)",
  ).matches; //asta va returna true sau false (daca broswerul e setat pe dark sau light mode)
  // console.log(prefersDarkMode);

  const storedDarkMode = localStorage.getItem("darkTheme"); //pt a salva preferintele in local broswer storage, iin cazul in care suntem redirectionati spre alta pagina

  if (storedDarkMode === null) {
    return prefersDarkMode;
  }

  return storedDarkMode === "true";
};

export const AppProvider = ({ children }) => {
  const greet = "hi";

  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode()); //true sau false
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    const body = document.querySelector("body");

    body.classList.toggle("dark-theme", newDarkTheme);
    // console.log(body); // ne arata ceea ce avem in tot fisierul main cu tot cu  ceea ce avem si in fisierul ThemeToggle.jsx
    /*Parametrul 1 — "dark-theme" — numele clasei pe care o adaugi/elimini
    Parametrul 2 — newDarkTheme — un boolean care forțează comportamentul
    // true  → ADAUGĂ clasa (indiferent dacă există sau nu)
    // false → ELIMINĂ clasa (indiferent dacă există sau nu)

    Fără al doilea parametru ar funcționa și singur: adaugă dacă nu există, elimină dacă există.
    Al doilea parametru e folosit pentru claritate și control explicit — știi exact ce se întâmplă.

    NB. daca am pagina web: serverul-meu/home in care accesz dark-theme, dar dupaia sunt redirectionat spre serverul-meu/profile, dark-theme nu ramane.
    Pt a rezolva problema se foloseste  localStorage — cea mai comună:
      const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        body.classList.toggle("dark-theme", newDarkTheme);
        localStorage.setItem("darkTheme", newDarkTheme); // 👈 salvezi
      };
    La încărcare citești din localStorage:
      const savedTheme = localStorage.getItem("darkTheme") === "true";
      const [isDarkTheme, setIsDarkTheme] = useState(savedTheme);
    */
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, []); //-> folosit doar pt a seta direct tema pe dark sau light in baza preferintelor puse pe broswer, fara el, ar fi autoomat light mode.

  const [searchTerm, setSearchTerm] = useState("cat");

  return (
    <AppContext.Provider
      value={{ greet, isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

/*
const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedDarkMode = localStorage.getItem('darkTheme');
 
    if (storedDarkMode === null) {
        return prefersDarkMode;
    }
 
    return storedDarkMode === 'true';
};
*/
