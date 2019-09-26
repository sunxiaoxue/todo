<template>
    <div id="app">

        <Header>
        </Header>
        <p> {{fullName}} {{count}}</p>
        <todo></todo>
        <router-view/>
<button @click="notify">click</button>
        <!-- <notification content="test notify"></notification> -->
        <Footer></Footer>
    </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import Header from './todo/heard.vue'
import Todo from './todo/todo.vue'
import Footer from './todo/footer.jsx'
export default {
  metaInfo: {
    title: 'joide'
  },
  components: {
    Header,
    Todo,
    Footer
  },
  data () {
    return {
      text: 254
    }
  },
  mounted () {
    // this.$notify({
    //   content: 'test $notify',
    //   btn: 'close'
    // })

    this.updateCountAsync({
      num: 5,
      time: 2000
    })
  },
  computed: {
    ...mapState(['count']),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters(['fullName'])
    // fulName () {
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateState']),
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  }
}
</script>
<style lang="stylus"  scoped>
#navs ul{
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
