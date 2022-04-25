export const factoryAddress = (address) => {
  if (address) {
    const newAddr =
      address[0] +
      address[1] +
      address[2] +
      address[3] +
      address[4] +
      address[5] +
      '...' +
      address[address.length - 4] +
      address[address.length - 3]  +
      address[address.length - 2] +
      address[address.length - 1] ;

    return newAddr;
  }
};
