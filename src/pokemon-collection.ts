import { Context, type Array as EArray, Layer } from "effect";

class PokemonCollection extends Context.Tag("PokemonCollection")<
	PokemonCollection,
	EArray.NonEmptyArray<string>
>() {
	static readonly Live = Layer.succeed(this, [
		"staryu",
		"perrserker",
		"flaaffy",
	]);
}

export { PokemonCollection };
