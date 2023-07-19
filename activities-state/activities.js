const activities = [
  // {id: 1, name: 'Learn Spanish 1 hour'},
  // {id: 2, name: 'Learn English 1 hour'},
]

class Activity {
  constructor(name) {
    this.id = genId()
    this.name = name

    activities.push(this)
  }

  static all() {
    return activities
  }

  static update(id, name) {
    const activity = Activity.find(id)
    if (!activity) return false

    activity.name = name
    return true
  }

  static find(id) {
    return Activity.all().find(a => a.id === id)
  }

  static filter(substring) {
    return Activity.all().filter(a => a.name.includes(substring))
  }

  static remove(id) {
    const index = Activity.all().findIndex(a => a.id === id)
    if (index === -1) return false

    Activity.all().splice(index, 1)
    return true
  }
}

const genId = () => Math.floor(Math.random() * 1000000)
