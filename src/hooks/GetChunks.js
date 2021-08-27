export const GetChunks = (data, size) => {
  const current = [];
  let i,
    j,
    temporary,
    chunk = size;
  for (i = 0, j = data.length; i < j; i += chunk) {
    temporary = data.slice(i, i + chunk);
    current.push(temporary);
  }

  return current;
};
