/* eslint-disable no-unused-vars */
import emitter from './emitter'
export default function (respose, title = '更新') {
  if (respose.data.success) {
    this.getProducts()
    this.emitter.emit('push-message', {
      style: 'success',
      title: '更新成功'
    })
  } else {
    this.emitter.emit('push-message', {
      style: 'danger',
      title: '更新失敗',
      content: respose.data.message.join('、')
    })
  }
}
