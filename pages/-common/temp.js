let coloredBg = !!localStorage.coloredBg

body.classList.toggle('colored-bg', coloredBg)

onkeydown = e => {
  if (e.key === 'Escape') {
    coloredBg = !coloredBg
    body.classList.toggle('colored-bg', coloredBg)
    save()
  }
}

function save() {
  if (coloredBg) {
    localStorage.coloredBg = true
  } else {
    delete localStorage.coloredBg
  }
}
