<!--
 * @Author: Jodie
 * @Date: 2019-09-23 10:32:32
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-09-23 10:48:22
 * @Description:
 -->
<template>
<transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
  <div class="notification"
   :style="style"
    v-show="visible"
    @mouseenter="clearTimer"
    @mouseleave="createTimer"
    >
    <span class="content">{{content}}</span>
    <a class="btn" @click="handleClose">{{btn}}</a>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    }
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  methods: {
    handleClose (e) {
    // 阻止默认事件
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
    afterEnter () {},
    clearTimer () {},
    createTimer () {}

  }
}
</script>
<style lang="stylus" scoped>
.notification
  display :flex
  background-color :#303030
  color rgba(255, 255, 255, 1)
  align-items :center
  padding 20px
  position fixed
  min-width 280px
  box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)
  flex-wrap warn
  transition all .3s
.content
  padding 0
.btn
  color #ff4081
  padding-left 24px
  margin-left auto
  cursor pointer
</style>
