import { createTest, destroyVM } from '../utils'
import Cell from 'src/components/Cell'

describe('Cell.vue', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('should render correct title', () => {
    vm = createTest(Cell, {
      title: 'test title'
    }, true)
    expect(vm.$el.querySelector('.weui_cell_bd p').innerText)
      .to.equal('test title')
  })
})
