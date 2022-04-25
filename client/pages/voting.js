import styled from 'styled-components';
import { css } from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import Button from '../components/Button';
import Slider from '../components/Slider';
import { backgroundStyle, buttonStyle } from '../components/styled';
import Unauthorized from '../components/Unauthorized';
import { voteProposal } from '../utils/actionHandler';
import { factoryAddress } from '../utils/factoryAddress';
import { stopVotingSession } from '../utils/workflowHandler';

export default function Voting({ workflow, accountData, proposalData }) {
  const onlyOwner = accountData.voterConnected.account === accountData.owner;

  const settings = {
    540: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 0,
    },
  };

  const settingsVoter = {
    540: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 0,
    },
  };
  

  return (
    <>
    {workflow.workflowStatus === 3 ? 
    
  
    <section style={{ marginInline: '1rem', textAlign: 'center', marginTop: '10rem' }}>
        <WrapVoter>
          <h2>All voters</h2>
          <Slider settings={settingsVoter}>

          {
            accountData.allVoters.map((voter, index) => (
              <SwiperSlide key={index}>
                <VoterCard className={voter.hasVoted ? 'hasVoted' : undefined} >
                <i className='bx bxs-user'></i>
                <p>{factoryAddress(voter.account)} </p>
                </VoterCard>
              </SwiperSlide>
              ))
            }
            </Slider>
        </WrapVoter>
        <div>
          <h2 style={{ marginTop: '2rem' }}>Make your choice </h2>
          <Container>
            <Slider settings={settings}>
              {proposalData.proposals.map((proposal, index) => (
                <SwiperSlide key={index}>
                  <Card hasVoted={accountData.voterConnected.hasVoted}>
                    <i>Proposal #{index} </i>
                    <p>{proposal.description} </p>
                    {accountData.voterConnected.hasVoted &&
                    Number(accountData.voterConnected.votedProposalId) === index ? (
                      <button id="voted">
                        <em>You voted</em>
                      </button>
                    ) : (
                      <button
                      onClick={() => {
                        !accountData.voterConnected.hasVoted &&
                        voteProposal(index, accountData.voterConnected.account);
                      }}>
                        <em>Vote</em>{' '}
                      </button>
                    )}
                  </Card>
                </SwiperSlide>
              ))}
            </Slider>
          </Container>
        </div>
        {workflow && 'nextStatus' in workflow && onlyOwner && (
          <WrapButton>
            <Button nextStatus={workflow.nextStatus} fn={() => stopVotingSession(accountData.owner)} />
          </WrapButton>
        )}
      </section>
      : <Unauthorized notAllow={"status"} current={workflow.currentStatus}/> }
    </>
  );
}

const Container = styled.div`
  position: relative;
  display: grid;
  margin-inline: 1rem;
  margin-bottom: -1rem;


  .swiper {
    width: 100%;
    height: calc(100% + 2rem);
    margin-left: auto;
    margin-right: auto;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
  }
`;

const Card = styled.div`
  ${backgroundStyle};
  padding: 1rem 3rem;
  text-align: center;
  display: grid;
  gap: 0.5rem;

  p {
    font-size: 1rem;
  }

  #voted {
    background-color: transparent !important;
    border: none;

    em {
      color: var(--pinkDark);
    }
  }

  button {
    ${({ hasVoted }) =>
      hasVoted
        ? css`
            background-color: var(--purple) !important;
            opacity: 0.5;
            color: whitesmoke !important;
            cursor: not-allowed !important;
            &::before {
              background-color: transparent !important;
            }

            &:hover * {
              color: whitesmoke !important;
            }
          `
        : css`
            background: #fff;
            margin-top: 1rem;
            color: var(--purple);
            &::before {
              background-color: var(--purpleDark);
            }

            &:hover * {
              color: whitesmoke;
            }
          `};

    ${buttonStyle}
  }
`;

const WrapButton = styled.div`
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
`;

const WrapVoter = styled.div`
h2{
  margin-bottom: 1rem;
}

.swiper-wrapper{
  justify-content: center;
}

.hasVoted{
  background-color: #000;
}
`;

const VoterCard = styled.div`
${backgroundStyle}
padding: 1rem;

i{
  font-size: 1.3rem;
}

p{
  font-size: 0.9rem;
}
`