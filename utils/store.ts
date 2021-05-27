import type { Scalar } from "types";

import { dirname as pathDirname, resolve as pathResolve } from "deno-std";

type JSONConfig = Record<string, Scalar>;

class Config {
  #store: JSONConfig;
  #path: string;
  #serializer: (value: JSONConfig | Scalar) => string;
  #deserializer: (
    text: string,
    reviver?: ((key: string, value: Scalar) => Scalar) | undefined,
  ) => JSONConfig;

  constructor() {
    const homePath = Deno.env.get("HOME");
    if (typeof homePath === "undefined") {
      throw new Error("Could not find home path for config.");
    }

    this.#store = Object.create(null);
    this.#path = pathResolve(homePath, ".config/barrel/config.json");
    this.#serializer = (value: Scalar | JSONConfig): string =>
      JSON.stringify(value, null, "\t");
    this.#deserializer = JSON.parse;

    this.refreshStore();
  }

  private write() {
    const encoder = new TextEncoder();
    const data = encoder.encode(this.#serializer(this.#store));
    try {
      Deno.writeFileSync(this.#path, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private refreshStore(): void {
    try {
      const decoder = new TextDecoder("utf-8");
      const fileData = Deno.readFileSync(this.#path);

      this.#store = this.#deserializer(decoder.decode(fileData));
    } catch (error) {
      if (error.name === "NotFound") {
        Deno.mkdirSync(pathDirname(this.#path), { recursive: true });
        return;
      }

      throw error;
    }
  }

  get(key: string): Scalar | undefined {
    return this.#store[key];
  }

  set(key: string, value: Scalar): Scalar {
    this.#store[key] = value;
    this.write();

    return value;
  }

  remove(key: string): Scalar {
    const removedValue = this.#store[key];
    delete this.#store[key];
    this.write();

    return removedValue;
  }
}

export const Store = new Config();
