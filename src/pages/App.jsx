import { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { getPokemonList, getPokemonDetails, getAllPokemons, POKEMONS_PER_PAGE } from '../services/pokemonProvider.js';
import PokemonDetail from '../components/PokemonDetail/PokemonDetail.jsx';
import PokemonList from '../components/PokemonLIst/PokemonList.jsx';

import './App.css'

const fetchPokemonDetails = async list => {
  return await Promise.all(
    list.map(async (pokemon) => {
      const pokemonDetails = await getPokemonDetails(pokemon.url);
      return {
        name: pokemonDetails.name,
        number: pokemonDetails.id,
        image: pokemonDetails.sprites.front_default,
        height: pokemonDetails.height,
        weight: pokemonDetails.weight,
        abilities: pokemonDetails.abilities,
        types: pokemonDetails.types,
        speciesURL: pokemonDetails.species.url,
      };
    })
  );
}

const loadPokemons = async (offset) => {
  const data = await getPokemonList(offset);
  return fetchPokemonDetails(data.results);
};

const searchPokemons = async (searchTerm) => {
  const data = await getAllPokemons();
  const filteredPokemons = data.results.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  })
  return fetchPokemonDetails(filteredPokemons);
}

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFound, setPokemonsFound] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const onPokemonClick = (position) => {
    if (pokemonsFound) {
      setSelectedPokemon(pokemonsFound[position]);
    }
    else {
      setSelectedPokemon(pokemons[position]);
    }
  }

  const onSearch = async (searchTerm) => {
    if (searchTerm !== '') {
      const pokemons = await searchPokemons(searchTerm);
      setPokemonsFound(pokemons);
    }
    else {
      setPokemonsFound(null);
    }
  }

  useEffect(() => {
    const initalLoad = async () => {
      setLoading(true);
      const initalPokemons = await loadPokemons(0);
      setPokemons(initalPokemons);
      setOffset(POKEMONS_PER_PAGE);
      setLoading(false);
    }
    initalLoad();
  }, []);

  const fetchNewPokemons = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const newPokemons = await loadPokemons(offset);
    setPokemons((prev) => [...prev, ...newPokemons]);
    setOffset(prev => prev + POKEMONS_PER_PAGE);
    setLoading(false);
  }, [loading, offset]);
  
  const pokemonList = pokemonsFound ? pokemonsFound : pokemons;

  return (
    <div className='main-container'>
      <Container fluid className='container-fluid'>
        <Row className='fullscreen-row'>
          <Col xs={4} md={3} className='left-column'>
            <PokemonList 
              fetchNewPokemons={fetchNewPokemons} 
              onPokemonClick={onPokemonClick}
              pokemons={pokemonList}
              loading={loading}
            />
          </Col>
          <Col xs={8} md={9} className='right-column'>
            <PokemonDetail 
              pokemon={selectedPokemon} 
              searchTerm={searchTerm}
              onSearch={onSearch}
              setSearchTerm={setSearchTerm}
            /> 
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App
