function makeFilter(obj) {
  if (obj.selectedFilters.selectedSpeciesFilter == null && obj.selectedFilters.selectedGenderFilter == null && obj.searchValue !== null) {
    return `(filter : {name:${JSON.stringify(obj.searchValue)}})`;
  } if (obj.selectedFilters.selectedSpeciesFilter !== null && obj.selectedFilters.selectedGenderFilter == null) {
    if (obj.searchValue !== null) {
      return `(filter : {name:${JSON.stringify(obj.searchValue)},species:${JSON.stringify(obj.selectedFilters.selectedSpeciesFilter)}})`;
    }
    return `(filter : {species:${JSON.stringify(obj.selectedFilters.selectedSpeciesFilter)}})`;
  } if (obj.selectedFilters.selectedSpeciesFilter == null && obj.selectedFilters.selectedGenderFilter !== null) {
    if (obj.searchValue !== null) {
      return `(filter : {name:${JSON.stringify(obj.searchValue)},gender:${JSON.stringify(obj.selectedFilters.selectedGenderFilter)}})`;
    }
    return `(filter : {gender:${JSON.stringify(obj.selectedFilters.selectedGenderFilter)}})`;
  } if (obj.selectedFilters.selectedSpeciesFilter !== null && obj.selectedFilters.selectedGenderFilter !== null) {
    if (obj.searchValue !== null) {
      return `(filter : {name:${JSON.stringify(obj.searchValue)},gender:${JSON.stringify(obj.selectedFilters.selectedGenderFilter)},species:${JSON.stringify(obj.selectedFilters.selectedSpeciesFilter)}})`;
    }
    return `(filter : {gender:${JSON.stringify(obj.selectedFilters.selectedGenderFilter)},species:${JSON.stringify(obj.selectedFilters.selectedSpeciesFilter)}})`;
  }
  return '';
}
export default function CharacterSchema(val) {
  const filterQuery = makeFilter(val);
  const CharacterSchemaQ = `query {
        characters${filterQuery} {
            info {
                count
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
