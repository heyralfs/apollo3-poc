import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				pokemon_v2_pokemon: {
					// Don't cache separate results based on
					// any of this field's arguments.
					keyArgs: false,
					// Concatenate the incoming list items with
					// the existing list items.
					merge(existing, incoming) {
						return [...(existing ?? []), ...incoming];
					},
					// If you define a read function for a field,
					// the cache calls that function whenever your client queries for the field.
					// In the query response, the field is populated with the
					// read function's return value, instead of the field's cached value.
					read(existing) {
						return existing;
					},
				},
			},
		},
	},
});

export const client = new ApolloClient({
	uri: "https://beta.pokeapi.co/graphql/v1beta",
	cache,
});
