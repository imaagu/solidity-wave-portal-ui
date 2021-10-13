const sortAddress = (address) => {
  const _sortAddress =
    address.substring(1, 3) +
    "...." +
    address.substring(address.length - 3, address.length - 1);
  return _sortAddress;
};

module.exports = {
  sortAddress,
};
