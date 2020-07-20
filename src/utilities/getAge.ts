export default (birthYear: string | number) => {
  const currentYear = (new Date()).getFullYear();

  return currentYear - Number(birthYear);
};
