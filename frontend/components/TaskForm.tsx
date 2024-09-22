"use client"; // This must be the first line in the file

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialStatus?: string;
  initialPriority?: string;
  initialDueDate?: string;
  onSubmit: (taskData: {
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
  }) => void;
  submitText: string;
}

export default function TaskForm({
  initialTitle = '',
  initialDescription = '',
  initialStatus = 'To Do',
  initialPriority = 'Medium',
  initialDueDate = '',
  onSubmit,
  submitText,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [status, setStatus] = useState(initialStatus);
  const [priority, setPriority] = useState(initialPriority);
  const [dueDate, setDueDate] = useState(initialDueDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      onSubmit({ title, description, status, priority, dueDate });
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        task-form p-6 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out
        sm:max-w-xs md:max-w-md lg:max-w-lg mx-auto mt-6
        hover:shadow-lg hover:scale-105
      "
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Task Details</h3>
      <div className="mb-2">
        <Input
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-2">
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1">Due Date</label>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" label={'Date'}        />
      </div>
      <Button
        type="submit"
        className="
          w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md
          transition-transform duration-300 ease-in-out
          hover:bg-blue-600 hover:scale-105
        "
      >
        {submitText}
      </Button>
    </form>
  );
}
