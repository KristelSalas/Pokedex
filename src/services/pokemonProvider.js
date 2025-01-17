import axios from 'axios';

export const POKEMONS_PER_PAGE = 50;
const BASE_URL = 'https://pokeapi.co/api/v2';
const TOTAL_POKEMONS = 1302;

export const getPokemonList = async (offset = 0, limit = POKEMONS_PER_PAGE) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de pokemones:', error);
    throw error;
  }
};

export const getPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el pokemon ${url}:`, error);
    throw error;
  }
};

export const getPokemonDetailsByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el pokemon ${name}:`, error);
    throw error;
  }
}

export const getAllPokemons = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: { limit: TOTAL_POKEMONS, offset: 0 }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de pokemones:', error);
    throw error;
  }
}