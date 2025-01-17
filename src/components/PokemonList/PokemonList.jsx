import PokemonListItem from './PokemonListItem/PokemonListItem';

import './PokemonList.css';

const PokemonList = ({ fetchNewPokemons, onPokemonClick, pokemons, loading }) => {
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      fetchNewPokemons();
    }
  };

  return (
    <div className="pokemon-list" onScroll={handleScroll}>
      {pokemons.map((pokemon, index) => (
        <PokemonListItem
          key={pokemon.number}
          pokemon={pokemon}
          onClick={onPokemonClick}
          position={index}
        />
      ))}
      {loading && <div className="loading">Cargando...</div>}
    </div>
  );
}

export default PokemonList;
