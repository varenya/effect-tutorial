import { Effect, Context, Config, Layer } from "effect";

class PokeApiUrl extends Context.Tag("PokeApiUrl")<PokeApiUrl, string>() {
	static readonly Live = Layer.effect(
		this,
		Effect.gen(function* () {
			const baseUrl = yield* Config.string("BASE_URL");
			return `${baseUrl}/api/v2/pokemon`;
		}),
	);
}

export { PokeApiUrl };
