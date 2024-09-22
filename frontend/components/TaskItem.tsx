"use client";
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import TaskForm from './TaskForm'; // Import the reusable TaskForm

interface TaskItemProps {
  task: any;
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: any) => void;
}

export default function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedTask: { title: string; description: string; status: string; priority: string; dueDate: string }) => {
    onUpdate({ ...task, ...updatedTask });
    setIsEditing(false);
    toast.success('Task updated successfully');
  };

  const handleDelete = () => {
    onDelete(task._id);
    toast.success('Task deleted successfully');
  };

  return (
    <div
      className="task-item p-6 border rounded-lg my-4 shadow-md
                 bg-white transition-all duration-300 hover:shadow-lg
                 transform hover:scale-105
                 sm:max-w-xs sm:mx-auto md:max-w-md lg:max-w-lg
                 flex flex-col items-start justify-between"
    >
      {isEditing ? (
        <TaskForm
          initialTitle={task.title}
          initialDescription={task.description}
          initialStatus={task.status}
          initialPriority={task.priority}
          initialDueDate={task.dueDate ? task.dueDate.split('T')[0] : ''} // Format date for input
          onSubmit={handleUpdate}
          submitText="Update Task"
        />
      ) : (
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">{task.title}</h3>
          <p className="text-gray-600  ">{task.description}</p>
          <p className="text-gray-700">Status: <span className="font-semibold">{task.status}</span></p>
          <p className="text-gray-700">Priority: <span className="font-semibold">{task.priority}</span></p>
          <p className="text-gray-700">Due Date: <span className="font-semibold">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</span></p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="hover:bg-red-600 transition-colors duration-200"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
