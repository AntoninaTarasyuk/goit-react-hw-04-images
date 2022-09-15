import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 100px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  overflow-y: scroll;
  @media screen and (min-width: 1024px) {
    padding: 100px 100px 20px 100px;
  }
`;
export const ModalWindow = styled.div`
  background-color: transparent;
  max-width: calc(100vw - 30px);
  width: 100%;
  height: auto;
  @media screen and (min-width: 1024px) {
    max-width: 100%;
    max-height: calc(100vh - 120px);
    height: 100%;
  }
`;
export const CloseBtn = styled.button`
  position: absolute;
  top: 95px;
  right: 15px;
  font-size: 20px;
  font-weight: 700;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.7);
  color: #019b74;
  cursor: pointer;
  transition: font-size 300ms linear;
  
  :hover,
  :focus {
    font-size: 24px;
    outline: none;
  }
`;