import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConnectWallet from '../components/ConnectWallet';

import Layout from '../components/Layout/Layout';
import Unauthorized from '../components/Unauthorized';
import '../styles/globals.css';
import { getAllProposals, getAllVotersFromCookie, getWinningProposal } from '../utils/actionHandler';
import { getOwner, getVoterConnected } from '../utils/authHandler';
import { ProposalRegistered, voted, VoterRegistered, WorkFlowChanged } from '../utils/events';
import { factoryAddress } from '../utils/factoryAddress';
import { notification } from '../utils/notification';
import { getWorkflowStatus } from '../utils/workflowHandler';

function MyApp({ Component, pageProps }) {
  const [accountData, setAccountData] = useState(null);
  // address, isRegistered, hasVoted, votedProposalId, balance
  const [workflow, setWorkflow] = useState(null);
  // workflowStatus, currentStatus, nextStatus
  const [proposalData, setProposalData] = useState({ proposals: [] });
  // All proposals, winning proposal
  const [_window, set_window] = useState(null);

  // UseEffect
  useEffect(() => {
    const initial = async () => {
      await getOwner(accountData, setAccountData);
      await getWorkflowStatus(workflow, setWorkflow);

      if (accountData) {
        await WorkFlowChanged(workflow);
        await getVoterConnected(accountData, setAccountData);
        await VoterRegistered(accountData, setAccountData);
        // Listen on change account
        window.ethereum.on('accountsChanged', async function (accounts) {
          if ('voterConnected' in accountData && accountData.voterConnected.account !== accounts[0]) {
            notification(undefined, `New wallet connected !account: ${factoryAddress(accounts[0])}`, accounts[0]);
          }
        });

        //Get All proposals
        if (workflow && workflow.workflowStatus >= 1) {
          await getAllProposals(accountData.owner, proposalData, setProposalData);
          await ProposalRegistered(accountData.owner, proposalData, setProposalData);
        }
        if (workflow && workflow.workflowStatus === 3) {
          await voted(accountData, setAccountData);
        }
        if (workflow && workflow.workflowStatus === 5) {
          await getWinningProposal(proposalData, setProposalData);
        }
      }
    };
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });
    initial();

    //Set window
    set_window(window);
  }, [accountData, workflow, proposalData]);

  // Event on change Account
  if (_window) {
    _window.ethereum.on('accountsChanged', async function (accounts) {
      // Update address voter connected
      getVoterConnected(accountData, setAccountData);
    });
  }

  // Subtitle
  const subtitle = workflow && workflow.currentStatus && workflow.currentStatus.status;
  const allow =
    accountData &&
    'voterConnected' in accountData &&
    accountData.voterConnected &&
    accountData.voterConnected.isRegistered
console.log(accountData);
  return (
    <Layout workflow={workflow} accountData={accountData} setAccountData={setAccountData} subtitle={subtitle}>
      {allow && (
        <Component
          {...pageProps}
          workflow={workflow}
          accountData={accountData}
          setAccountData={setAccountData}
          proposalData={proposalData}
          setProposalData={setProposalData}
        />
      )}
      {accountData && !accountData.voterConnected ? (
        <ConnectWallet />
      ) : (
        workflow && !allow && <Unauthorized notAllow="notVoter" current={workflow.currentStatus} />
      )}

      <ToastContainer />
    </Layout>
  );
}

export default MyApp;
