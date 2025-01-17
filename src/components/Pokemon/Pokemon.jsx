import './Pokemon.css';

const Pokemon = ({ name, imageUrl }) => {
  return (
    <div className="pokemon-stage">
      <img
        src={imageUrl}
        alt={name}
        className="pokemon-image-evolution"
      />
      <h4>{name}</h4>
    </div>
  );
};

export default Pokemon;
