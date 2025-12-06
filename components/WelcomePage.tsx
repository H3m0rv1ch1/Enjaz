import React from 'react';
import { Rocket, Users, ClipboardList, Trophy, Download, ArrowLeft, LayoutDashboard, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-4 md:pt-8" dir="rtl">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 to-emerald-950 text-white pb-48 pt-20 md:pt-36 md:pb-80 px-6 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-emerald-900/20 mx-4 md:mx-10">
         {/* Background decorations */}
         <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[50%] -right-[20%] w-[150%] h-[150%] bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 Q 50 0 100 100" stroke="white" strokeWidth="0.5" fill="none" />
                <path d="M0 100 Q 50 20 100 100" stroke="white" strokeWidth="0.5" fill="none" opacity="0.5" />
            </svg>
         </div>
         
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl mb-8 shadow-xl animate-fade-in-up">
                <Rocket size={40} className="text-emerald-300" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              مرحباً بك في <span className="text-emerald-400 inline-block">إنجاز</span>
            </h1>
            
            <p className="text-lg md:text-xl text-emerald-100/80 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
              نظامك المتكامل لمتابعة أداء الفريق، إدارة المهام، وتقييم التفاعل بلمسة عصرية وسهلة.
            </p>
            
            <button 
                onClick={handleStart}
                className="group relative inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 hover:-translate-y-1 active:scale-95"
            >
                <span>ابدأ الاستخدام</span>
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
            </button>
         </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 -mt-48 md:-mt-64 relative z-20 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
                icon={<Users size={24} />}
                title="إدارة الفريق"
                desc="أضف أعضاء فريقك بسهولة وتحكم في بياناتهم في مكان واحد."
                delay={0}
            />
            <FeatureCard 
                icon={<ClipboardList size={24} />}
                title="توزيع المهام"
                desc="أنشئ مهاماً عامة وتتبع إنجاز كل عضو لها بدقة ووضوح."
                delay={100}
            />
             <FeatureCard 
                icon={<Trophy size={24} />}
                title="تقييم الأداء"
                desc="حدد مستوى التفاعل (نشط، متوسط، مبتدئ) وأضف تقييماتك."
                delay={200}
            />
             <FeatureCard 
                icon={<Download size={24} />}
                title="تصدير التقارير"
                desc="احصل على تقرير شامل جاهز للطباعة بضغطة زر واحدة."
                delay={300}
            />
        </div>

        {/* User Guide Section */}
        <div className="mt-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">كيف تستخدم التطبيق؟</h2>
                <p className="text-gray-500 text-lg">ثلاث خطوات بسيطة لإدارة فريقك بفعالية واحترافية</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative px-4">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[4.5rem] right-[16%] left-[16%] h-0.5 border-t-2 border-dashed border-emerald-100 -z-10"></div>

                <StepCard 
                    number="1"
                    title="أضف الأعضاء"
                    desc="استخدم نموذج الإضافة السريع لإدراج أسماء فريقك في القائمة."
                    icon={<LayoutDashboard size={32} />}
                />
                <StepCard 
                    number="2"
                    title="حدد المهام"
                    desc="أضف المهام المطلوبة مرة واحدة ليتم تعيينها تلقائياً للجميع."
                    icon={<ClipboardList size={32} />}
                />
                <StepCard 
                    number="3"
                    title="قيم وصدر"
                    desc="تابع الإنجاز، ضع التقييمات، ثم اطبع التقرير النهائي بضغطة زر."
                    icon={<Trophy size={32} />}
                />
            </div>
            
            <div className="mt-20 text-center">
                 <button 
                    onClick={handleStart}
                    className="bg-white border border-gray-200 text-gray-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 mx-auto px-8 py-3.5 rounded-full shadow-sm active:scale-95"
                >
                    <span>تخطي المقدمة والبدء فوراً</span>
                    <ArrowLeft size={16} />
                </button>
            </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} إنجاز - جميع الحقوق محفوظة</p>
            
            <a 
                href="https://github.com/H3m0rv1ch1?tab=repositories" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-emerald-700 hover:border-emerald-300 hover:shadow-sm transition-all duration-300 group"
            >
                <span className="text-xs font-medium">تم التطوير بواسطة</span>
                <span className="font-bold font-mono text-emerald-600 group-hover:text-emerald-700">H3m0rv1ch1</span>
                <Github size={14} className="group-hover:scale-110 transition-transform" />
            </a>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, delay }: any) => (
    <div 
        className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:-translate-y-2 group"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
            {icon}
        </div>
        <h3 className="font-bold text-xl mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

const StepCard = ({ number, title, desc, icon }: any) => (
    <div className="relative group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500">
        
        {/* Hover Gradient Border Effect */}
        <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-emerald-100 transition-colors duration-300 pointer-events-none"></div>
        
        {/* Icon & Number Badge */}
        <div className="relative flex justify-center mb-8">
            <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-emerald-700 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300 ease-out">
                {icon}
            </div>
            <div className="absolute -top-3 -right-2 bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-4 border-white shadow-lg group-hover:bg-emerald-400 group-hover:scale-110 transition-all duration-300">
                {number}
            </div>
        </div>

        {/* Content */}
        <div className="text-center relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">{title}</h3>
            <p className="text-gray-500 text-base leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default WelcomePage;
