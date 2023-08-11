import { Activity } from "../../models/activity-model.js"; 
import { Quest } from "../../models/quest-model.js";

Activity.init();
Quest.init();

renderForm();

async function renderForm() {
  const activity = await Activity.find(getId());
  
  document.getElementById('activity-name').innerHTML = activity.name;
}

function getId() {
  const params = new URLSearchParams(window.location.search);
  
  return Number(params.get('id'));
}
