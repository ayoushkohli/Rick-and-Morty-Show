function makeFilter(filtersObject) {
  const filterString = {};
  Object.keys(filtersObject).map(function (key) {
    if (typeof filtersObject[key] == 'object') {
      for (var innerkey in filtersObject[key]) {
        if (filtersObject[key][innerkey] !== null) {
          if (innerkey.includes('Species'))
            filterString.species = filtersObject[key][innerkey];
          else if (innerkey.includes('Gender'))
            filterString.gender = filtersObject[key][innerkey];
          else if (innerkey.includes('Location'))
            filterString.status = filtersObject[key][innerkey];
        }
      }
    } else if (filtersObject[key] !== null) {
      filterString.name = filtersObject[key];
    }
  });
  return Object.keys(filterString).length ? filterString : '';
}
function convertObjectToParsing(object){
  const json = JSON.stringify(object);
  return json.replace(/"([^"]+)":/g, '$1:');
}
export default function CharacterSchema(val,pageSetting) {
  let filterQuery = makeFilter(val);
  if(filterQuery !== '')
    filterQuery = `(page:${pageSetting.currentPage}, filter:${convertObjectToParsing(filterQuery)})`;
  else 
    filterQuery = `(page:${pageSetting.currentPage})`;
  const CharacterSchemaQ = `query {
        characters${filterQuery} {
            info {
                count
                pages
            }
            results {
                id
                name
                image
                status
                species
                gender
                location{
                    name
                }
                created
                origin{
                    name
                }
            }
        }
    }`;
  return CharacterSchemaQ;
}
export function AutoSuggestionCharacterSchema(val){
  const filterQuery = `(filter:{name:${JSON.stringify(val)}})`;
  const AutoSuggestionCharacterSchema = `query {
    characters${filterQuery} {
        results {
            name
        }
    }
}`;
return AutoSuggestionCharacterSchema;
}