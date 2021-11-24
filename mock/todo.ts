let list = [
  {id: 1, title: 'TodoList列表', status: 1},
  {id: 2, title: 'TodoList添加', status: 1},
  {id: 3, title: 'TodoList编辑', status: 2},
  {id: 4, title: 'TodoList修改状态', status: 1},
  {id: 5, title: 'TodoList删除', status: 1},
  {id: 6, title: 'TodoList搜索', status: 0},
  {id: 7, title: 'TodoList总结', status: 0},
]

export default {
  'GET /api/todolists': list,

  'POST /api/todo': (req, res) => {
    // req.body {todo: 'xxx'}
    // 添加todo
    const item = {
      id: list.length + 1,
      title: req.body.todo,
      status: 0
    }

    list.unshift(item)
    // 返回添加结果
    res.send({
      code: 0,
      message: '添加待办事项成功!'
    })
  },

  'PUT /api/edit': (req, res) => {
    const {id, status} = req.body
    // 筛选 todo, 进行修改
    list.map((item, index) => {
      if (item.id === id) list[index].status = status
    })

    // 返回添加结果
    res.send({
      code: 0,
      message: '修改成功!'
    })
  },
}
