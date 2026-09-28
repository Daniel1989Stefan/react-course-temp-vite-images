import { useGlobalContext } from "./Context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(e.target.elements); //arata ce anume contine forum-ul (input si button + 'search' care reprezinta name-ul input-ului)

    const searchValue = e.target.elements.search.value; //search este de la input/name, iar value este valoarea data in input
    if (!searchValue) return;
    // console.log(searchValue);
    setSearchTerm(searchValue);
  };

  return (
    <section>
      <h1 className="title">unsplash images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input search-input "
          name="search"
          placeholder="cat"
        />
        <button type="submit" className="btn">
          search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
