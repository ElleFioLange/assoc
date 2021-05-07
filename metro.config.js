// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = (async () => {
  return {
    transformer: {
      babelTransformerPath: require.resolve("./custom-transformer.js"),
    },
    resolver: {
      assetExts: [
        ...defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
      ],
      sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
    },
  };
})();
