import styled from 'styled-components';

import Button from './Button';
import img from '../public/image/connect.png';
import Image from 'next/image';
import { buttonStyle } from './styled';
import { connectWallet } from '../utils/authHandler';

const ConnectWallet = ({ accountData, setAccountData }) => {
  return (
    <Container>
      <Image src={img} alt="connect" />
      <button onClick={ () => connectWallet(accountData, setAccountData)}>
        <em>Connect to Metamask</em>{' '}
      </button>
    </Container>
  );
};

const Container = styled.section`
  position: absolute;
  top: 50%;
  height: 100%;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  justify-content: space-between;
  align-items: center;
  column-gap: 4rem;
  margin: auto 1rem;
  transform: translateY(-50%);

  button {
    background: #000;
    ${buttonStyle}
    &::before {
      background-color: var(--pinkDark);
    }

    &:hover * {
      color: whitesmoke;
    }
  }
  @media screen and (max-width: 710px) {
    grid-template-columns: 1fr max-content;
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

export default ConnectWallet;
