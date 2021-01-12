const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [{
    mode: 'production',
    optimization: {
        minimize: true
    },
    entry: {
        'js/layout.min': ['./HTML/js/layout.js', './HTML/sass/layout.scss']
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    module: {
		rules: [
			{
                test: /\.js$/,
                include: /js/,
                exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
                },
                
            },
            {
                test: /\.js$/,
                include: /vendor/,
                exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/css/[name].min.css'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader?-url'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    } 
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }
                ]
            }
        ]
    },
    externals: {
        "$": "jquery"
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./HTML/img"),
                    to: 'img'
                },
                {
                    from: path.resolve(__dirname, "./HTML/index.html")
                },
                {
                    from: path.resolve(__dirname, "./HTML/about.html")
                },
                {
                    from: path.resolve(__dirname, "./HTML/contact.html")
                },
                {
                    from: path.resolve(__dirname, "./HTML/work.html")
                },
                {
                    context: 'HTML',
                    from: "vendor/**/*"
                },
                {
                    from: "css/*.css",
                    context: 'HTML'
                },
                {
                    from: "js/components/*.min.js",
                    context: 'HTML'
                }
            ],
        })
    ],
    resolve: {
        extensions: ['.js', '.scss', '.sass', '.css']
    }
}];