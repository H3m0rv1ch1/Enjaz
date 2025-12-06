import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Member, InteractionLevel, Task } from '../types';
import { INITIAL_MEMBERS } from '../constants';
import MemberCard from './MemberCard';
import AddMemberForm from './AddMemberForm';
import TaskManagerCard from './TaskManagerCard';
import OnboardingTour, { TourStep } from './OnboardingTour';
import { 
  Download, 
  Users, 
  Search,
  Sparkles,
  Rocket,
  X,
  Loader2
} from 'lucide-react';

const TOUR_STEPS: TourStep[] = [
    {
        targetId: 'tour-header-actions',
        title: 'أدوات التحكم',
        description: 'من هنا يمكنك البحث عن الأعضاء، أو تصدير التقرير النهائي كملف PDF للطباعة.'
    },
    {
        targetId: 'tour-add-member',
        title: 'إضافة الأعضاء',
        description: 'أضف أعضاء فريقك الجدد بسرعة من خلال هذا القسم. سيظهرون فوراً في القائمة بالأسفل.'
    },
    {
        targetId: 'tour-task-manager',
        title: 'إدارة المهام',
        description: 'أضف المهام المطلوبة من الفريق هنا. سيتم توزيع المهمة تلقائياً على بطاقة كل عضو لمتابعة إنجازها.'
    },
    {
        targetId: 'tour-first-member',
        title: 'بطاقة العضو',
        description: 'هنا يمكنك متابعة كل عضو: تحديد مستوى تفاعله، تدوين ملاحظات، ومتابعة المهام التي أنجزها.'
    }
];

