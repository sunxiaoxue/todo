const path = require('path')
const VueLoaderPlugin=require('vue-loader/lib/plugin')
const HtmlPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
const isDev=process.env.NODE_env==='development'
const config={
   mode:'production',
   target:'web',
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/.vue$/,
                loader:'vue-loader'
                
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'
            },
            //css预处理
            {
              test:/\.styl/,
              use:[
                  'style-loader',
                  'css-loader',
                  {
                      loader:'postcss-loader',
                     options:{
                         sourceMap:true
                     }
                  },
                  'stylus-loader'
              ]
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
             {
                 test:/\.(gif|png|svg|jpg|jpep)$/,
                 use:[
                     {
                         loader:'url-loader',
                         options:{
                             limit:1024,
                             name:'[name]-as.[ext]'
                         }
                    }

                     
                 ]
             }
        ]
            
        
    },
    plugins:[
        new webpack.DefinePlugin({//在webpack编译的过程当中，以及在页面上自己写的js代码的时候判断这个环境，都可以调用process-env.NODE_ENV进行判断
            'process-env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HtmlPlugin()
    ]

}

if(isDev){
 config.devServer={
     port:8080,
     host:'0.0.0.0',
     overlay:{
         errors:true
     },
     hot:true
 }
 config.plugins.push(
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoEmitOnErrorsPlugin()
 )
}
module.exports=config