import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import EvolutionChart from '../EvolutionChart/EvolutionChart';
import SearchBar from '../SearchBar/SearchBar';
import PokemonInfoContainer from '../PokemonInfoContainer/PokemonInfoContainer';
import { getPokemonDetails } from '../../services/pokemonProvider';

import './PokemonDetail.css';

const getSpecies = (data) => {
  const { genera = [] } = data;
  const species = genera.find((element) => {
    const { language = {} } = element;
    const { name = '' } = language;
    return name === 'en';
  })
  return species;
}

const loadPokemonSpecies = async url => {
  const speciesData = await getPokemonDetails(url);
  const species = getSpecies(speciesData);
  return {
    species: species.genus,
    eggGroups: speciesData.egg_groups,
    evolutionChainURL: speciesData.evolution_chain.url,
  }
}

const PokemonDetail = ({ pokemon, onSearch, setSearchTerm, searchTerm }) => {
  const [loading, setLoading] = useState(false);
  const [speciesData, setSpeciesData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setSpeciesData(null);
      const { speciesURL = '' } = pokemon;
      const response = await loadPokemonSpecies(speciesURL);
      setSpeciesData(response);
      setLoading(false);
    }

    if (pokemon) {
      loadData();
    }
  }, [pokemon])

  if (loading) {
    return (
      <div>
        Cargando...
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className='okemon-container'>
        <Row className='pokemon-search-row'>
          <SearchBar
            onSearch={onSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Row>
      </div>
    )
  }

  if (!speciesData) {
    return (
      <div>
        Error al cargar la informacion
      </div>
    );
  }

  return (
    <div className="pokemon-container">
      <Row className='pokemon-search-row'>
        <SearchBar
          onSearch={onSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </Row>
      <Row className="pokemon-top-row">
        <Col>
          <PokemonInfoContainer
            pokemon={{
              ...pokemon,
              ...speciesData
            }}
          />
        </Col>
      </Row>
      <div className="separator-line"></div>
      <Row className="pokemon-bottom-row">
        <h3>Evolution Chart</h3>
        <Col>
          <EvolutionChart evolutionChainUrl={speciesData.evolutionChainURL} />
        </Col>
      </Row>
    </div>
  );
}

export default PokemonDetail;
