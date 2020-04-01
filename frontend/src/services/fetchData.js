import CharacterSchema from '../utils/graphQLQuerySchema';

export default function fetchDataQuery(url, value, pageSetting) {
  const parameterQuery = value;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CharacterSchema(parameterQuery,pageSetting),
    }),
  });
}
