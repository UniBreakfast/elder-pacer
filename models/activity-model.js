export { Activity }

import { Store } from '../store/store.js'

const store = new Store('activities')

// const activities = [
//   {id: 1, name: 'Learn Spanish 1 hour'},
//   {id: 2, name: 'Learn English 1 hour'},
// ]

class Activity {
  constructor(name) {
    this.id = genId()
    this.name = name
  }

  static async init() {
    store.load()
  }

  static async add(name) {
    const activity = new Activity(name)
    await store.add(activity)

    return activity
  }

  static async all() {
    return store.all()
  }

  static async find(id) {
    return store.find(id)
  }

  static async update(id, name) {
    const activity = await Activity.find(id)
    if (!activity) return false

    activity.name = name
    await store.update(id, activity)

    return true
  }

  static async filter(substring) {
    const activities = await Activity.all()
    return activities.filter(a => a.name.includes(substring))
  }

  static async remove(id) {
    return store.remove(id)
  }
}

const genId = () => Math.floor(Math.random() * 1000000)
