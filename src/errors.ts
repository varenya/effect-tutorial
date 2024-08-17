import { Data } from "effect";

class FetchError extends Data.TaggedError("FetchError")<Readonly<{}>> {}
class JsonError extends Data.TaggedError("JsonError")<Readonly<{}>> {}

export { JsonError, FetchError };
