import { Activity } from '../../activities-state/activity-model.js';

Activity.init();

const editForm = document.getElementById('edit-activity');

renderForm();

editForm.addEventListener('submit', async e => {
  const formData = Object.fromEntries(new FormData(editForm));

  // TODO add data validation
  await Activity.update(getId(), formData.name);

  window.location.href = '../activities/index.html';
});

async function renderForm() {
  const activity = await Activity.find(getId());
  
  editForm.name.value = activity.name;
}

function getId() {
  const params = new URLSearchParams(window.location.search);

  return Number(params.get('id'));
}