const Dashboard: React.FC = () => {
  const [showTour, setShowTour] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user has visited before to trigger tour
    const hasVisited = localStorage.getItem('hasVisitedApp_v1');
    if (!hasVisited) {
        setShowTour(true);
        localStorage.setItem('hasVisitedApp_v1', 'true');
    }
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100); 
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const handleCloseTour = () => {
      setShowTour(false);
  };

  const handleAddTask = (name: string) => {
    const newTask: Task = { id: uuidv4(), name };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setMembers(prevMembers =>
      prevMembers.map(member => ({
        ...member,
        tasks: [...member.tasks, { taskId: newTask.id, completed: false }],
      }))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    setMembers(prevMembers =>
      prevMembers.map(member => ({
        ...member,
        tasks: member.tasks.filter(task => task.taskId !== taskId),
      }))
    );
  };

  const handleAddMember = (name: string) => {
    // Generate sequential ID based on existing members
    const existingIds = members
        .map(m => parseInt(m.id))
        .filter(num => !isNaN(num));
        
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
    const newId = (maxId + 1).toString();

    const newMember: Member = {
      id: newId,
      name,
      level: null,
      notes: '',
      finalRating: '',
      tasks: tasks.map(task => ({ taskId: task.id, completed: false })),
    };
    setMembers([...members, newMember]);
  };
  
  const handleToggleTask = (memberId: string, taskId: string) => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === memberId
          ? {
              ...member,
              tasks: member.tasks.map(task =>
                task.taskId === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : member
      )
    );
  };

  const handleUpdateMember = (id: string, field: keyof Member, value: any) => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const handleDeleteMember = (id: string) => {
    setMembers(prevMembers => prevMembers.filter(member => member.id !== id));
  };

  const handleExportPDF = async () => {
    if (isExporting) return;
    setIsExporting(true);

    document.body.classList.add('export-mode');

    setTimeout(() => {
        const element = document.querySelector('main');
        
        const opt = {
            margin:       10,
            filename:     `Enjaz-Report-${new Date().toLocaleDateString('ar-EG').replace(/\//g, '-')}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // @ts-ignore
        if (window.html2pdf) {
             // @ts-ignore
            window.html2pdf().set(opt).from(element).save().then(() => {
                document.body.classList.remove('export-mode');
                setIsExporting(false);
            }).catch((err: any) => {
                console.error("PDF Export Error:", err);
                document.body.classList.remove('export-mode');
                setIsExporting(false);
            });
        } else {
            console.warn("html2pdf library not found, falling back to window.print()");
            window.print();
            document.body.classList.remove('export-mode');
            setIsExporting(false);
        }
    }, 500);
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900 font-sans pt-10 flex flex-col">
      
      <OnboardingTour 
        steps={TOUR_STEPS}
        isOpen={showTour}
        onClose={handleCloseTour}
        onComplete={handleCloseTour}
      />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="relative z-50 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-[2rem] shadow-lg shadow-gray-200/50 no-print">
            <div className="px-6 md:px-8">
                <div className="flex items-center justify-between h-20 gap-6">
                    {/* Brand */}
                    <div className={`flex items-center gap-3 min-w-fit cursor-pointer group transition-opacity duration-300 ${isSearchOpen ? 'opacity-50 md:opacity-100' : 'opacity-100'}`}>
                        <div className="relative text-white bg-gradient-to-br from-emerald-600 to-emerald-800 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-all duration-300 border border-emerald-500/50">
                            <Rocket size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl tracking-tight text-gray-900 leading-none group-hover:text-emerald-700 transition-colors">إنجاز</h1>
                            <span className="text-[11px] font-bold text-gray-400 tracking-wide">نظام متابعة الأداء</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="relative flex items-center justify-end gap-3 sm:gap-4" id="tour-header-actions">
                        
                        {/* Action Buttons */}
                        <div className={`flex items-center gap-3 sm:gap-4 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            {/* Search Button */}
                            <button 
                                onClick={() => setIsSearchOpen(true)}
                                className="flex justify-center w-32 relative group overflow-hidden items-center bg-gradient-to-br from-emerald-800 to-emerald-950 text-white py-2.5 px-6 rounded-xl transition-all duration-300 ease-in-out shadow-lg shadow-emerald-900/20 active:scale-95 border border-emerald-700/50"
                                aria-label="Open search"
                            >
                                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                                    <div className="absolute -top-[50%] -right-[50%] w-[150%] h-[150%] bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-400/20 transition-all duration-700"></div>
                                    <svg className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d="M-10 110 L110 -10 M-30 110 L90 -10 M10 110 L130 -10" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                                <div className="relative z-10 flex items-center gap-2">
                                    <span className="font-bold text-sm">بحث</span>
                                    <Search size={18} />
                                </div>
                            </button>
                            
                            {/* Download Button */}
                            <button 
                                onClick={handleExportPDF}
                                disabled={isExporting}
                                className="hidden md:flex justify-center w-32 relative group overflow-hidden items-center bg-gradient-to-br from-emerald-800 to-emerald-950 text-white py-2.5 px-6 rounded-xl transition-all duration-300 ease-in-out shadow-lg shadow-emerald-900/20 active:scale-95 border border-emerald-700/50 disabled:opacity-70 disabled:cursor-wait"
                            >
                                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                                    <div className="absolute -top-[50%] -right-[50%] w-[150%] h-[150%] bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-400/20 transition-all duration-700"></div>
                                    <svg className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d="M-10 110 L110 -10 M-30 110 L90 -10 M10 110 L130 -10" stroke="white" strokeWidth="2" />
                                    </svg>
                                </div>
                                <div className="relative z-10 flex items-center gap-2">
                                    <span className="font-bold text-sm">
                                        {isExporting ? 'جاري...' : 'تصدير'}
                                    </span>
                                    {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                                </div>
                            </button>
                        </div>
                        
                        {/* Search Input Field */}
                        <div className={`absolute top-1/2 right-0 -translate-y-1/2 flex items-center transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-full opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Search size={20} className="text-gray-500" />
                            </div>
                            <input 
                                ref={searchInputRef}
                                type="text" 
                                placeholder="ابحث..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Escape') {
                                        setIsSearchOpen(false);
                                        setSearchTerm('');
                                        e.currentTarget.blur();
                                    }
                                }}
                                className="h-11 w-full rounded-xl outline-none font-medium text-sm placeholder-gray-400 text-gray-700 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-emerald-500 transition-all pl-10 pr-8 shadow-sm focus:shadow-lg focus:shadow-emerald-500/10"
                            />
                            <button 
                                onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchTerm('');
                                }}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label="Close search"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
      </div>

      {/* Main Content Area */}
      <main className="px-4 md:px-8 max-w-7xl mx-auto print-container mt-8 flex-1 pb-12">
        
        {/* Print Header */}
        <div className="hidden print:block mb-10 text-center border-b border-gray-200 pb-8">
            <div className="flex justify-center mb-4 text-emerald-800">
                <Sparkles size={40} strokeWidth={2} />
            </div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900">تقرير تقييم الفريق</h1>
            <p className="text-gray-500 font-medium">تم الاستخراج: {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 print-grid">
            
            {/* Add New Member Card (Dark Theme) */}
            <div className="hidden md:block no-print col-span-full" id="tour-add-member">
                <div className="h-full bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-[2rem] p-8 text-white flex flex-col md:flex-row md:items-center justify-between shadow-xl shadow-emerald-900/10 relative overflow-hidden group hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 gap-8">
                    
                    {/* Decorative background */}
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-[50%] -right-[20%] w-[120%] h-[120%] bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-400/20 transition-all duration-700"></div>
                        <svg className="absolute bottom-0 right-0 w-full h-1/2 opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 Q 50 0 100 100" stroke="white" strokeWidth="1" fill="none" />
                        </svg>
                    </div>
                    
                    <div className="relative z-10 flex items-center gap-8 flex-1">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-emerald-300 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300 shrink-0">
                                <Users size={32} />
                        </div>
                        
                        <div>
                             <h3 className="text-5xl font-bold mb-1 tracking-tighter leading-none">{members.length}</h3>
                             <p className="text-emerald-100/70 font-medium text-sm bg-white/10 px-3 py-1 rounded-full inline-block backdrop-blur-md border border-white/5 whitespace-nowrap">
                                    إجمالي الأعضاء
                             </p>
                        </div>

                         <div className="hidden lg:block w-px h-16 bg-white/10 mx-4"></div>
                         
                         <div className="hidden lg:block max-w-xs">
                             <p className="text-emerald-200/80 text-sm leading-relaxed">
                                لوحة تحكم سريعة لإدارة تقييمات الفريق ومتابعة الأداء بشكل دوري.
                             </p>
                         </div>
                    </div>

                    <div className="relative z-10 w-full md:max-w-md">
                         <div className="flex items-center gap-2 mb-3 px-1">
                            <span className="font-bold text-lg text-white">إضافة عضو جديد</span>
                         </div>
                        <AddMemberForm onAdd={handleAddMember} variant="dark" />
                    </div>
                </div>
            </div>

            {/* Mobile Add Form */}
            <div className="md:hidden no-print">
                <AddMemberForm onAdd={handleAddMember} />
            </div>
            
            {/* Task Manager Card */}
            <TaskManagerCard 
              domId="tour-task-manager"
              tasks={tasks}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />

            {/* List Members */}
            {filteredMembers.map((member, index) => (
                <MemberCard
                    domId={index === 0 ? "tour-first-member" : undefined}
                    key={member.id}
                    index={index}
                    member={member}
                    tasks={tasks}
                    onUpdate={handleUpdateMember}
                    onDelete={handleDeleteMember}
                    onToggleTask={handleToggleTask}
                />
            ))}

            {/* Empty State */}
            {filteredMembers.length === 0 && (
                    <div className="col-span-full py-24 text-center">
                    <div className="w-20 h-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <Search size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">لم يتم العثور على نتائج</h3>
                    <p className="text-gray-500">جرب البحث بكلمات مختلفة أو أضف عضواً جديداً</p>
                    </div>
            )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 bg-[#F3F4F6] border-t border-gray-200 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-center">
                <a 
                    href="https://github.com/H3m0rv1ch1?tab=repositories" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 group text-xs"
                >
                    <span className="font-medium">تم التطوير بواسطة</span>
                    <span className="font-bold font-mono text-emerald-600 group-hover:text-emerald-700">H3m0rv1ch1</span>
                    <Rocket size={11} className="group-hover:scale-110 transition-transform" />
                </a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;