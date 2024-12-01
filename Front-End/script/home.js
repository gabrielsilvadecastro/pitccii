document.addEventListener('DOMContentLoaded', () => {
  const backgroundMenu = document.getElementById('background-menu')
  const coverPage = document.getElementById('coverPage')
  const closeMenu = document.getElementById('background-close-menu')

  backgroundMenu.addEventListener('click', () => {
    coverPage.classList.remove('hidden')
    console.log('Qualquer Coisa')
    setTimeout(() => {
      coverPage.classList.add('visible')
    }, 10)
  })

  closeMenu.addEventListener('click', () => {
    coverPage.classList.remove('visible')
    setTimeout(() => {
      coverPage.classList.add('hidden')
    }, 500)
  })
})
