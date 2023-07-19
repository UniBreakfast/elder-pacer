class Store {
  constructor(key) {
    this.key = key
    this.state = []
  }

  static async getStore(key) {
    const store = new Store(key)
    await store.load()
    return store
  }
  
  async load() {
    const state = localStorage[this.key]
    if (!state) {
      localStorage[this.key] = JSON.stringify(this.state)
      return
    }
    this.state = JSON.parse(state)
  }

  async save() {
    localStorage[this.key] = JSON.stringify(this.state)
  }

  async all() {
    return this.state
  }

  async find(id) {
    return this.state.find(s => s.id === id)
  }

  async add(obj) {
    this.state.push(obj)
    this.save()
  }

  async update(id, obj) {
    const index = this.state.findIndex(s => s.id === id)
    if (index === -1) return false

    this.state[index] = obj
    this.save()
    return true
  }

  async remove(id) {
    const index = this.state.findIndex(s => s.id === id)
    if (index === -1) return false

    this.state.splice(index, 1)
    this.save()
    return true
  }
}
