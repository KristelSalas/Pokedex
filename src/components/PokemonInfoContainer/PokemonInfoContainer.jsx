import { Row, Col } from 'react-bootstrap';
import PokemonGeneralInfo from './PokemonGeneralInfo/PokemonGeneralInfo';
import PokemonProfile from './PokemonProfile/PokemonProfile';

const PokemonInfoContainer = ({ pokemon }) => {
  if (!pokemon) return null;

  return (
    <Row className="pokemon-info-container">
      <Col md={6} className="pokemon-left-column">
        <PokemonProfile
          name={pokemon.name}
          types={pokemon.types}
          imageUrl={pokemon.image}
        />
      </Col>
      <Col md={6} className="pokemon-right-column">
        <PokemonGeneralInfo 
          height={pokemon.height} 
          weight={pokemon.weight} 
          abilities={pokemon.abilities} 
          species={pokemon.species}
          eggGroups={pokemon.eggGroups}
        />
      </Col>
    </Row>
  );
};

export default PokemonInfoContainer;
