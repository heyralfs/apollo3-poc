"use client";

import { gql, useQuery } from "@apollo/client";
import { client } from "./apollo-client";
import { useState } from "react";

type Data = {
	pokemon_v2_pokemon: {
		id: number;
		name: string;
	}[];
};

type Variables = {
	limit?: number | null;
	offset?: number | null;
};

const POKEMON_QUERY = gql`
	query PokemonQuery($limit: Int, $offset: Int) {
		pokemon_v2_pokemon(limit: $limit, offset: $offset) {
			id
			name
		}
	}
`;

const FETCH_LIMIT = 3;

export function usePokemons() {
	const {
		loading,
		data,
		error,
		fetchMore: more,
	} = useQuery<Data, Variables>(POKEMON_QUERY, {
		client,
		variables: {
			limit: FETCH_LIMIT,
		},

		// context: {
		// 	fetchOptions: {
		// 		next: {
		// 			revalidate: 1,
		// 		},
		// 	},
		// },

		// Makes the component rerender with loading=true when fetchMore is called
		notifyOnNetworkStatusChange: true,
	});

	const [hasMore, setHasMore] = useState(true);

	const fetchMore = () => {
		more({
			variables: {
				limit: FETCH_LIMIT,
				offset: data?.pokemon_v2_pokemon.length,
			},
			// updateQuery: (prev, { fetchMoreResult, variables }) => {
			// 	if (
			// 		fetchMoreResult.pokemon_v2_pokemon.length < variables.limit
			// 	) {
			// 		setHasMore(false);
			// 	}
			// 	return {
			// 		...prev,
			// 		pokemon_v2_pokemon: [
			// 			...prev.pokemon_v2_pokemon,
			// 			...fetchMoreResult.pokemon_v2_pokemon,
			// 		],
			// 	};
			// },
		});
	};

	const pokemons = data?.pokemon_v2_pokemon;

	return {
		pokemons,
		loading,
		error,
		fetchMore,
		hasMore,
	};
}
