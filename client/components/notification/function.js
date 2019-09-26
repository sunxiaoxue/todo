import Vue from 'Vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

// 删除方法
const removeInstance = (instance) => {
  if (!instance) return

  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)
  instances.splice(index, 1)

  if (len <= 1) return // 如果是最后一个节点，删掉就没了，直接return
  const removeHeight = instance.vm.height
  // 从删掉的节点开始计算，在他下面的不用调整位置，在他上面要调整位置
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
      parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  if (Vue.prototype.$isServer) return

  const {
    autoClose,
    ...rest
  } = options
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)

  instance.vm.$on('closed', () => {
    // 执行删除节点的操作
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)// 主动删除dom节点
    instance.vm.$destroy()// vm就彻底销毁  不会把dom里的节点删掉，只会把vm对象给删除
  })
  // 监听handleClose(),visable=false 就会关闭这个动画，，调用closed
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}
export default notify
