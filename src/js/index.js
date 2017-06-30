const data = {
  index: [
    [1, 2, 3],
    [4, 5, 6]
  ]
}

class PageRender {
  constructor(width) {
    console.log(123)
  }

  render(data, containerSelector) {
    const container = document.querySelector(containerSelector)
    data.forEach(item => {
      container.innerText += item
    })
  }
}

new PageRender(450).render(data.index, '.pics')
