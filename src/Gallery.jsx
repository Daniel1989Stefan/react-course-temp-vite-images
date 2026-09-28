import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./Context";

const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`; // datele de pe .env nu sunt sigure cand sunt accesate de pe frontend, ele trebuie accesate doar de pe backend, unde utilizatorul final nu are acces nici cu console.log

const Gallery = () => {
  const { searchTerm } = useGlobalContext();

  const response = useQuery({
    queryKey: ["images", searchTerm], //de fiecare data cand searchTerm se schimba (din input/search), si valoarea UTRL-ului de schimba imediat cu  &query=${searchTerm}
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);

      return result.data;
    },
  });

  // console.log(response); // arata primele 10 rezultate

  if (response.isLoading) {
    return <section className="image-container">Loading...</section>;
  }

  if (response.isError) {
    return <section className="image-container">There was an error...</section>;
  }

  const results = response.data.results;
  // const testResults = []; //pt testare 0 rezultate

  if (results.length < 1) {
    return <section className="image-container">No results found...</section>;
  }

  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
