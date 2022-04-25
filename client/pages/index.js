/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components';
import Slider from '../components/Slider';
import { SwiperSlide } from 'swiper/react';
import { backgroundStyle } from '../components/styled';
import Image from 'next/image';
import avatar from '../public/image/avatar.jpeg';
import { removeVoter } from '../utils/actionHandler';
import { factoryAddress } from '../utils/factoryAddress';
import Button from '../components/Button';
import img from '../public/image/no-voter.png';
import Unauthorized from '../components/Unauthorized';
import { startRegisteringProposals } from '../utils/workflowHandler';

export default function Home({ workflow, accountData, setAccountData }) {
  const onlyOwner = accountData.voterConnected.account === accountData.owner;

  return (
    <>
      {workflow.workflowStatus === 0 ? (
        <Container>
          {accountData.allVoters ? (
            <>
              <h2>All voters ({accountData.allVoters.length}) </h2>
              <Slider>
                {accountData.allVoters.map((voter, index) => (
                  <SwiperSlide key={index}>
                    <Card>
                      <WrapImage>
                        <Image src={avatar} alt="" width={70} height={70} layout={'intrinsic'} />
                      </WrapImage>
                      <WrapData>
                        <ul>
                          <li>
                            Address: <em>{factoryAddress(voter.account)} </em>{' '}
                          </li>
                          <li>Is registered: {voter.isRegistered ? <span>true</span> : 'false'} </li>
                          <li>Has voted: {voter.hasVoted ? <span>true</span> : 'false'}</li>
                          {voter.hasVoted && (
                            <li>
                              Voted proposal Id:<span>{voter.votedProposalId}</span>{' '}
                            </li>
                          )}
                          <li>Balance: {voter.walletVoter} ETH </li>
                        </ul>
                        {onlyOwner && (
                          <WrapDelete onClick={() => removeVoter(accountData, setAccountData, voter.account)}>
                            <i className="bx bxs-user-minus"></i>
                          </WrapDelete>
                        )}
                      </WrapData>
                    </Card>
                  </SwiperSlide>
                ))}
              </Slider>
            </>
          ) : (
            <div>
              <h2>There aren't voters yet </h2>
              <Image src={img} alt="" width={350} height={350} />
            </div>
          )}
          {workflow && 'nextStatus' in workflow && onlyOwner && accountData.allVoters && (
            <Button nextStatus={workflow.nextStatus} fn={() => startRegisteringProposals(accountData.owner)} />
          )}
        </Container>
      ) : (
        <Unauthorized notAllow={'status'} current={workflow.currentStatus} />
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 120px;
  width: 100%;
  height: 300px;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-auto-rows: max-content max-content 1fr;
  gap: 1rem;

  h2 {
    margin-left: 1.1rem;
    text-align: center;
  }

  & > img {
    border-radius: 50%;
  }

  //Smaller device
  @media screen and (max-width: 350px) {
    bottom: 40px;
  }
`;

const Card = styled.div`
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

const WrapDelete = styled.div`
  width: max-content;
  height: max-content;
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
