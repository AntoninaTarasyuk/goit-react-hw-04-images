import styled from "@emotion/styled";

const Button = styled.button`
  font-family: inherit;
  font-size: inherit;
  font-weight: 700;
  text-align: center;
  /* margin: 0 auto; */
  margin-top: 30px;
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: #ffffff;
  background-color:  #019b74;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 300ms linear, background-color 300ms linear;
  :hover,
  :focus {
    background-color: #01795b;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.23);
    outline: none;
}
`;

export const Btn = ({ type = "button", children, name, onClick }) => {
  return <Button type={type} name={name} onClick={onClick}>{children}</Button>;
};