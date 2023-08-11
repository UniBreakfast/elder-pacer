export { Quest }

import { Store } from '../store/store.js'
import { Activity } from './activity-model.js'

const store = new Store('quests')

const statusDict = {
  IN_PROGRESS: 'in progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
}

// const quests = [
//   {
//     id: 4,
//     activity_id: 2,
//     duration: 7,
//     progress: 4,
//     start_date: '2020-01-01T00:00:00.000Z',
//     end_date: '2020-01-07T00:00:00.000Z',
//     status: statusDict.IN_PROGRESS,
//     archived: false,
//   },
// ]

class Quest {
  #activity = null

  constructor(params) {
    this.id = params.id || genId()
    this.activity_id = params.activity_id
    this.duration = params.duration
    this.progress = params.progress || 0
    this.start_date = params.start_date
    this.end_date = params.end_date || new Date(new Date(params.start_date) + params.duration * 24 * 60 * 60 * 1000).toISOString()
    this.completed = params.completed || statusDict.IN_PROGRESS
    this.archived = params.archived || false
  }

  static async init() {
    store.load()
  }

  static async add(activity_id, duration, start_date) {
    const quest = new Quest({activity_id, duration, start_date})
    await store.add(quest)

    return quest
  }

  static async all() {
    let quests = await store.all()
    quests = quests.map(q => new Quest(q))

    for (const quest of quests) {
      quest.#activity = await Activity.find(quest.activity_id)
    }

    return quests
  }

  static async find(id) {
    return Quest.all().find(q => q.id === id)
  }

  static async step(id) {
    const quest = Quest.find(id)
    if (!quest) return false

    quest.progress += 1
    if (quest.progress === quest.duration) {
      quest.completed = statusDict.COMPLETED
    }
    return true
  }

  static async archive(id) {
    const quest = Quest.find(id)
    if (!quest) return false

    quest.archived = true
    return true
  }

  static async filter({status, archived}) {
    return Quest.all().filter(q => {
      if (status && q.status !== status) return false
      if (archived && q.archived !== archived) return false
      return true
    })
  }

  isActive() {
    return this.status === statusDict.IN_PROGRESS
  }

  get activity() {
    return this.#activity
  }
}

const genId = () => Math.floor(Math.random() * 1000000)
const getDate = () => new Date().toISOString()
