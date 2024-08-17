import { Effect, Layer, ManagedRuntime } from "effect";
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

const PokemonRuntime = ManagedRuntime.make(MainLayer);

const main = program.pipe(
  Effect.catchTags({
    FetchError: () => Effect.succeed("Fetch error"),
    JsonError: () => Effect.succeed("Json error"),
    ParseError: () => Effect.succeed("Parse error"),
  }),
);

PokemonRuntime.runPromise(main).then(console.log);
