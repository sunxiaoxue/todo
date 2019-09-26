const path = require('path')
const baseConfig = require('./webpack.config.base')

const merge = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
let config

config = merge(baseConfig, {
  target:'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output:{
    libraryTarget:'commonjs2',
    filename:'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },

  externals: Object.keys(require('../package.json').dependencies),

    // externals: {
    //   Vue: 'vue'
    // },



  module: {
    rules: [
      {
        test:/\.styl/,

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
  //devServer,
  // import Vue from 'vue'
  // 通过alias设置之后，可以指定import的vue文件到底在哪里
  // 默认情况下是import的vue文件是vue.runtime.xx.js
  // 在开发环境默认的是runtime.esm.js
  // 正式环境runtime.min.js
  // runtime和没有runtime的区别是可不可以在vue对象里写template
  // runtime的代码会报错，不能写template

  plugins:[
    new MiniCssExtractPlugin({
      filename:'styles.[contentHash:8].css'
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.Vue_ENV': "'server'"
  }),
  new VueServerPlugin()
  ]
})
/**
 * @description:
 * @param {type}
 * @return:
 */
module.exports = config
