import { beforeAll, afterAll, afterEach, it, expect } from "vitest";
import { server } from "./node";
import { program } from "../src/index";
import { PokeApi } from "../src/poke-api";
import { Effect } from "effect";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// const mainTest = program.pipe(Effect.provideService(PokeApi, PokeApi.Test));
//
// it("returns a valid pokemon", async () => {
// 	const response = await Effect.runPromise(mainTest);
// 	expect(response).toEqual({
// 		id: 1,
// 		height: 10,
// 		weight: 10,
// 		order: 1,
// 		name: "myname",
// 	});
// });
