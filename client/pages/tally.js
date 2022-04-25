import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import Button from '../components/Button';
import Slider from '../components/Slider';
import { backgroundStyle } from '../components/styled';
import Unauthorized from '../components/Unauthorized';
import { resetContract } from '../utils/workflowHandler';

const tally = ({ workflow, accountData, setAccountData, proposalData }) => {
  const settings = {
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  };

  const proposalId = accountData.voterConnected.votedProposalId;
  const onlyOwner = accountData.voterConnected.account === accountData.owner;

const resetContractHandler = () => {
  accountData.allVoters.map(async(voter) => {
    if(voter.account !== accountData.owner){
      await resetContract(accountData, voter.account)
    }
  })
}

  return (
    <>
      {workflow.workflowStatus === 5 ? (
        <Container>
          <h2>Winning Proposal</h2>
          {proposalData.winning && proposalData.winning.length > 0 && (
            <Card>
              <h4>Proposal #{proposalData.winning} </h4>
              <ul>
                <li>{proposalData.proposals[Number(proposalData.winning)].description}</li>
                <li>Count vote:{proposalData.proposals[Number(proposalData.winning)].voteCount}</li>
                <li id="choice">{proposalId === proposalData.winning[0] && 'Your choice'} </li>
              </ul>
            </Card>
          )}

          <h2 style={{ marginTop: '2rem' }}>Losing Proposals</h2>
          <Slider settings={settings}>
            {proposalData.proposals.map(
              (proposal, index) =>
                index !== Number(proposalData.winning) && (
                  <SwiperSlide key={index}>
                    <Card>
                      <h4>Proposal #{index} </h4>
                      <p>{proposal.description}</p>
                      <p>Count vote:{proposal.voteCount} </p>
                      <p>
                        {proposalData.winning &&
                          proposalId === proposalData.winning[0] &&
                          index === Number(proposalData.winning[0]) &&
                          'Your choice '}
                      </p>
                    </Card>
                  </SwiperSlide>
                )
            )}
          </Slider>

          {workflow && 'nextStatus' in workflow && onlyOwner && (
            <WrapButton>
              <Button nextStatus={workflow.nextStatus} fn={resetContractHandler} />
            </WrapButton>
          )}
        </Container>
      ) : (
        <Unauthorized notAllow={'status'} current={workflow.currentStatus} />
      )}
    </>
  );
};

const Container = styled.section`
  text-align: center;
  margin-top: 7rem;
  margin-left: 1rem;

  .swiper-wrapper {
    padding-bottom: 1rem;
    //justify-content: space-evenly;
  }

  @media screen and (max-width: 650px) {
    .swiper-wrapper {
      padding-bottom: 2rem;
    }
  }
`;

const Card = styled.div`
  ${backgroundStyle}
  max-width: 400px;
  width: 350px;
  margin: auto;
  padding: 2rem 1rem;

  b {
    color: var(--purple);
  }

  #choice {
    color: var(--pinkDark);
  }
`;

const WrapButton = styled.div`
  margin-top: 2rem;
`;

export default tally;
