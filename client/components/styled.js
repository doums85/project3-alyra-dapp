export const backgroundStyle = () => {
  return `
background-color: var(--white-25);
border: 1px solid var(--white-40);
border-radius: .5rem;
transform: scale(0.9);
backdrop-filter: blur(5px);
`;
};


export const buttonStyle = () => {
  return `
    width: max-content;
    height: max-content;
    font-family: inherit;
    user-select: none;
    position: relative;
    display: inline-block;
    line-height: 1.5;
    background-color: var(--white-25);
    border: 1px solid var(--white-40);
    font-weight: 500;
    font-size: 16px;
    color: var(--pinkDark);
    text-transform: capitalize;
    font-family: inherit;
    padding: 10px 28px;
    user-select: none;
    overflow: hidden;
    vertical-align: middle;
    transition: color 0.6s ease;
    border-radius: .5rem;
    margin: auto;
    cursor: pointer;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0%;
      background-color: var(--pinkDark);
      transition: width 0.6s ease;
      z-index: -1;
    }

    &:hover::before {
      width: 100%;
    }

    &:hover em {
      color: var(--white);
    }

  `
}