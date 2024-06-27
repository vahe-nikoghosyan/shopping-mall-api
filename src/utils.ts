export const parseId = (id: string): number => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    throw new Error('Invalid ID format');
  }
  return parsedId;
};
