import Head from 'next/head';

import styled from 'styled-components';
import CardVoter from './CardVoter';
import Footer from './Footer';
import Header from './Header';
import SearchBar from './SearchBar';

export default function Layout({ workflow, accountData, setAccountData, subtitle, children }) {

  const allow = accountData && 'voterConnected' in accountData && accountData.voterConnected && accountData.voterConnected.isRegistered;
  return (
    <>
      <Head>
        <title>The Voter - {subtitle} </title>
        <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet" />
      </Head>

      <Container>
        <Header workflow={workflow} accountData={accountData} />

        <main>
          {allow && <SearchBar workflow={workflow} accountData={accountData} setAccountData={setAccountData} />}
          <CardVoter accountData={accountData} setAccountData={setAccountData} />
          {children}
        </main>

        <Footer />
      </Container>
    </>
  );
}

const Container = styled.section`
  min-height: calc(100vh - 70px);
  max-width: 1200px;
  margin: auto;
  background-color: var(--white-25);
  border: 1px solid var(--white-40);
  border-radius: 0.5rem;
  -webkit-backdrop-filter: blur(0px);
  backdrop-filter: blur(0px);
`;
