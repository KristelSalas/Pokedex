import './PokemonListItem.css';

const PokemonListItem = ({ pokemon, onClick, position }) => {
  const { image, name, number } = pokemon;
  return (
    <div className="pokemon-item" onClick={() => onClick(position)}>
      <img src={image} alt={name} className="pokemon-image" />
      <span className="pokemon-name">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
      <span className="pokemon-number">#{number.toString().padStart(3, "0")}</span>
    </div>
  );
};

export default PokemonListItem;
