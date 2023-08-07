import { Activity } from "../../activities-state/activity-model.js"

const addForm = document.getElementById('add-activity')

Activity.init()

addForm.addEventListener('submit', async e => {
  const formData = Object.fromEntries(new FormData(addForm))

  // TODO add data validation
  await Activity.add(formData.title)

  window.location.href = '../activities/index.html'
})
