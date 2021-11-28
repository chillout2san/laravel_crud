import { useState, useEffect, ChangeEvent } from 'react'
import { client, postMethod } from './lib/axios'
import { createURLSearchParams } from './utils'
interface TodoType {
  id: string
  name: string
  status: string
}

const WORK_IN_PROGRESS = '作業中'
const DONE = '完了'

export const Main = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [todoName, setTodoName] = useState('')
  const bindTodoNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoName(event.target.value)
  }

  // 要件１
  const fetchTodos = async () => {
    const { data } = await client.get<TodoType[]>('/fetch_todos')
    setTodos(data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  // 要件２
  const pushTodo = () => {
    const params = createURLSearchParams<TodoType>([
      ['name', todoName],
      ['status', WORK_IN_PROGRESS],
    ])
    postMethod('push_todo', params).then((_response) => fetchTodos())
  }

  // 要件３
  const changeStatus = (id: string, status: string) => {
    const statusParam = status === WORK_IN_PROGRESS ? DONE : WORK_IN_PROGRESS
    const params = createURLSearchParams<TodoType>([
      ['id', id],
      ['status', statusParam],
    ])
    postMethod('change_status', params).then((_response) => fetchTodos())
  }

  // 要件４
  const deleteTodo = (id: string) => {
    const params = createURLSearchParams<TodoType>([['id', id]])
    postMethod('delete_todo', params).then((_response) => fetchTodos())
  }

  return (
    <>
      <p>タスクを追加する</p>
      <input onChange={bindTodoNameValue} type="text" />
      <button onClick={pushTodo}>追加する</button>
      <ul>
        {todos.length > 0 &&
          todos.map(({ id, name, status }, index) => {
            return (
              <li key={id}>
                <p>Index:{index + 1}</p>
                <p>タスク名:{name}</p>
                <p>状況:{status}</p>
                <button onClick={() => changeStatus(id, status)}>
                  変更する
                </button>
                <button onClick={() => deleteTodo(id)}>削除する</button>
              </li>
            )
          })}
      </ul>
    </>
  )
}
