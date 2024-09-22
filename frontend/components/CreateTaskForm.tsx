"use client"; // This must be the first line in the file

import { useDispatch } from 'react-redux';
import { createTask } from '../store/taskSlice';
import { toast } from 'react-hot-toast';
import TaskForm from './TaskForm'; // Import the reusable TaskForm
import { AppDispatch } from '@/store';

interface CreateTaskFormProps {
  onClose?: () => void;  // Optional onClose prop
}

export default function CreateTaskForm({ onClose }: CreateTaskFormProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (taskData: {  title: string; description: string }) => {
    const newTask = { ...taskData, status: 'To Do', priority: 'Medium', dueDate: new Date(),  }; // Add other fields as necessary
    
    try {
      await dispatch(createTask(newTask)).unwrap();
      toast.success('Task created successfully');
      if (onClose) onClose();  
      
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  return (
    <div
      className="
        create-task-container p-6 mx-auto mt-6 bg-white rounded-lg shadow-md
        transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105
        sm:max-w-xs md:max-w-md lg:max-w-lg
      "
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Create a New Task
      </h2>
      <TaskForm onSubmit={handleSubmit} submitText="Create Task" />
    </div>
  );
}
