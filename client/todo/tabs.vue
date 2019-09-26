<!--
 * @Author: Jodie
 * @Date: 2019-08-22 13:43:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-29 15:15:53
 * @Description:
 -->
<template>
    <div id="helper">
        <span class="left">{{todoLenght}} items</span>
        <span class="tabs">
         <span
         v-for="state in states" :key="state"
        :class="[state,filter ===state?'actived':'']"
        @click="toggleFilter(state)"
         >{{state}}</span>
         </span>
          <span class="clear" @click="clearAllTodo">clear</span>
    </div>
</template>
<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  computed: {
    todoLenght () {
      return this.todos.filter(todo => !todo.completed).length
    }

  },
  methods: {
    clearAllTodo () {
      this.$emit('clearAllTodos')
    },
    toggleFilter (state) {
      this.$emit('toggle', state)
    }
  }
}
</script>

<style lang="stylus" scoped>
#helper{
   font-weight 100
   display flex
   justify-content space-between
   padding 5px 0
   line-height 30px
   background-color #fff
   font-size 14px
   font-smoothing antialiased
  }
  .left, .clear, .tabs{
    padding 0 10px
    box-sizing border-box
    }
    .left, .clear{
      width 150px
      }
    .left{
      text-align left
      }
      .clear{
        text-align right
        cursor pointer
        }
    .tabs{
      width 200px
      display flex
      justify-content space-around//在弹性盒对象的 <div> 元素中的各项周围留有空白：
      *{
        display inline-block
        padding 0 10px
        cursor pointer//光标呈现为指示链接的指针（一只手）
        border 1px solid rgba(175,47,47,0)
     &.actived{
      border-color rgba(175,47,47,0.4)
      border-radius 5px
      }
      }
      }

</style>
