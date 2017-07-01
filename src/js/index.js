const data = {
  index: [
    [1, 2, 3],
    [4, 5, 6]
  ]
}

class PageRender {
  constructor(width) {
    if (width <= 450) {
      this.listContainer = document.createElement('ul')
      this.listContainer.className = 'matrix-container'

      this.createListGroup = () => {
        return document.createElement('ul')
      }
      this.createListItem = data => {
        let item = document.createElement('li')
        item.innerText = data
        return item
      }
    } else {
      this.listContainer = document.createElement('table')
      this.listContainer.className = 'matrix-container'

      this.createListGroup = () => {
        return document.createElement('tr')
      }
      this.createListItem = data => {
        let item = document.createElement('td')
        item.innerText = data
        item.setAttribute('data-123', data)
        return item
      }
    }
  }

  render(data, containerSelector) {
    const container = document.querySelector(containerSelector)

    data.forEach(list => {
      let listGroup = this.createListGroup(list)
      let listItem
      list.forEach(listItem => {
        listItem = this.createListItem(listItem)
        listGroup.appendChild(listItem)
      })
      this.listContainer.appendChild(listGroup)
    })

    container.appendChild(this.listContainer)
  }
}

new PageRender(window.innerWidth).render(data.index, '.pics')
