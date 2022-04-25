import styled from 'styled-components';
import ProposalForm from '../components/ProposalForm';
import { addProposal } from '../utils/actionHandler';
import Slider from '../components/Slider';
import { SwiperSlide } from 'swiper/react';
import { backgroundStyle } from '../components/styled';
import { notification } from '../utils/notification';
import Button from '../components/Button';
import { stopRegisteringProposals } from '../utils/workflowHandler';
import Unauthorized from '../components/Unauthorized';


export default function Proposals({ workflow, accountData, proposalData, setProposalData }) {
  const onlyOwner = accountData.voterConnected.account === accountData.owner;

  const addProposalVoter = (proposalEntered) => {
    addProposal(accountData.voterConnected.account, proposalEntered, setProposalData);
  };

  const settings = {
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  };


  return (
    <>
      {workflow.workflowStatus === 1 ? (
        <Container>
          <h2>Add your proposals</h2>
          <ProposalForm addProposalVoter={ addProposalVoter} />
          <section id="allProposals">
            <h2>All proposals</h2>
            <Slider settings={settings}>
              {proposalData.proposals.map((proposal, index) => (
                <SwiperSlide key={index}>
                  <Card>
                    <h4>Proposal #{index} </h4>
                    <p>{proposal.description}</p>
                  </Card>
                </SwiperSlide>
              ))}
            </Slider>
          </section>

          {workflow && 'nextStatus' in workflow && onlyOwner && (
            <WrapButton>
              <Button nextStatus={workflow.nextStatus} fn={() => stopRegisteringProposals(accountData.owner)} />
            </WrapButton>
          )}
        </Container>
      ) : (
        <Unauthorized notAllow={"status"} current={workflow.currentStatus}/>
      )}
    </>
  );
}

const Container = styled.section`
  position: fixed;
  bottom: 200px;
  width: 100%;
  margin-inline: 1rem;
  section {
    display: grid;
  }
  h2 {
    text-align: center;
  }

  #allProposals {
    position: relative;
  }

  .swiper {
    width: 70%;
    height: calc(100% + 2rem);
    margin: auto;
  }
`;

const Card = styled.div`
  ${backgroundStyle};
  padding: 1rem;

  p {
    font-size: 0.9rem;
  }
`;

const WrapButton = styled.div`
  position: absolute;
  bottom: -130px;
  left: 50%;
  transform: translateX(-50%);
`;
