import styled from 'styled-components';
import Image from 'next/image';
import avatar from '../../public/image/avatar.jpeg';
import { backgroundStyle } from '../styled';
import { removeVoter } from '../../utils/actionHandler';
import { factoryAddress } from '../../utils/factoryAddress';

const CardVoter = ({ accountData, setAccountData }) => {
  // Clear value voter's detail
  const closeHandler = () => setAccountData({ ...accountData, voterFound: undefined });
  let owner, voterConnected, voterFound;
  if (accountData) {
    owner = accountData.owner;
    voterConnected = accountData.voterConnected;
    voterFound = accountData.voterFound;
  }


  return (
    <>
      {accountData && 'voterFound' in accountData && voterFound && (
        <Container>
          <Inner>
            <WrapImage>
              <Image src={avatar} alt="" width={70} height={70} layout={'intrinsic'} />
              
            </WrapImage>
            <WrapData>
              <ul>
                <li>Address: <em>{factoryAddress(voterFound.account)} </em> </li>
                <li>Is registered: {voterFound.isRegistered ? <span>true</span> : 'false'} </li>
                <li>Has voted: {voterFound.hasVoted ? <span>true</span> : 'false'}</li>
                {voterFound.hasVoted && (
                  <li>
                    Voted proposal Id:<span>{voterFound.votedProposalId}</span>{' '}
                  </li>
                )}
                <li>Balance: {voterFound.walletVoter} ETH </li>
              </ul>
              {voterConnected.account === owner && voterFound.isRegistered && (
                <WrapDelete onClick={() => removeVoter(accountData, setAccountData, document.querySelector('#text').value )}>
                  <i className="bx bxs-user-minus"></i>
                </WrapDelete>
              )}
            </WrapData>

            <WrapClose onClick={closeHandler}>
              <i className="bx bx-x"></i>
            </WrapClose>
          </Inner>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  top: 16.7rem;
  transform: translateY(-30%);
  z-index: 200;
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  max-width: 550px;
  padding: 2rem;
  margin: auto;
  ${backgroundStyle}
`;

const WrapImage = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  img {
    object-fit: cover;
    object-position: top center;
    border-radius: 50%;
  }
  em {
    word-break: break-all;
    font-size: 0.9rem;
  }
`;

const WrapData = styled.div`
    margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  text-align: left;
  font-size: 1.05rem;

  span {
    color: var(--purpleDark);
  }
`;

const WrapClose = styled.div`
  position: absolute;
  width: 1.8rem;
  height: 1.8rem;
  top: -0.5rem;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white-25);
  border: 1px solid var(--white-40);
  border-radius: 50%;
  backdrop-filter: blur(5px);
  opacity: 1;
  z-index: 1000;

  i {
    font-weight: 900;
    font-size: 1.5rem;
    color: var(--purpleDark);
  }
`;

const WrapDelete = styled.div`
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 0.3rem 0.5rem;

  i {
    font-size: 1.8rem;
    color: var(--purpleDark);
    cursor: pointer;

    &:hover {
      color: crimson;
      transform: scale(0.9);
      transition: 0.3s;
    }
  }
`;

export default CardVoter;
