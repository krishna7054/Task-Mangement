"use client";
import { useDrag } from 'react-dnd';
import { Button } from './ui/button';

export const TaskCard = ({ task }: { task: any }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id, status: task.status, title: task.title, priority: task.priority },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`task-card p-4 border rounded-lg my-2 shadow-lg bg-white transition duration-300 ease-in-out transform hover:scale-105
                  ${isDragging ? 'opacity-50' : 'opacity-100'}
                  sm:p-2 md:p-4 lg:p-6`}
    >
      <h4 className="text-lg font-bold mb-1">{task.title}</h4>
      <p className="text-sm text-gray-700">{task.description}</p>
      <Button className='bg-green-400'>{task.priority}</Button>
    </div>
  );
};
