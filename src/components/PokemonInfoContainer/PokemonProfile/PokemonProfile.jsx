import './PokemonProfile.css';

const PokemonProfile = ({ name, imageUrl, types }) => {
  return (
    <div className="pokemon-profile">
      <img
        src={imageUrl}
        alt={name}
        className="pokemon-profile-image"
      />
      <h4 className="pokemon-profile-name">{name}</h4>
      <div className="pokemon-profile-types">
        {types.map((element, index) => (
          <div key={index} className="pokemon-profile-type">
            {element.type.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonProfile;
