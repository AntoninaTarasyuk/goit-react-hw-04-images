import { Component } from "react";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import { Header, SearchForm, SearchInput, SearchBtn } from "./Searchbar.styled";

export default class Searchbar extends Component{
  state = {
    searchQuery: "",
  }

  handleSearchQueryChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase()
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === "" ) {
      this.setState({ searchQuery: "" });
      return toast.info("Please enter a search query");
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: "" });
  }

  render() {
    const { searchQuery } = this.state;
    const { handleSubmit, handleSearchQueryChange } = this;

    return <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
            type="text"
            autoComplete="off"
            name="searchQuery"
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleSearchQueryChange}
        />
        <SearchBtn type="submit">
          <FaSearch />
        </SearchBtn>
      </SearchForm>
    </Header>
  }
}
