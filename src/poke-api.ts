import { Effect, Context, Layer } from "effect";
import { Schema } from "@effect/schema";
import { FetchError, JsonError } from "./errors";
import { Pokemon } from "./schema";
import { PokemonCollection } from "./pokemon-collection";
import { BuildPokeApiUrl } from "./build-poke-api-url";

const make = {
	getPokemon: Effect.gen(function* () {
		const pokemonCollection = yield* PokemonCollection;
		const buildPokemonUrl = yield* BuildPokeApiUrl;

		const requestUrl = buildPokemonUrl({ name: pokemonCollection[0] });

		const response = yield* Effect.tryPromise({
			try: () => fetch(requestUrl),
			catch: () => new FetchError(),
		});

		if (!response.ok) {
			return yield* new FetchError();
		}
		const json = yield* Effect.tryPromise({
			try: () => response.json(),
			catch: () => new JsonError(),
		});
		return yield* Schema.decodeUnknown(Pokemon)(json);
	}),
};

class PokeApi extends Context.Tag("PokeApi")<PokeApi, typeof make>() {
	static readonly Live = Layer.succeed(this, make);
}

export { PokeApi };
