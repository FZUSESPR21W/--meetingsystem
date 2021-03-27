const setClsPrefixHOC = (prefix: string) => (...names: string[]) => {
  return [prefix, ...names].join('-');
};

export { setClsPrefixHOC };
