/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import styled from 'styled-components';
import img from '../public/image/unauthorized.png';
const Unauthorized = ({ notAllow, current, voterConnected }) => {
  return (
    <Container>
      <h2>UNAUTHORIZED</h2>
      <p>
        {notAllow === 'notVoter' ? 'You are not a voter' : `This state is unallow. Current state: ${current.status}`}
        {voterConnected && voterConnected.isRegistered && (
          <>
            <br />{' '}
            <em>
              Go to{' '}
              <a href={current.page}>
                {' '}
                <i className="bx bxs-door-open" />
              </a>
            </em>
          </>
        )}
      </p>
      <Wrap>
        <Image src={img} alt="unauthorized" width={1400} height={1600} layout="intrinsic" />
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  margin-inline: 1rem;
  color: var(--pinkDark);
  text-align: center;

  h2 {
    margin-top: 2rem;
    font-size: 3rem;
  }
  p {
    font-size: 2rem;
    line-height: 1.5;
    margin-bottom: 3rem;
    font-weight: bolder;
  }

  a {
    cursor: pointer;
    color: rgba(65, 61, 61, 0.8);
  }

  i {
  }
`;

const Wrap = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-30%);
  width: 400px;
  display: flex;
  justify-content: center;

  img {
    display: block;
    margin: auto;
  }
`;

export default Unauthorized;
