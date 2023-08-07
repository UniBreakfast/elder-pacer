activities.onclick = e => {
  if (e.target === activities) return

  selectNone()
  select(e.target)
}

function selectNone() {
  activities.querySelectorAll('.selected').forEach(
    el => el.classList.remove('selected')
  )
}

function select(el) {
  el.classList.add('selected')
}
