import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { getPokemonDetailsByName, getPokemonDetails } from '../../services/pokemonProvider';

import './EvolutionChart.css';
import Pokemon from '../Pokemon/Pokemon';

const EvolutionChart = ({ evolutionChainUrl }) => {
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      const response = await getPokemonDetails(evolutionChainUrl);
      const evolutionData = response.chain;
      
      const evolutionStages = [];
      let currentStage = evolutionData;

      while (currentStage) {
        const pokemonData = await getPokemonDetailsByName(currentStage.species.name);
        evolutionStages.push({
          name: currentStage.species.name,
          imageUrl: pokemonData.sprites.front_default,
        });
        currentStage = currentStage.evolves_to.length > 0 ? currentStage.evolves_to[0] : null;
      }

      setEvolutionChain(evolutionStages);
      setLoading(false);
    };

    fetchEvolutionChain();
  }, [evolutionChainUrl]);

  if (loading) return <div>Cargando...</div>;

  if (!evolutionChain || evolutionChain.length === 0) {
    return <div>Error al cargar la información</div>;
  }

  return (
    <div className="evolution-chart">
      <Row className="evolution-row">
        {evolutionChain.map((pokemon, index) => (
          <Col key={index} className="evolution-stage">
            <div className="pokemon-stage">
              <Pokemon 
                name={pokemon.name}
                imageUrl={pokemon.imageUrl}
              />
            </div>
            {index < evolutionChain.length - 1 && (
              <div className="arrow">
                <span>&#8594;</span>
              </div>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EvolutionChart;
