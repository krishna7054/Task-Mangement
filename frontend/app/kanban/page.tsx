"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updatekanbanTask } from '../../store/taskSlice';
import KanbanColumn from '../../components/KanbanColumn';
import { RootState } from '../../store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'react-toastify';

export default function KanbanPage() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const statuses = ['To Do', 'In Progress', 'Completed'];

  const handleDrop = (item: any, status: string) => {
    const updatedTask = { ...item, status };
    console.log("Updated task:", updatedTask);
    dispatch(updatekanbanTask(updatedTask)).then((result) => {
      if (updatekanbanTask.fulfilled.match(result)) {
        console.log("Task updated successfully:", result.payload);
      } else {
        console.error("Failed to update task:", result.error);
      }
    });
    toast.success(`Task "${item.title}" moved to "${status}"`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board flex flex-cols-1 sm:  md:flex-cols-3 gap-10 p-4 justify-center">
        {statuses.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasks.filter((task: any) => task.status === status)}
            handleDrop={handleDrop}
          />
        ))}
        {loading && (
          <p className="col-span-3 text-center text-lg text-gray-500">Loading...</p>
        )}
        {error && (
          <p className="col-span-3 text-center text-lg text-red-500">{error}</p>
        )}
      </div>
    </DndProvider>
  );
}
