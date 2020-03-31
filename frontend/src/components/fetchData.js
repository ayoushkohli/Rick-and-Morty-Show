import CharacterSchema from '../utils/Schema';

export default function fetchDataQuery(url, value) {
  const parameterQuery = value;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CharacterSchema(parameterQuery),
    }),
  });
}
