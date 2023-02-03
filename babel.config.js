module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  retainLines: true,
  plugins: ['react-native-reanimated/plugin'],
};

// [
//   'babel-plugin-root-import',
//   {
//     rootPathPrefix: '~src/',
//     rootPathSuffix: 'src',
//   },
// ],
