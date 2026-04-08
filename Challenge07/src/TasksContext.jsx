import { createContext, useEffect, useState } from "react"
import useCollection from "./useCollection"

export const TasksContext = createContext()

export function TasksProvider({ children }) {
  const { results, getAll, add, update, remove } = useCollection("tasks")
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    const docs = await getAll()
    setTasks(docs)
  }

  const addTask = async task => {
    await add(task)
    await loadTasks()
  }

  const updateTask = async (id, newData) => {
    await update(id, newData);
    await loadTasks()
  }

  const deleteTask = async id => {
    await remove(id)
    await loadTasks()
  }

  const toggleDone = async task => {
    await update(task.id, { done: !task.done })
    await loadTasks()
  }

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, toggleDone }}
    >
      {children}
    </TasksContext.Provider>
  )
}