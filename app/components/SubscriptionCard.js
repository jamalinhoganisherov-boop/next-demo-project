import { ShoppingBag } from "lucide-react"; // Ikonka uchun

export default function SubscriptionCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050a14] p-4">
      {/* Asosiy Karta */}
      <div className="relative w-72 h-[500px] bg-[#e1f1f7] rounded-[28px] shadow-2xl flex flex-col items-center">
        
        {/* Yuqori qism */}
        <div className="pt-10 pb-6 text-center">
          <h2 className="text-[#3a8ef6] text-5xl font-bold tracking-tight">Basic</h2>
          <p className="text-[#3a8ef6] text-xl font-semibold mt-1">3month</p>
        </div>

        {/* Kesilgan Chiziq va Yon doiralar */}
        <div className="relative w-full flex items-center">
          <div className="absolute -left-4 w-8 h-8 bg-[#050a14] rounded-full"></div>
          <div className="w-full border-t-2 border-dashed border-[#3a8ef6]/40 mx-4"></div>
          <div className="absolute -right-4 w-8 h-8 bg-[#050a14] rounded-full"></div>
        </div>

        {/* Narx va Ma'lumot */}
        <div className="flex-1 flex flex-col items-center pt-8">
          <h1 className="text-[#3a8ef6] text-6xl font-bold mb-4">$15.140</h1>
          
          <div className="flex items-center gap-2 mb-10">
            <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span>
            <p className="text-gray-600 font-medium">Cancel anytime</p>
          </div>

          {/* SIZ SO'RAGAN TUGMA (BUTTON) */}
          <button className=" mt-17.5 flex items-center justify-center gap-2 bg-linear-to-r from-[#3197ee] to-[#2563eb] text-white px-8 py-3 rounded-2xl shadow-lg hover:opacity-90 transition-all active:scale-95 group">
            <ShoppingBag size={20} className="fill-white/20" />
            <span className="uppercase tracking-[0.2em] font-bold text-sm">Continue</span>
          </button>
        </div>
        
      </div>
    </div>
  );
}