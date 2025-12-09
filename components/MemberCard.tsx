import React, { useState, useEffect, useRef } from 'react';
import { Member, InteractionLevel, Task } from '../types';
import { Trash2, MessageSquareText, Trophy, User, Star, Check } from 'lucide-react';

interface MemberCardProps {
  member: Member;
  tasks: Task[];
  index: number;
  onUpdate: (id: string, field: keyof Member, value: any) => void;
  onDelete: (id: string) => void;
  onToggleTask: (memberId: string, taskId: string) => void;
  domId?: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, tasks, index, onUpdate, onDelete, onToggleTask, domId }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const deleteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (deleteTimeoutRef.current) clearTimeout(deleteTimeoutRef.current);
    };
  }, []);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isConfirmingDelete) {
        onDelete(member.id);
        setIsConfirmingDelete(false);
    } else {
        setIsConfirmingDelete(true);
        // Auto-reset after 3 seconds
        deleteTimeoutRef.current = setTimeout(() => {
            setIsConfirmingDelete(false);
        }, 3000);
    }
  };
  
  const getLevelBtnStyles = (level: InteractionLevel | null, btnLevel: InteractionLevel) => {
     const isActive = level === btnLevel;
     if (isActive) {
        switch (level) {
            case InteractionLevel.Active: return 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500 ring-offset-2';
            case InteractionLevel.Intermediate: return 'bg-amber-500 text-white shadow-md shadow-amber-500/20 ring-2 ring-amber-500 ring-offset-2';
            case InteractionLevel.Beginner: return 'bg-slate-500 text-white shadow-md shadow-slate-500/20 ring-2 ring-slate-500 ring-offset-2';
        }
     }
     return 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:border-gray-300';
  };

  return (
    <div id={domId} className="print-card group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/20 border border-gray-100/80">
      
      {/* Top Section: Profile */}
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white shadow-xl shadow-emerald-900/10 border border-emerald-700/50 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
               <div className="absolute -top-[50%] -right-[20%] w-[150%] h-[150%] bg-emerald-500/20 rounded-full blur-md"></div>
               <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="22" stroke="white" strokeWidth="1.5" fill="none" opacity="0.25" />
                  <circle cx="50" cy="50" r="34" stroke="white" strokeWidth="1" fill="none" opacity="0.15" />
                  <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="0.5" fill="none" opacity="0.05" />
               </svg>
               <User size={24} className="relative z-10 text-emerald-50" />
            </div>
            
            <div className="flex flex-col pt-1">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                {member.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-400 tracking-wider">
                    ID: {member.id.slice(0, 6)}
                  </span>
              </div>
            </div>
          </div>

          <button 
            type="button"
            onClick={handleDeleteClick}
            className={`no-print relative z-10 cursor-pointer p-2 border rounded-lg transition-all shadow-sm active:scale-95 flex items-center gap-2 ${
                isConfirmingDelete 
                ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200' 
                : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50'
            }`}
            title={isConfirmingDelete ? "اضغط مرة أخرى للتأكيد" : "حذف العضو"}
          >
            {isConfirmingDelete ? (
                <>
                    <span className="text-xs font-bold whitespace-nowrap">تأكيد؟</span>
                    <Trash2 size={16} />
                </>
            ) : (
                <Trash2 size={16} />
            )}
          </button>
        </div>
      </div>
      
      <hr className="mx-6 border-gray-100/80" />

      {/* Bottom Section: Controls & Evaluation */}
      <div className="p-6 space-y-6">
        {/* Task List */}
        <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">المهام</h4>
            <div className="space-y-3 max-h-28 overflow-y-auto pr-2 custom-scrollbar">
              {tasks.length > 0 ? (
                tasks.map(task => {
                  const memberTask = member.tasks.find(mt => mt.taskId === task.id);
                  const isCompleted = memberTask?.completed || false;
                  return (
                    <label 
                      key={task.id}
                      htmlFor={`task-${member.id}-${task.id}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100/70 border border-gray-200 transition-all"
                    >
                      <div className="relative h-5 w-5">
                          <input
                            id={`task-${member.id}-${task.id}`}
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => onToggleTask(member.id, task.id)}
                            className="appearance-none h-5 w-5 rounded-md border-2 border-gray-300 checked:bg-emerald-500 checked:border-emerald-500 transition-all duration-200 cursor-pointer"
                          />
                           {isCompleted && (
                            <Check size={14} strokeWidth={3} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none" />
                          )}
                      </div>
                      <span className={`flex-1 text-sm font-medium ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {task.name}
                      </span>
                    </label>
                  );
                })
              ) : (
                <p className="text-sm text-gray-400 text-center py-2">لم يتم إضافة أي مهام بعد.</p>
              )}
            </div>
        </div>

        {/* Level Selection */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">مستوى التفاعل</h4>
          <div className="flex gap-2">
            {Object.values(InteractionLevel).map((lvl) => (
                <button
                key={lvl}
                onClick={() => onUpdate(member.id, 'level', lvl)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 ${getLevelBtnStyles(member.level, lvl)}`}
                >
                {lvl}
                </button>
            ))}
          </div>
        </div>
        
        {/* Inputs */}
        <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">التقييم</h4>
            <div className="flex gap-3">
                {/* Notes Input */}
                <div className="relative group/input flex-1">
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within/input:text-emerald-600 transition-colors">
                        <MessageSquareText size={16} />
                    </div>
                    <input
                        type="text"
                        value={member.notes}
                        onChange={(e) => onUpdate(member.id, 'notes', e.target.value)}
                        placeholder="الملاحظات..."
                        className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-500/50 rounded-xl px-4 py-3 pr-11 text-sm text-gray-700 transition-all outline-none placeholder-gray-400 shadow-sm focus:bg-white focus:shadow-[0_4px_12px_-2px_rgba(16,185,129,0.1)]"
                    />
                </div>

                {/* Rating Input - Score out of 10 */}
                <div className="relative group/input flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-emerald-500/50 focus-within:bg-white focus-within:shadow-[0_4px_12px_-2px_rgba(16,185,129,0.1)] transition-all">
                    <Trophy size={16} className="text-gray-400 group-focus-within/input:text-emerald-600 transition-colors shrink-0" />
                    <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={member.finalRating || ''}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === '' || (parseFloat(val) >= 0 && parseFloat(val) <= 10)) {
                                onUpdate(member.id, 'finalRating', val);
                            }
                        }}
                        placeholder="0"
                        className="w-12 bg-transparent text-center text-lg font-bold text-gray-800 outline-none placeholder-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-gray-400 font-bold text-sm">/</span>
                    <span className="text-emerald-600 font-bold text-lg">10</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;