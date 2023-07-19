const statusDict = {
  IN_PROGRESS: 'in progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
}

const quests = [
  // {
  //   id: 4,
  //   activity_id: 2,
  //   duration: 7,
  //   progress: 4,
  //   start_date: '2020-01-01',
  //   end_date: '2020-01-07',
  //   status: statusDict.IN_PROGRESS,
  //   archived: false,
  // },
]

class Quest {
  constructor(activity_id, duration, start_date=getDate()) {
    this.id = genId()
    this.activity_id = activity_id
    this.duration = duration
    this.progress = 0
    this.start_date = start_date
    this.end_date = new Date(new Date(start_date) + duration * 24 * 60 * 60 * 1000).toISOString()
    this.completed = statusDict.IN_PROGRESS
    this.archived = false

    quests.push(this)
  }

  static all() {
    return quests
  }

  static find(id) {
    return Quest.all().find(q => q.id === id)
  }

  static step(id) {
    const quest = Quest.find(id)
    if (!quest) return false

    quest.progress += 1
    if (quest.progress === quest.duration) {
      quest.completed = statusDict.COMPLETED
    }
    return true
  }

  static archive(id) {
    const quest = Quest.find(id)
    if (!quest) return false

    quest.archived = true
    return true
  }

  static filter({status, archived}) {
    return Quest.all().filter(q => {
      if (status && q.status !== status) return false
      if (archived && q.archived !== archived) return false
      return true
    })
  }

  isActive() {
    return this.status === statusDict.IN_PROGRESS
  }
}

const genId = () => Math.floor(Math.random() * 1000000)
const getDate = () => new Date().toISOString()
