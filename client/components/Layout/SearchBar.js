import { getCookie } from 'cookies-next';
import { useState } from 'react';
import styled from 'styled-components';
import { addVoter, getVoterInfo, searchHandler } from '../../utils/actionHandler';

// TODO Handle search function
// TODO Handle add fucntion

const SearchBar = ({ workflow, accountData, setAccountData }) => {
  const [addressEntered, setaddressEntered] = useState('');

  // On change address input
  const onChangeHandler = (e) => setaddressEntered(e.target.value);

  // Add voter Handler
  const addVoterHandler = async () => {
    await searchHandler(accountData, setAccountData, addressEntered);
    await addVoter(accountData, setAccountData, addressEntered);
  };

  // Reset address input
  const resetInput = () => {
    setaddressEntered('')
    setAccountData((previousState) =>( {...previousState, voterFound:undefined}));
  };

  // Conditional for display component
  const allow = workflow && accountData && accountData.voterConnected;
  let voterConnected;
  accountData && 'voterConnected' in accountData && (voterConnected = accountData.voterConnected);

  return (
    <>
      {allow && (
        <Container id="search" owner={accountData.owner}>
          <input
            id="text"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter a wallet address"
            value={addressEntered}
          />

          <BoxIcons>
            <i onClick={resetInput} className="bx bx-reset" />
            <i
              onClick={() => searchHandler(accountData, setAccountData, addressEntered)}
              className="bx bx-search-alt"
            />

            {accountData.owner === voterConnected.account && workflow.workflowStatus === 0 && (
              <i onClick={workflow.workflowStatus === 0 && addVoterHandler} className="bx bxs-user-plus" />
            )}
            {accountData.owner === voterConnected.account && workflow.workflowStatus !== 0 && (
              <i className="bx bxs-user-plus disable" />
            )}
          </BoxIcons>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 70%;
  margin: auto;
  transition: 0.4s;
  input {
    width: 100%;
    height: 3rem;
    display: block;
    border: none;
    font-family: inherit;
    font-weight: 400;
    font-size: 1rem;
    padding: 0 1.5rem;
    color: var(--purpleDark);
    background-color: var(--white-40);
    border-radius: 0.5rem;
    transition: border-color 0.3s ease;
    border: 1px solid transparent;

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
`;

const BoxIcons = styled.div`
  height: 100%;
  position: absolute;
  top: 50%;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transform: translateY(-50%);
  background-color: #fff;
  border-radius: 0 0.5rem 0.5rem 0;
  padding-inline: 0.5rem;
  z-index: 100;

  i {
    font-size: 1.5rem;
    color: var(--purpleDark);
    cursor: pointer;

    &:hover {
      color: var(--purple);
      transform: scale(0.9);
      transition: 0.3s;
    }
  }

  .disable {
    color: var(--purple);
    opacity: 0.7;
    cursor: not-allowed;

    &:hover {
      color: var(--purple);
      transform: none;
    }
  }
`;

export default SearchBar;
