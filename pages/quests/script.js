quests.onclick = e => {
  if (e.target === quests) return

  selectNone()
  select(e.target)
}

function selectNone() {
  quests.querySelectorAll('.selected').forEach(
    el => el.classList.remove('selected')
  )
}

function select(el) {
  el.classList.add('selected')
}
