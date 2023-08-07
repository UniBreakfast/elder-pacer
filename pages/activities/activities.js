import { Activity } from "../../activities-state/activity-model.js";

Activity.init();

const activitiesList = document.getElementById('activities');

renderActivities();

function renderActivities() {
  Activity.all().then(activities => {
    activitiesList.innerHTML = activities.map(activity => `
      <li>
        <a href="../edit-activity/index.html?id=${activity.id}">
          ${activity.name}
        </a>
      </li>
    `).join('');
  });
}
