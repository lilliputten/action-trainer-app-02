// @ts-check

const fs = require('fs');
const path = require('path');

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CracoEnvPlugin = require('craco-plugin-env');
const CopyPlugin = require('copy-webpack-plugin');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const BeautifyHtmlWebpackPlugin = require( '@sumotto/beautify-html-webpack-plugin' );

const webpack = require('webpack');

const rootPath = path.resolve(__dirname).replace(/\\/g, '/');

/** Scenario id file */
const scenarioIdFile = 'project-scenario-id.txt';

/** Current scenario id */
const scenarioId = fs.readFileSync(path.posix.join(rootPath, scenarioIdFile), 'utf8').trim();

/** To use analyzer? */
const startAnalyzer = !!process.env.START_ANALYZER;

const cracoConfig = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @use 'sass:math';
          @use 'sass:color';
          @import "src/core/assets/scss/variables.scss";
          @import "src/core/assets/scss/mixins.scss";
        `,
      },
    },
  },
  plugins: [
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {
          USE_MIRAGE_SERVER: process.env['USE_MIRAGE_SERVER'] || false,
        },
      },
    },
  ],
  webpack: {
    plugins: {
      add: [
        new webpack.DefinePlugin({
          'process.env.SCENARIO_ID': JSON.stringify(scenarioId),
        }),
        new CopyPlugin({
          patterns: [
            // Copy videos
            { from: `${rootPath}/scenarios-data/${scenarioId}`, to: 'scenario-data' },
            // Copy project info
            { from: `${rootPath}/project-info.txt`, to: '' },
          ],
        }),
        // Prettify html
        new BeautifyHtmlWebpackPlugin(),
        // Enable core nodejs polyfills (like 'buffer' etc) for webpack 5
        new NodePolyfillPlugin(),
        // Build analyzer
        startAnalyzer &&
          new BundleAnalyzerPlugin({
            // @see: https://www.npmjs.com/package/webpack-bundle-analyzer#options-for-plugin
            analyzerMode: 'server',
          }),
      ].filter(Boolean),
    },
  },
};

module.exports = cracoConfig;
