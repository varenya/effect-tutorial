import { Context, Effect, Layer } from "effect";
import { PokeApiUrl } from "./poke-api-url";

class BuildPokeApiUrl extends Context.Tag("BuildPokeApiUrl")<
  BuildPokeApiUrl,
  (props: { name: string }) => string
>() {
  static readonly Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const pokeApiUrl = yield* PokeApiUrl;
      return ({ name }) => `${pokeApiUrl}/${name}`;
    }),
  ).pipe(Layer.provide(PokeApiUrl.Live));
}

export { BuildPokeApiUrl };
