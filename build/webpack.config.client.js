//依赖webpack.config.base.js 进行扩展配置，，
//安装 webpack-merge工具  帮助我们去扩展我们的配置文件,合并不同的webpack配置
const path=require('path')
const baseConfig=require('./webpack.config.base')
const HtmlPlugin=require('html-webpack-plugin')
const merge=require('webpack-merge')
const webpack=require('webpack')
//const ExtractPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const isDev=process.env.NODE_ENV==='development'

const VueClientPlugin = require('vue-server-renderer/client-plugin')
let config
const devServer={
    port:8000,
    host:'0.0.0.0',
    overlay:{
        errors:true
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
      //disableDotRule: true
      index: '/public/index.html'
    },
    hot:true
}


const defaultPluins=[
    new webpack.DefinePlugin({
        'process-env':{
            NODE_ENV:isDev?'"development"':'"production"'
        }
    }),
    new HtmlPlugin({
      template: path.join(__dirname, 'templatet.html')
    }),
    new VueClientPlugin()
]
if(isDev){

    config=merge(baseConfig,{
        mode:'development',
        devtool:'#cheap-module-eval-source-map',
    module:{
        rules:[
            {
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                      loader:"postcss-loader",
                      options:{
                      sourceMap:true
        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    devServer,
    plugins:defaultPluins.concat([
        new webpack.HotModuleReplacementPlugin(),
       // new webpack.NoEmitOnErrorsPlugin()
    ])
    })

}else{

    config=merge(baseConfig,{
  // mode:'production',
    entry:{
        app:path.join(__dirname,'../client/client-entry.js'),
       // vendor:['vue']
    },
    output:{
        filename:'[name].[chunkhash:8].js',
        publicPath: '/public/'
    },
    module:{
        rules:[
            {
                test:/\.styl/,
                   //fallback:'style-loader',
                   use:[
                    MiniCssExtractPlugin.loader,
                       'css-loader',
                       {
                           loader:'postcss-loader',
                           options:{
                            sourceMap:true
                       }
                       },
                       'stylus-loader'
                   ]

            }
        ]
    },
    optimization:{
      splitChunks:{
        chunks:'all'
      },
      runtimeChunk:true
    },
    plugins:defaultPluins.concat([
       // new ExtractPlugin('styles.[contentHash:8].css'),
       new MiniCssExtractPlugin({
           filename:'styles.[contentHash:8].css'
       })

    ]

)
   })
}
/**
 * @description:
 * @param {type}
 * @return:
 */
module.exports=config
