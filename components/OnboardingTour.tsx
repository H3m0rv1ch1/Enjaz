import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, Check, Sparkles } from 'lucide-react';

export interface TourStep {
  targetId: string;
  title: string;
  description: string;
}

interface OnboardingTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ steps, isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [placement, setPlacement] = useState<'top' | 'bottom'>('bottom');
  const [clampedX, setClampedX] = useState<number>(0);
  
  // Padding around the highlighted element
  const PADDING = 8;
  const BORDER_RADIUS = 16;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      updateTargetPosition();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Initial calculation
      updateTargetPosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', updateTargetPosition, true);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', updateTargetPosition, true);
      };
    }
  }, [isOpen, currentStep]);

  const updateTargetPosition = () => {
    if (currentStep === -1 || !steps[currentStep]) {
        setTargetRect(null);
        return;
    }

    const target = document.getElementById(steps[currentStep].targetId);
    if (target) {
      // Smooth scroll to element
      target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      
      // Delay measurement slightly to allow scroll/animation to settle
      setTimeout(() => {
        const rect = target.getBoundingClientRect();
        setTargetRect(rect);
        
        // --- Smart Positioning Logic ---
        
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // 1. Vertical Placement Decision
        const spaceAbove = rect.top;
        const spaceBelow = viewportHeight - rect.bottom;
        const CARD_HEIGHT_ESTIMATE = 350; // Increased estimate
        
        let newPlacement: 'top' | 'bottom' = 'bottom';

        // Prefer bottom if there's enough space
        if (spaceBelow >= CARD_HEIGHT_ESTIMATE) {
            newPlacement = 'bottom';
        } 
        // If not, check top
        else if (spaceAbove >= CARD_HEIGHT_ESTIMATE) {
            newPlacement = 'top';
        } 
        // If neither fits perfectly, pick the side with MORE space
        else {
            newPlacement = spaceBelow > spaceAbove ? 'bottom' : 'top';
        }
        setPlacement(newPlacement);

        // 2. Horizontal Clamping (Prevent X-overflow)
        const CARD_WIDTH_MAX = 448; // max-w-md = 28rem = 448px
        const SCREEN_PADDING = 16;
        const halfCard = CARD_WIDTH_MAX / 2;
        
        // Calculate ideal center
        let centerX = rect.left + (rect.width / 2);
        
        // Clamp min (Left edge)
        if (centerX - halfCard < SCREEN_PADDING) {
            centerX = halfCard + SCREEN_PADDING;
        }
        
        // Clamp max (Right edge)
        if (centerX + halfCard > viewportWidth - SCREEN_PADDING) {
            centerX = viewportWidth - halfCard - SCREEN_PADDING;
        }
        
        setClampedX(centerX);

      }, 350); 
    } else {
        setTargetRect(null);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  // Pre-tour Welcome Card (Step -1)
  if (currentStep === -1) {
    return (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 pointer-events-auto">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" />
            
            <div className="relative bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl animate-fade-in-up text-center ring-1 ring-gray-900/5">
                <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-sm border border-emerald-100">
                    <Sparkles size={40} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">جولة سريعة؟</h3>
                <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                    أهلاً بك في إنجاز! هل تود أخذ جولة سريعة للتعرف على أهم مميزات التطبيق وكيفية استخدامه؟
                </p>
                
                <div className="space-y-3">
                    <button 
                        onClick={() => setCurrentStep(0)}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>نعم، ابدأ الجولة</span>
                        <Sparkles size={20} />
                    </button>
                    
                    <button 
                        onClick={onClose}
                        className="w-full py-4 bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-2xl font-bold text-lg transition-all active:scale-95"
                    >
                        لا، ابدأ الاستخدام
                    </button>
                </div>
            </div>
        </div>
    );
  }

  const step = steps[currentStep];

  // Card Styles Calculation
  const getCardStyle = (): React.CSSProperties => {
    // Base styles for interactivity
    const baseStyle: React.CSSProperties = {
        pointerEvents: 'auto',
        maxWidth: '28rem', // max-w-md
        width: '100%',
    };

    if (isMobile) {
        // Mobile: Fixed Bottom Sheet
        return {
            ...baseStyle,
            position: 'fixed',
            bottom: '24px',
            left: '16px',
            right: '16px',
            zIndex: 1102,
            transform: 'none',
        };
    }

    if (!targetRect) return { display: 'none' };

    // Desktop: Smart positioning with clip protection
    if (placement === 'top') {
        const estimatedTop = targetRect.top - 24 - 320; // Check if it goes off top
        
        // If it clips top, force bottom placement instead
        if (estimatedTop < 10) {
             return {
                ...baseStyle,
                position: 'absolute',
                top: targetRect.bottom + 24,
                left: clampedX,
                transform: 'translateX(-50%)',
                zIndex: 1102,
            };
        }

        return {
            ...baseStyle,
            position: 'absolute',
            bottom: window.innerHeight - targetRect.top + 24, // Position from bottom to stick to target top
            left: clampedX,
            transform: 'translateX(-50%)',
            zIndex: 1102,
        };
    } else {
        return {
            ...baseStyle,
            position: 'absolute',
            top: targetRect.bottom + 24,
            left: clampedX,
            transform: 'translateX(-50%)',
            zIndex: 1102,
        };
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] w-full h-full pointer-events-none">
      
      {/* 
          GRAPHIC DESIGN "CUTOUT" IMPLEMENTATION 
          Using SVG Masking for perfect shapes and click-through interaction.
      */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <defs>
            <mask id="tour-mask">
                {/* White = Visible (The Overlay) */}
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                
                {/* Black = Invisible (The Hole) */}
                {targetRect && (
                    <rect 
                        x={targetRect.left - PADDING}
                        y={targetRect.top - PADDING}
                        width={targetRect.width + (PADDING * 2)}
                        height={targetRect.height + (PADDING * 2)}
                        rx={BORDER_RADIUS}
                        fill="black"
                        className="transition-all duration-500 ease-in-out"
                    />
                )}
            </mask>
        </defs>
        
        {/* The Dark Overlay Layer */}
        <rect 
            x="0" 
            y="0" 
            width="100%" 
            height="100%" 
            fill="rgba(17, 24, 39, 0.85)" // gray-900 / 85%
            mask="url(#tour-mask)"
            className="pointer-events-auto transition-opacity duration-300 ease-in-out" // Auto events blocks clicks on the dark part
        />

        {/* The Glowing "Chord" / Border */}
        {targetRect && (
             <rect 
                x={targetRect.left - PADDING}
                y={targetRect.top - PADDING}
                width={targetRect.width + (PADDING * 2)}
                height={targetRect.height + (PADDING * 2)}
                rx={BORDER_RADIUS}
                fill="none"
                stroke="#10B981" // emerald-500
                strokeWidth="2.5"
                className="transition-all duration-500 ease-in-out animate-pulse"
                style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }}
            />
        )}
      </svg>

      {/* Tooltip Card */}
      <div 
        className={`transition-all duration-500 ease-out ${!targetRect ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        style={getCardStyle()}
      >
         <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl p-6 md:p-8 border border-white/20 relative overflow-hidden ring-1 ring-gray-900/5">
             
             {/* Decorative Elements */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"></div>

             <div className="relative z-10">
                 {/* Header */}
                 <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                            {currentStep + 1}
                        </div>
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                             من {steps.length}
                        </span>
                     </div>
                     <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="إغلاق الشرح"
                     >
                        <X size={20} />
                     </button>
                 </div>
                 
                 {/* Content */}
                 <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                     {step.title}
                     <Sparkles size={18} className="text-emerald-500 animate-pulse" />
                 </h3>
                 
                 <p className="text-gray-600 text-base leading-relaxed mb-8">
                     {step.description}
                 </p>

                 {/* Footer / Controls */}
                 <div className="flex items-center justify-between mt-auto">
                     {/* Progress Dots */}
                     <div className="flex gap-1.5">
                         {steps.map((_, idx) => (
                             <div 
                                key={idx} 
                                className={`h-2 rounded-full transition-all duration-500 ${idx === currentStep ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-200'}`} 
                             />
                         ))}
                     </div>

                     <div className="flex gap-3">
                         {currentStep > 0 && (
                            <button 
                                onClick={handlePrev}
                                className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                            >
                                السابق
                            </button>
                         )}
                         <button 
                            onClick={handleNext}
                            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all group"
                         >
                            {currentStep === steps.length - 1 ? (
                                <>
                                    <span>فهمت</span>
                                    <Check size={18} strokeWidth={3} />
                                </>
                            ) : (
                                <>
                                    <span>التالي</span>
                                    <ChevronLeft size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                                </>
                            )}
                         </button>
                     </div>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default OnboardingTour;