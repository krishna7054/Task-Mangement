"use client";
import { useDrop } from 'react-dnd';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  status: string;
  tasks: any[];
  handleDrop: (item: any, status: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, tasks, handleDrop }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: any) => {
      console.log(`Item dropped in column ${status}:`, item);
      handleDrop(item, status);
    },
  });

  return (
    <div
      ref={drop}
      className="kanban-column p-4 border rounded-lg my-4  shadow-lg bg-white transition duration-300 ease-in-out transform hover:scale-105 
                 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <h3 className="text-xl font-bold mb-2 text-center">{status}</h3>
      <div className="task-list grid gap-4 sm:w- sm:gap-1">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
