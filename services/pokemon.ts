import { createApi, fetchBaseQuery, defaultSerializeQueryArgs } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: [],
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon${name}`, 
    }),
    getPokemonByNameList: builder.query({
      query: (name) => `pokemon${name}`,
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        var obj = {results: []}
        currentCache = currentCache.results.concat(newItems.results)
        obj.results = currentCache;
        currentCache = obj;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetPokemonByNameListQuery } = pokemonApi