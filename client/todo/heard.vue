<!--
 * @Author: Jodie
 * @Date: 2019-08-22 13:42:32
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-22 13:45:32
 * @Description:
 -->
<template>
    <header id="header">

        <!-- <ul>
          <router-link to="/shouye" tag='li'>首页</router-link>
          <li><router-link to="/zhishi">知识讲解</router-link></li>
          <li><router-link to="/mode">模块分析</router-link></li>
          <li><router-link to="/my">关于我们</router-link></li>
        </ul> -->

        <h1>todo</h1>
    </header>
</template>

<style  lang="stylus"  scoped>
#header{

    text-align: center;
    font-size: 24px;
    font-weight: inherit
}
#header ul{
 list-style: none;
 display flex
 width 80%
 justify-content: flex-end
}
ul li{
  background #e6e6e6;
  width 100px
  margin 5px 10px
  font-size 17px

  }
ul li a{
    text-decoration none
  }
</style>
