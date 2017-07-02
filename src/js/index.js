const data = {
  index: [
    [{
      src: 'assets/test1.jpg',
      text: 'image1'
    }, {
      src: 'assets/test2.png',
      text: 'image2'
    }, {
      src: 'assets/test1.jpg',
      text: 'image3'
    }, {
      src: 'assets/test2.png',
      text: 'image4'
    }],
    [{
      src: 'assets/test1.jpg',
      text: 'image5'
    }, {
      src: 'assets/test2.png',
      text: 'image6'
    }, {
      src: 'assets/test1.jpg',
      text: 'image7'
    }, {
      src: 'assets/test2.png',
      text: 'image'
    }]
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
        let itemDiv = document.createElement('div')
        let itemImg = document.createElement('img')
        let itemP = document.createElement('p')

        itemImg.src = data.src
        itemP.innerText = data.text

        itemDiv.appendChild(itemImg)
        itemDiv.appendChild(itemP)
        item.appendChild(itemDiv)

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
