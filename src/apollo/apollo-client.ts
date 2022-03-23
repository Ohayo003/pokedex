import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useState } from "react";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const pokedexapi = new HttpLink({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
});

const authentication = new HttpLink({
  uri: "https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const data = await getSession();
  // console.log(data?.user);
  const token = data?.user!;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "pokedexapi",
    pokedexapi,
    authLink.concat(authentication)
  ),
  cache: new InMemoryCache(),
});
export default client;
