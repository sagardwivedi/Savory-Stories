import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "./openapi.json",
  output: {
    path: "./src/client",
    format: "biome",
    lint: "biome",
  },
})
