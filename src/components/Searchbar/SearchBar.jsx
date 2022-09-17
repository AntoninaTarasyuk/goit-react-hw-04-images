import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Header, SearchForm, SearchInput, SearchBtn } from "./Searchbar.styled";

export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState("");

  return <Header>
    <SearchForm onSubmit={e => {
      e.preventDefault();
      onSubmit(query);
      setQuery("");
    }}>
      <SearchInput
        type="text"
        autoComplete="off"
        name="searchQuery"
        placeholder="Search images and photos"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <SearchBtn type="submit"><FaSearch /></SearchBtn>
    </SearchForm>
  </Header>
};
