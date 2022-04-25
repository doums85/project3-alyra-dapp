import { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import logo from '../../public/image/logo.png';
import avatar from '../../public/image/avatar.jpeg';
import { factoryAddress } from '../../utils/factoryAddress';

const Header = ({ workflow, accountData }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const search = document.querySelector('#search');
    const data = document.querySelector('#data');
    // Hide Searchbar when user's menu is open

    if (show && search) {
      search.style.opacity = 0;
      document.addEventListener('mousedown', (event) => !data.contains(event.target) && setShow(!show));
    } else {
      if (search) search.style.opacity = 1;
    }
  }, [show]);

  
  // Handler user's menu
  const showHandler = () => setShow(!show);
  const copyAddress = () => navigator.clipboard.writeText(accountData.voterConnected.account);
 let voterConnected;
 accountData && "voterConnected" in accountData && (voterConnected = accountData.voterConnected);

  return (
    <Container>
      <LeftSide>
        <WrapLogo>
          <Image src={logo} alt="logo" layout="intrinsic" />
        </WrapLogo>
        {workflow && (
          <div id="status">
            <em>
              Current status: <span>{workflow.currentStatus.status}</span>
            </em>
            <em>
              In coming: <span id="nextStatus">{workflow.nextStatus.status}</span>
            </em>
          </div>
        )}
      </LeftSide>

      <RightSide>
        <WrapImage onClick={showHandler}>
          <Image src={avatar} alt="avatar" width={50} height={50} />
        </WrapImage>

        {accountData && voterConnected && (
          <Wrapdata id="data" show={show}>
            <p>
              Your wallet is <span>{!voterConnected && 'not'} connected</span>{' '}
            </p>
            <ul>
              <li>
                address:
                <span id="address" onClick={copyAddress}>
                  {factoryAddress(voterConnected.account)}
                </span>
              </li>
              <li>
                You have: <span>{voterConnected.walletVoter} ETH</span>{' '}
              </li>
              {voterConnected.account === accountData.owner ? (
                <li id="role"> You are the admin</li>
              ) : (
                <li id="role">You are {voterConnected.isRegistered ? 'a voter' : 'not a voter'}</li>
              )}
            </ul>
          </Wrapdata>
        )}
      </RightSide>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 1rem 1rem 3rem;
  #status {
    display: grid;
    margin-top: 0.5rem;
    em {
      font-size: 0.8rem;
      & span {
        color: var(--purpleDark);
      }
      #nextStatus {
        color: var(--purpleDark);
        opacity: 0.7;
      }
    }
  }
`;

const LeftSide = styled.div``;

const WrapLogo = styled.div`
  width: 150px;
`;

const RightSide = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.8rem;
  text-align: justify;

  span {
    color: var(--purpleDark);
    font-weight: bolder;
  }
  #address {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const WrapImage = styled.div`
  width: 51px;
  height: 51px;
  justify-self: flex-end;
  background-color: var(--white-25);
  border: 2px solid var(--white-40);
  border-radius: 50%;

  img {
    border-radius: 50%;
    object-fit: cover;
    object-position: top center;
    cursor: pointer;
    &:hover {
      transform: scale(0.9);
      opacity: 0.9;
    }
  }
`;
const Wrapdata = styled.div`
  width: max-content;
  position: absolute;
  top: ${({ show }) => (show ? '55px' : '-480%')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  background-color: var(--white-25);
  border: 1px solid var(--white-40);
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.7s;

  #role {
    color: var(--pinkDark);
  }
`;

export default Header;
