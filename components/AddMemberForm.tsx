import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddMemberFormProps {
  onAdd: (name: string) => void;
  variant?: 'light' | 'dark';
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ onAdd, variant = 'light' }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  const isDark = variant === 'dark';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`
        relative flex items-center rounded-xl p-1.5 transition-all border
        ${isDark 
            ? 'bg-emerald-800/50 border-emerald-700 focus-within:bg-emerald-800 focus-within:border-emerald-500' 
            : 'bg-white border-gray-200 focus-within:border-emerald-500 shadow-sm'
        }
      `}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسم العضو الجديد..."
          className={`
            flex-1 bg-transparent outline-none py-2 px-3 font-medium text-sm
            ${isDark 
                ? 'text-white placeholder-emerald-300/50' 
                : 'text-gray-900 placeholder-gray-400'
            }
          `}
        />
        <button
          type="submit"
          className={`
            p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer active:scale-90
            ${isDark 
                ? 'bg-white text-emerald-900 hover:bg-emerald-50' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200'
            }
          `}
        >
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>
    </form>
  );
};

export default AddMemberForm;