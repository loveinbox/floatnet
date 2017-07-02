/* active */
const currentHref = window.location.pathname.split('/').pop().slice(0)

let activeTab = document.querySelector(`a[href='${currentHref}']`)

activeTab = activeTab || document.querySelector(`a[href='work.html']`)
activeTab.className = 'active'

/* show menu */
const menuButton = document.querySelector('.menu-img-wrap')
const menuCloseButton = document.querySelector('#cross')
const menu = document.querySelector('.menu ul')

menuButton.addEventListener('click', event => {
  menu.className = 'active'
  menuCloseButton.style.display = 'block'
  menuButton.style.display = 'none'
})

menuCloseButton.addEventListener('click', event => {
  menu.className = ''
  menuCloseButton.style.display = 'none'
  menuButton.style.display = 'block'
})
