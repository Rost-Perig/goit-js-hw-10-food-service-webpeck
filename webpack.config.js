const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },

    // Spin up a server for quick development
    devServer: {
        port: 8888,
        },
  
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
             // шрифты и SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            // CSS, PostCSS, Sass
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },

            { test: /\.handlebars$/, loader: "handlebars-loader" },

            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
                exclude: /(node_modules|bower_components)/
            },
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/template.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),

        new CleanWebpackPlugin(),
        
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), "src", "templates", "*.hbs"),       
      // output path and filename(s). This should lie within the webpacks output-folder
      // if ommited, the input filepath stripped of its extension will be used
            output: path.join(process.cwd(), "dist", "[name].html"),
      // you can also add a [path] variable, which will emit the files with their relative path, like
      // output: path.join(process.cwd(), "build", [path], "[name].html"),
      
      // data passed to main hbs template: `main-template(data)`
            data: require("./src/data/dish-menu.json"),
      
      // or add it as filepath to rebuild data on change using webpack-dev-server
         // data: path.join(__dirname, "app/data/project.json"),
 
      // globbed path to partials, where folder/filename is unique
            partials: [
               path.join(process.cwd(), "src", "templates", "*", "*.hbs")
            ],

      // register custom helpers. May be either a function or a glob-pattern
            helpers: {
              nameOfHbsHelper: Function.prototype,
              projectHelpers: path.join(process.cwd(), "app", "helpers", "*.helper.js")
            },
  
      // hooks
      // getTargetFilepath: function (filepath, outputTemplate) {},
      // getPartialId: function (filePath) {}
      onBeforeSetup: function (Handlebars) {},
      onBeforeAddPartials: function (Handlebars, partialsMap) {},
      onBeforeCompile: function (Handlebars, templateContent) {},
      onBeforeRender: function (Handlebars, data, filename) {},
      onBeforeSave: function (Handlebars, resultHtml, filename) {},
      onDone: function (Handlebars, filename) {}
    })
    ],
}