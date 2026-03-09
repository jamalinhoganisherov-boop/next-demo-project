import { ShoppingBag } from "lucide-react";

const Card = ({ title, duration, price, oldPrice, isSuggested, bgColor, textColor, btnColor, btnTextColor }) => {
  return (
    <div className="relative group">
      
      {isSuggested && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-end gap-2 z-0">
          <div className="w-5 h-14 bg-[#0095ff] rounded-full"></div>
          <div className="w-6 h-24 bg-[#0095ff] rounded-full shadow-[0_0_25px_rgba(0,149,255,0.6)]"></div>
          <div className="w-5 h-10 bg-[#0095ff] rounded-full"></div>
        </div>
      )}

      
      <div className={`relative w-72 ${isSuggested ? 'h-[530px] z-10 shadow-[0_0_50px_rgba(0,149,255,0.3)] bg-gradient-to-b from-[#0095ff] via-[#007eff] to-[#1e50ff]' : 'h-[440px] z-0 bg-[#e6f2f8]'} rounded-[25px] flex flex-col items-center overflow-hidden transition-transform duration-300 hover:scale-105`}>
        
       
        <div className="pt-10 pb-6 text-center">
          <h2 className={`${isSuggested ? 'text-white' : 'text-[#3b82f6]'} text-4xl font-semibold tracking-tight`}>{title}</h2>
          <p className={`${isSuggested ? 'text-white/90' : 'text-[#3b82f6]'} text-lg font-medium mt-1`}>{duration}</p>
        </div>

        
        <div className="relative w-full flex items-center">
          <div className="absolute left-[-16px] w-8 h-8 bg-[#050a14] rounded-full shadow-inner"></div>
          <div className={`w-full border-t-2 border-dashed ${isSuggested ? 'border-black/20' : 'border-[#3b82f6]/30'} mx-5`}></div>
          <div className="absolute right-[-16px] w-8 h-8 bg-[#050a14] rounded-full shadow-inner"></div>
        </div>

       
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          {oldPrice && (
            <div className="relative mb-1">
              <span className="text-2xl font-semibold text-white/70">{oldPrice}</span>
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 -rotate-3"></div>
            </div>
          )}
          <h1 className={`${isSuggested ? 'text-white' : 'text-[#3b82f6]'} text-5xl font-semibold mb-4`}>{price}</h1>
          
          <div className="flex items-center gap-2 mb-8">
            <span className={`w-1.5 h-1.5 rounded-full ${isSuggested ? 'bg-black' : 'bg-black'}`}></span>
            <p className={`${isSuggested ? 'text-white/90 text-xs' : 'text-gray-600 text-sm'} font-medium`}>Cancel anytime</p>
          </div>

          
          <button className={`mt-[20px] flex items-center justify-center gap-2 ${isSuggested ? 'bg-[#e0f4ff] text-[#3a8ef6]' : 'bg-gradient-to-r from-[#3197ee] to-[#2563eb] text-white'} px-8 py-3 rounded-2xl shadow-lg transition-all active:scale-95 group/btn`}>
            <ShoppingBag size={18} className={`${isSuggested ? 'fill-[#3a8ef6]/20' : 'fill-white/20'}`} />
            <span className="uppercase tracking-[0.15em] font-bold text-xs">Continue</span>
          </button>
        </div>
      </div>

     
      {isSuggested && (
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-start gap-3 z-0">
          <div className="w-5 h-12 bg-[#2557ff] rounded-full"></div>
          <div className="w-7 h-20 bg-[#2154ff] rounded-full"></div>
          <div className="w-6 h-14 bg-[#1e50ff] rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default Card