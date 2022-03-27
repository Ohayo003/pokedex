const pokemonImage = (id: number) => {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  return image;
};
export default pokemonImage;
