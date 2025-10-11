export default function GlassButton({ children }) {
    return (
      <button
        className="flex items-center gap-3
                   bg-gradient-to-r from-[rgba(255,255,255,0.12)] via-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.12)]
                   border border-[rgba(255,255,255,0.15)]
                   backdrop-blur-[20px]
                   shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                   rounded-full px-6 py-2
                   relative overflow-hidden
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(255,255,255,0.1)] before:to-transparent
                   before:opacity-0 before:transition-opacity before:duration-300
                   hover:before:opacity-100
                   text-white font-semibold
                   transform transition-transform duration-300 hover:scale-110"
      >
        {children}
      </button>
    );
  }
  