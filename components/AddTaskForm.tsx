import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTaskFormProps {
  onAdd: (name: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center rounded-xl p-1.5 transition-all border bg-white border-gray-200 focus-within:border-emerald-500 shadow-sm">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اكتب مهمة جديدة..."
          className="flex-1 bg-transparent outline-none py-2 px-3 font-medium text-sm text-gray-900 placeholder-gray-400"
        />
        <button
          type="submit"
          className="p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer active:scale-90 bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200"
        >
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
