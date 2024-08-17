import { Schema } from "@effect/schema";

class Pokemon extends Schema.Class<Pokemon>("Pokemon")({
	id: Schema.Number,
	order: Schema.Number,
	name: Schema.String,
	height: Schema.Number,
	weight: Schema.Number,
}) {}

export { Pokemon };
