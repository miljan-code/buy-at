export const slugify = (str: string) => {
  // TODO: Handle this better, check for signs etc..
  return str.toLowerCase().split(' ').join('-');
};
