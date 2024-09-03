"use client"

import React, { useState } from "react"
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Task = {
  id: string
  content: string
}

type Column = {
  id: string
  title: string
  tasks: Task[]
}

const SortableTask = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    data: task
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`mb-2 cursor-move ${isDragging ? 'opacity-50' : ''}`}
      >
        <CardContent className="p-4">
          <p>{task.content}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const Column = ({ column, tasks }) => {
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  })

  return (
    <Card className="w-80 bg-secondary" ref={setNodeRef}>
      <CardHeader>
        <CardTitle>{column.title}</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[200px]">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {tasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </SortableContext>
      </CardContent>
    </Card>
  )
}

export default function TrelloClone() {
  const [columns, setColumns] = useState<Column[]>([
    { id: "new", title: "New", tasks: [] },
    { id: "inProgress", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ])
  const [activeId, setActiveId] = useState(null)
  const [newTaskContent, setNewTaskContent] = useState("")

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const findColumnForTask = (taskId: string) => {
    return columns.find(column => column.tasks.some(task => task.id === taskId))
  }

  const handleDragStart = (event) => {
    const { active } = event
    setActiveId(active.id)
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    if (!active || !over) return

    const activeColumn = findColumnForTask(active.id)
    const overColumn = columns.find(col => col.id === over.id) || findColumnForTask(over.id)

    if (!activeColumn || !overColumn || activeColumn === overColumn) return

    setColumns(prev => {
      const activeTask = activeColumn.tasks.find(task => task.id === active.id)

      return prev.map(col => {
        if (col.id === activeColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter(task => task.id !== active.id)
          }
        } else if (col.id === overColumn.id) {
          return {
            ...col,
            tasks: [...col.tasks, activeTask]
          }
        } else {
          return col
        }
      })
    })
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return

    const activeColumn = findColumnForTask(active.id)
    const overColumn = columns.find(col => col.id === over.id) || findColumnForTask(over.id)

    if (!activeColumn || !overColumn) return

    if (activeColumn !== overColumn) {
      setColumns(prev => {
        const activeTask = activeColumn.tasks.find(task => task.id === active.id)

        return prev.map(col => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              tasks: col.tasks.filter(task => task.id !== active.id)
            }
          } else if (col.id === overColumn.id) {
            return {
              ...col,
              tasks: [...col.tasks, activeTask]
            }
          } else {
            return col
          }
        })
      })
    } else {
      // Reordering within the same column
      const oldIndex = activeColumn.tasks.findIndex(task => task.id === active.id)
      const newIndex = activeColumn.tasks.findIndex(task => task.id === over.id)

      setColumns(prev => {
        return prev.map(col => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              tasks: arrayMove(col.tasks, oldIndex, newIndex)
            }
          } else {
            return col
          }
        })
      })
    }

    setActiveId(null)
  }

  const handleAddNewTask = () => {
    if (newTaskContent.trim() === "") return

    const newTask: Task = {
      id: `task-${Date.now()}`,
      content: newTaskContent,
    }

    setColumns(prev => prev.map(col => 
      col.id === "new" ? { ...col, tasks: [...col.tasks, newTask] } : col
    ))

    setNewTaskContent("")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Trello Clone</h1>
      <div className="mb-4 flex items-center">
        <Input
          type="text"
          placeholder="New task"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleAddNewTask}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <motion.div
          className="flex space-x-4 overflow-x-auto pb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {columns.map((column) => (
            <Column key={column.id} column={column} tasks={column.tasks} />
          ))}
        </motion.div>
        <DragOverlay>
          {activeId ? (
            <Card className="w-72 opacity-50">
              <CardContent className="p-4">
                <p>{columns.find(col => col.tasks.some(task => task.id === activeId))?.tasks.find(task => task.id === activeId)?.content}</p>
              </CardContent>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </motion.div>
  )
}