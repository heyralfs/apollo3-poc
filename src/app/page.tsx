"use client";

import { usePokemons } from "@/use-pokemons";
import Link from "next/link";

export default function Home() {
	const { loading, pokemons, error, fetchMore, hasMore } = usePokemons();

	if (!pokemons && loading) return <span>Loading...</span>;

	if (!pokemons && error) return <span>{error.message}</span>;

	return (
		<div className="p-6">
			<Link href="/another-page">Go to another page</Link>

			<h1 className="font-bold my-3">Pokemons: {pokemons?.length}</h1>

			<ul className="mb-4">
				{pokemons?.map(({ id, name }) => (
					<li key={id}>{name}</li>
				))}
			</ul>

			{hasMore && (
				<button
					className="bg-slate-100 p-1 rounded-sm text-black disabled:bg-slate-400"
					onClick={fetchMore}
					disabled={loading}
				>
					{loading ? "loading..." : "more"}
				</button>
			)}
		</div>
	);
}
