"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../../store/taskSlice';
import { RootState, AppDispatch } from '../../store';
import TaskItem from '../../components/TaskItem';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import CreateTaskForm from '../../components/CreateTaskForm';

export default function TaskPage() {
  const dispatch = useDispatch <AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
    toast.success('Task deleted successfully');
  };

  const handleUpdate = (updatedTask: any) => {
    dispatch(updateTask(updatedTask));
    toast.success('Task updated successfully');
  };

  return (
    <div className="task-page p-4 sm:p-6 md:p-8 lg:p-12">
      <h1 className="text-6xl font-bold font-serif  mb-4 text-center">Task List</h1>

      {!isFormVisible && (
        <div className="flex justify-center mb-6">
          <Button
            onClick={() => setFormVisible(true)}
            className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out px-4 py-2 rounded-lg"
          >
            Create Task
          </Button>
        </div>
      )}

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="modal bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-105">
            <CreateTaskForm onClose={() => setFormVisible(false)} />
            <Button
              onClick={() => setFormVisible(false)}
              className="bg-red-500 text-white hover:bg-red-600 transition duration-300 ease-in-out mt-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      <div className="task-list grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  );
}
