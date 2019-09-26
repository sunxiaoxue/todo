//所有webpack都要用到的共同配置

const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const createVueLoaderOptions=require('../build/vue-loader.config')
const isDev=process.env.NODE_ENV==='development'
const config={
  mode:process.env.NODE_ENV || 'production',
    target:'web',
    entry:path.join(__dirname,'../client/client-entry.js'),
    output:{
        filename: 'bundle.[hash:8].js',
        path:path.join(__dirname, '../public'),
        publicPath: 'http://127.0.0.1:8000/public/'
    },
    node: {
        fs: "empty"
     },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:createVueLoaderOptions(isDev)
            },
            {
                test: /\.(vue|js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre'
         },
            {
                test:/\.jsx$/,
               loader:'babel-loader'
            },
            {
                test:/\.js$/,
               loader:'babel-loader',
               exclude: /node_modules/ //忽略掉node_modules里的文件的，这里面也都是js文件，在发布的过程中其实已经编译过，不需要babel-loader重新编译
            },

            {
                //url-loader把图片转换成base64代码，直接写在js内容里面，而不用生成一个新的文件，，小于1024时，把图片转换成base64代码，直接写在js内容里面，，name:图片进来时的名字，ext指jpg,png等或者[name]-aa.[ext],自己可以加名字

                test:/\.(jpg|png|svg|gif|jpeg)$/,
                use:[
                   {
                      loader:'url-loader',
                      options:{
                          limit:1024,
                          name:'resourse/[path][name].[hash:8].[ext]'//输出时的名字
                      }
                    }
                ]
            },
              {//element ui
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
              },
              {//element的css不应该用css module编译，因为你这么做了会导致element本身的组件无法使用class
                test: /.css$/,
                loader: 'style-loader!css-loader'
                },
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
],

}


/**
 * @description:
 * @param {type}
 * @return:
 */
module.exports=config
