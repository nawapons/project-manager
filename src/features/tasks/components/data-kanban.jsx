import React, { useCallback, useEffect, useState } from "react"
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd"
import { TaskStatus } from "@/schema/taskSchema"
import { KanbanColumnHeader } from "./kanban-column-header"
import { KanbanCard } from "./kanban-card"
import { ScrollArea } from "@/components/ui/scroll-area"
const boards = [
    TaskStatus.BACKLOG,
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE,
]
export const DataKanban = ({ data, onChange }) => {
    const [tasks, setTasks] = useState(() => {
        const initialTasks = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: []
        }

        data.forEach((task) => {
            initialTasks[task.status].push(task)
        })

        Object.keys(initialTasks).forEach((status) => {
            initialTasks[status].sort((a, b) => a.position - b.position)
        })
        return initialTasks;
    })
    useEffect(() => {
        const newTasks = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: []
        }
        data.forEach((task) => {
            newTasks[task.status].push(task)
        })
        Object.keys(newTasks).forEach((status) => {
            newTasks[status].sort((a, b) => a.position - b.position)
        })
        setTasks(newTasks)
    }, [data])


    const onDragEnd = useCallback((result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        const sourceStatus = source.droppableId;
        const destStatus = destination.droppableId;

        let updatesPayload = []
        setTasks((prevTasks) => {
            const newTasks = { ...prevTasks };

            const sourceColumn = [...newTasks[sourceStatus]]
            const [movedTask] = sourceColumn.splice(source.index, 1)

            if (!movedTask) {
                console.error("No task found at the source index")
                return prevTasks;
            }

            const updatedMovedTask = sourceStatus !== destStatus ? { ...movedTask, status: destStatus } : movedTask;

            newTasks[sourceStatus] = sourceColumn;

            const destColumn = [...newTasks[destStatus]]
            destColumn.splice(destination.index, 0, updatedMovedTask)
            newTasks[destStatus] = destColumn;

            updatesPayload = []

            updatesPayload.push({
                id: updatedMovedTask.id,
                status: destStatus,
                position: Math.min((destination.index + 1) * 1000, 1_000_000)
            })

            newTasks[destStatus].forEach((task, index) => {
                if (task && task.id !== updatedMovedTask.id) {
                    const newPosition = Math.min((index + 1) * 1000, 1_000_000)
                    if (task.position !== newPosition) {
                        updatesPayload.push({
                            id: task.id,
                            status: destStatus,
                            position: newPosition
                        })
                    }
                }
            })
            if (sourceStatus !== destStatus) {
                newTasks[sourceStatus].forEach((task, index) => {
                    if (task) {
                        const newPosition = Math.min((index + 1) * 1000, 1_000_000)
                        if (task.position !== newPosition) {
                            updatesPayload.push({
                                id: task.id,
                                status: sourceStatus,
                                position: newPosition,
                            })
                        }
                    }
                })
            }
            return newTasks
        })
        onChange(updatesPayload)
    }, [onChange])
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex overflow-x-auto">
                {boards.map((board) => {
                    return (
                        <div key={board} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
                            <KanbanColumnHeader
                                board={board}
                                taskCount={tasks[board].length} />
                            <ScrollArea className="h-72 w-full rounded-md border-none">
                                <Droppable droppableId={board}>
                                    {(provided) => (
                                        <div {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="min-h-[200px] py-1.5">
                                            {tasks[board].map((task, index) => (
                                                <Draggable key={task.id}
                                                    draggableId={task.id}
                                                    index={index}>
                                                    {(provided) => (
                                                        <div ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <KanbanCard task={task} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </ScrollArea>
                        </div>
                    )
                })}

            </div>

        </DragDropContext>
    )
}