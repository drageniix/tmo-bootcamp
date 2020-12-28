/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

const environmentVariables =
  typeof process.env.APP_CONTEXT === "string"
    ? JSON.parse(
        process.env.APP_CONTEXT[9] == '"'
          ? process.env.APP_CONTEXT
          : JSON.stringify(process.env.APP_CONTEXT)
      )
    : process.env.APP_CONTEXT;

module.exports = () => {
  const {
    desc: { fullName, shortName, description },
    theme: {
      primary: { main: primaryColor },
      secondary: { main: secondaryColor },
    },
  } = environmentVariables;

  const outputPath = path.join(__dirname, "/public");

  const manifest = {
    name: fullName,
    short_name: shortName,
    description,
    background_color: "#ffffff",
    theme_color: primaryColor,
    fingerprints: false,
    icons: [
      {
        src: path.resolve("./src/assets/icon.png"),
        sizes: [16, 96, 128, 192, 256, 384, 512],
      },
    ],
  };

  function getPlugins() {
    const plugins = [
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve("./src/assets/static/_redirects") },
          { from: path.resolve("./src/assets/fonts"), to: "fonts" },
          { from: path.resolve("./src/assets/lang"), to: "lang" },
        ],
      }),
      new HtmlWebPackPlugin({
        chunks: ["index"],
        template: path.resolve("./src/index.ejs"),
        filename: "index.html",
        title: fullName,
        description,
        themeColor: primaryColor,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
        },
      }),
      new WebpackPwaManifest(manifest),
      new MiniCssExtractPlugin({
        filename: "./styles/[hash].css",
        chunkFilename: "./styles/[name]-[hash].css",
      }),
      new webpack.DefinePlugin({
        "process.env.JSON_APP_CONTEXT": JSON.stringify(environmentVariables),
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
      }),
    ];

    return plugins;
  }

  return {
    entry: {
      index: [
        path.resolve("./src/app.tsx"),
        path.resolve("./src/styles/index.scss"),
      ],
    },
    output: {
      path: outputPath,
      publicPath: "/",
      filename: "./scripts/[name].js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.s?css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                additionalData: `
                  $color-primary: ${primaryColor};
                  $color-secondary: ${secondaryColor};
                `,
              },
            },
          ],
        },
      ],
    },
    plugins: getPlugins(),
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      minimizer: [
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
    },
    devtool: "inline-source-map",
    mode: "development",
    stats: {
      colors: true,
      cachedAssets: false,
      chunks: false,
      modules: false,
      children: false,
      warnings: false,
    },
    devServer: {
      hot: true,
      historyApiFallback: true,
      contentBase: outputPath,
      open: true,
    },
  };
};
