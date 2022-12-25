import styled from 'styled-components';
import {
  ImArrowLeft,
  ImArrowRight,
  ImArrowUp,
  ImArrowDown,
} from 'react-icons/im';

export const MobileButtons = ({ move }) => (
  <StyledMobileButtons>
    <button onClick={() => move({ keyCode: 37 })}>
      <ImArrowLeft size={30} />
    </button>
    <button onClick={() => move({ keyCode: 39 })}>
      <ImArrowRight size={30} />
    </button>
    <button onClick={() => move({ keyCode: 38 })}>
      <ImArrowUp size={30} />
    </button>
    <button onClick={() => move({ keyCode: 40 })}>
      <ImArrowDown size={30} />
    </button>
  </StyledMobileButtons>
);

// ========== STYLES ==========
const StyledMobileButtons = styled.div`
  display: flex;
  width: 390px;
  justify-content: space-between;
  flex-wrap: wrap;
  /* margin-top: 20px; */
  margin-left: auto;
  margin-right: auto;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 55px;
    border-radius: 50px;
    outline: none;
    border: 0px;
    box-shadow: 1px 1px 4px #555;
    background: midnightblue;
    color: gold;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
  }

  @media (min-width: 1200px) {
    display: none;
  }
`;
