export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // Уведомляем слушателей если они есть
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }
  // Подписываемся на уведомление
  // Добавляем нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

/*
const emitter = new Emitter()

const unsub = emitter.subscribe('Alex', data => console.log('Sub:', data))
emitter.emit('Alex', 42)

setTimeout(() => {
  emitter.emit('Alex', 42)
}, 4000)

setTimeout(() => {
  unsub()
}, 5000)

setTimeout(() => {
  emitter.emit('Alex', 42)
}, 6000)
*/
