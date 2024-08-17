import { it, expect } from "vitest";
import { program } from "../src/index";
import { PokeApi } from "../src/poke-api";
import { Effect, Layer } from "effect";
import { PokemonCollection } from "../src/pokemon-collection";
import { BuildPokeApiUrl } from "../src/build-poke-api-url";
import { PokeApiUrl } from "../src/poke-api-url";

const MainLayer = Layer.mergeAll(
  PokeApi.Mock,
  PokemonCollection.Live,
  BuildPokeApiUrl.Live,
  PokeApiUrl.Live,
);

const mainTest = program.pipe(Effect.provide(MainLayer));
it("returns a valid pokemon", async () => {
  const response = await Effect.runPromise(mainTest);
  expect(response).toEqual({
    id: 1,
    height: 10,
    weight: 10,
    order: 1,
    name: "my-name",
  });
});
