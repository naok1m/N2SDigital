export default function GlassButton({ children }) {
    return (
      <button
        className="flex items-center gap-3
                   bg-gradient-to-r from-[rgba(196,181,253,0.2)] via-[rgba(196,181,253,0.1)] to-[rgba(196,181,253,0.2)]
                   border border-[rgba(196,181,253,0.4)]
                   backdrop-blur-[20px]
                   shadow-[0_8px_32px_rgba(196,181,253,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
                   rounded-full px-6 py-2
                   relative overflow-hidden
                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(196,181,253,0.15)] before:to-transparent
                   before:opacity-0 before:transition-opacity before:duration-300
                   hover:before:opacity-100
                   text-white font-semibold
                   transform transition-transform duration-300 hover:scale-110
                   hover:shadow-[0_8px_32px_rgba(196,181,253,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]"
      >
        {children}
      </button>
    );
  }
  