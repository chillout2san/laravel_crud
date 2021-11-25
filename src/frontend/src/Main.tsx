import { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'

interface todoType {
  id: number
  name: string
  status: string
}

const WORK_IN_PROGRESS = '作業中'
const DONE = '完了'

export const Main = () => {
  const [todos, setTodos] = useState<todoType[]>([])
  const [todoName, setTodoName] = useState<string>('')
  const bindTodoNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoName((todoName) => (todoName = event.target.value))
  }

  // 要件１
  const fetchTodos = () => {
    axios.get('http://localhost/public/fetch_todos').then((response) => {
      setTodos(response.data)
    })
  }
  useEffect(() => fetchTodos(), [])

  // 要件２
  const pushTodo = async () => {
    const todo = {
      name: todoName!,
      status: WORK_IN_PROGRESS,
    }
    const params = new URLSearchParams()
    params.append('name', todo.name)
    params.append('status', todo.status)
    await axios
      .post('http://localhost/public/push_todo', params)
      .then((_response) => fetchTodos())
    fetchTodos()
  }

  // 要件３
  const changeStatus = async (id: number, status: string) => {
    const params = new URLSearchParams()
    const statusParam = status === WORK_IN_PROGRESS ? DONE : WORK_IN_PROGRESS
    params.append('id', id.toString())
    params.append('status', statusParam)
    await axios
      .post('http://localhost/public/change_status', params)
      .then((_response) => fetchTodos())
  }

  // 要件４
  const deleteTodo = async (id: number) => {
    const params = new URLSearchParams()
    params.append('id', id.toString())
    await axios
      .post('http://localhost/public/delete_todo', params)
      .then((_response) => fetchTodos())
  }

  return (
    <>
      <p>タスクを追加する</p>
      <input onChange={bindTodoNameValue} type="text" />
      <button onClick={pushTodo}>追加する</button>
      <ul>
        {todos.length > 0 &&
          todos.map((todo: todoType, index: number) => {
            return (
              <li key={index}>
                <p>Index:{index + 1}</p>
                <p>タスク名:{todo.name}</p>
                <p>状況:{todo.status}</p>
                <button onClick={() => changeStatus(todo.id, todo.status)}>
                  変更する
                </button>
                <button onClick={() => deleteTodo(todo.id)}>削除する</button>
              </li>
            )
          })}
      </ul>
    </>
  )
}
