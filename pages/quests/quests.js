import { Quest } from '../../models/quest-model.js';
import { Activity } from '../../models/activity-model.js';

Activity.init();
Quest.init();

const questList = document.getElementById('quests');

renderQuests();

async function renderQuests() {
  const quests = await Quest.all();

  questList.innerHTML = quests.map(quest => `
    <li>
      <a href="../edit-quest/index.html?id=${quest.id}">
        ${quest.activity.name}
      </a>
    </li>
  `).join('');
}
