import { Effect, Layer } from "effect";
import { PokeApi } from "./poke-api";
import { PokemonCollection } from "./pokemon-collection";
import { BuildPokeApiUrl } from "./build-poke-api-url";
import { PokeApiUrl } from "./poke-api-url";

export const program = Effect.gen(function* () {
	const pokeApi = yield* PokeApi;
	return yield* pokeApi.getPokemon;
});

const MainLayer = Layer.mergeAll(
	PokeApi.Live,
	PokemonCollection.Live,
	BuildPokeApiUrl.Live,
	PokeApiUrl.Live,
);

const runnable = program.pipe(Effect.provide(MainLayer));

const main = runnable.pipe(
	Effect.catchTags({
		FetchError: () => Effect.succeed("Fetch error"),
		JsonError: () => Effect.succeed("Json error"),
		ParseError: () => Effect.succeed("Parse error"),
	}),
);

Effect.runPromise(main).then(console.log);
