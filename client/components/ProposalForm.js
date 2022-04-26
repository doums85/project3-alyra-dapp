import styled from 'styled-components';
import { useState } from 'react';
import { buttonStyle } from './styled';

const ProposalForm = ({addProposalVoter}) => {
  const [proposalEntered, setProposalEntered] = useState('');
  //Handle on change Input
  const onChangeHandler = (e) => setProposalEntered(e.target.value);


  return (
    <Container>
      <form>
        <textarea onChange={onChangeHandler} cols="30" rows="10" value={proposalEntered}></textarea>
        <button onClick={(event) => {event.preventDefault(); addProposalVoter(proposalEntered); setProposalEntered('')}}>
          <em>Add proposal</em>{' '}
        </button>
      </form>
    </Container>
  );
};

const Container = styled.section`
  width: 70%;
  margin: 1rem auto 2rem;
  text-align: center;
  form {
    display: grid;
    gap: 1.5rem;
  }
  textarea {
    width: 100%;
    height: 7.5rem;
    display: block;
    border: none;
    font-family: inherit;
    font-weight: 400;
    font-size: 1rem;
    padding: 0 0.5rem;
    color: var(--purpleDark);
    background-color: var(--white-40);
    border-radius: 0.5rem;
    transition: border-color 0.3s ease;
    border: 1px solid transparent;
    padding-top: 0.5rem;
    resize: none;

    &::placeholder {
      font-weight: 300;
      color: var(--purple);
      opacity: 0.8;
    }
    &:focus,
    &:focus-visible {
      outline: 1px solid var(--purple);
    }
  }

  button {
    ${buttonStyle}
    margin: 0;
    color: var(--purple);

    &::before {
      background-color: var(--purpleDark);
    }

    &:hover em {
      color: whitesmoke;
    }
  }
`;

export default ProposalForm;
