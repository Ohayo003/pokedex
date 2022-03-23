module.exports = {
  client: {
    includes: ["./src/graphql/queries/pokemon/*.ts"],
    service: {
      name: "pokedexapi",
      url: "https://beta.pokeapi.co/graphql/v1beta",
      skipSSLValidation: true,
    },
  },
};
