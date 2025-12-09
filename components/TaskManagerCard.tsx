import React from 'react';
import { Task } from '../types';
import AddTaskForm from './AddTaskForm';
import { ClipboardList, Trash2 } from 'lucide-react';

interface TaskManagerCardProps {
  tasks: Task[];
  onAddTask: (name: string) => void;
  onDeleteTask: (id: string) => void;
  domId?: string;
}

const TaskManagerCard: React.FC<TaskManagerCardProps> = ({ tasks, onAddTask, onDeleteTask, domId }) => {
  return (
    <div id={domId} className="no-print col-span-full bg-white rounded-[2rem] p-6 md:p-8 shadow-lg shadow-gray-200/50 border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-start gap-8">
        {/* Left Side: Add Task */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
              <ClipboardList size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">إدارة المهام</h3>
              <p className="text-sm text-gray-500">أضف مهاماً ليتم تعيينها لجميع الأعضاء.</p>
            </div>
          </div>
          <AddTaskForm onAdd={onAddTask} />
        </div>

        <div className="hidden md:block w-px h-auto bg-gray-200 self-stretch"></div>

        {/* Right Side: Task List */}
        <div className="flex-1">
            <h4 className="text-sm font-bold text-gray-500 mb-4 px-1">المهام الحالية ({tasks.length})</h4>
            <div className="space-y-2 max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between bg-gray-50 px-2.5 py-1.5 rounded-md border border-gray-100 group">
                            <p className="font-medium text-gray-800 text-xs">{task.name}</p>
                            <button 
                                onClick={() => onDeleteTask(task.id)}
                                className="p-1.5 bg-white text-gray-400 border border-gray-200 hover:border-red-200 hover:text-red-600 hover:bg-red-50 rounded-md transition-all shadow-sm active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100"
                                title="حذف المهمة"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 text-sm py-8">لا توجد مهام حالياً.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerCard;