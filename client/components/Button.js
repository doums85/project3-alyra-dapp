import Link from 'next/link';
import styled from 'styled-components';
import { buttonStyle } from './styled';

const Button = ( {nextStatus, text, fn }) => {

  return (
    <>
      {nextStatus && (
        <Container onClick={fn}>
          <em>{text ? text : nextStatus.status} </em>
        </Container>
      )}
    </>
  );
};

const Container = styled.button`

  ${buttonStyle}
`;

export default Button;
