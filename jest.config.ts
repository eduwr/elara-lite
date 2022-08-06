import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  rootDir: "./src",
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["js", "ts", "json"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
export default config;
