import './PokemonGeneralInfo.css';
 
const createEggGroups = (eggGroups) => {
  if (eggGroups.length === 0) return '';
  if (eggGroups.length === 1) return `${eggGroups[0]}`;
  return `${eggGroups.slice(0, -1).join(', ')} and ${eggGroups[eggGroups.length - 1]}`;
}

const PokemonGeneralInfo = ({ height, weight, abilities, species, eggGroups }) => {
  const formatedEggGroups = eggGroups.map(element => element.name);
  const formatedAbilities = abilities.map(element => element.ability.name).join(', ');
  return (
    <div className="pokemon-general-info">
      <h3>Information</h3>
      <p><strong>Weight:</strong> {weight}</p>
      <p><strong>Height:</strong> {height}</p>
      <p><strong>Species:</strong> {species}</p>
      <p><strong>Egg Groups:</strong> {createEggGroups(formatedEggGroups)}</p>
      <p><strong>Abilities:</strong> {formatedAbilities}</p>
    </div>
  );
};

export default PokemonGeneralInfo;
