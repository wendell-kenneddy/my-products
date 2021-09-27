const webpack = require('webpack');
const configs = require('./webpack-configs');

webpack(configs, (err, stats) => {
  if (err) {
    console.log(err.stack || err);

    if (err.message) {
      console.log(err.message);
    }

    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.log(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
});
