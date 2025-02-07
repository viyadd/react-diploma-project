export const generateDate = () =>
  new Date()
    .toISOString()
    .substring(0, 16)
    .replace('T', ' ');
