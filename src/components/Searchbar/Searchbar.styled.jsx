import styled from "@emotion/styled";

export const Header = styled.header`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  background-color: #019b74;
  z-index: 10;
`;
export const SearchForm = styled.form`
  position: relative;
`;
export const SearchInput = styled.input`
  min-width: 300px;
  height: 40px;
  padding-left: 15px;
  border-radius: 20px;
  border: none;
  outline: none;
  `;
export const SearchBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 34px;
  height: 34px;

  border-radius: 50%;
  border: none;

  background-color: #019b74;
  color: white;
  
  cursor: pointer;
  transition: background-color 300ms linear;

  :hover,
  :focus {
    outline: none;
    background-color: #01795b;
}
`;
