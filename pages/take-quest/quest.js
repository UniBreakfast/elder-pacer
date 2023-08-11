import { Activity } from "../../models/activity-model.js"; 
import { Quest } from "../../models/quest-model.js";

Activity.init();
Quest.init();

const questForm = document.getElementById('quest-form');

renderForm();

questForm.addEventListener('submit', async e => {
  const formData = Object.fromEntries(new FormData(questForm));
  const date = new Date().toISOString();

  // TODO add data validation
  await Quest.add(getId(), Number(formData.duration), date);

  window.location.href = '../quests/index.html';
});

async function renderForm() {
  const activity = await Activity.find(getId());
  
  document.getElementById('activity-name').innerHTML = activity.name;
}

function getId() {
  const params = new URLSearchParams(window.location.search);

  return Number(params.get('id'));
}
