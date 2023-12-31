import { Activity } from "../../models/activity-model.js";

Activity.init();

const activitiesList = document.getElementById('activities');

renderActivities();

async function renderActivities() {
  const activities = await Activity.all();

  activitiesList.innerHTML = activities.map(activity => `
    <li>
      <a href="../take-quest/index.html?id=${activity.id}">
        ${activity.name}
      </a>
    </li>
  `).join('');
}
