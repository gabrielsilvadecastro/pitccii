window.addEventListener('scroll', function () {
  var menu = document.querySelector('.hero-header')
  var scrollPosition = window.scrollY

  if (scrollPosition > 420) {
    menu.classList.add('fixed')
  } else {
    menu.classList.remove('fixed')
  }
})

window.addEventListener('scroll', function () {
  var menu = document.querySelector('.menu-colors')
  var scrollPosition = window.scrollY

  if (scrollPosition > 420) {
    menu.classList.add('fixed')
  } else {
    menu.classList.remove('fixed')
  }
})

/* When Scroll */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
})
