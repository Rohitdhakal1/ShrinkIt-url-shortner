import { FaRocket, FaBolt, FaFire, FaLink } from "react-icons/fa";
import { useState } from "react";

interface HeroProps {
    totalUserClicks: number;
    onSubmit: (url: string) => void;
    loading: boolean;
}

export const Hero = ({ totalUserClicks, onSubmit, loading }: HeroProps) => {
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (text) {
            onSubmit(text);
        }
    };

    return (
        <div className="w-full text-center space-y-5">
          <h1
            className="text-4xl md:text-5xl font-black leading-tight text-[#452829]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Simple, fast, and
            <br />
            <span className="text-[#5b5757]">Free</span>
          </h1>

          {/* Stats - Normal size boxes with better text */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-3">
            <div
               className="bg-[#E8D1C5] p-2 rounded-md border-[2px] border-[#452829] shadow-[4px_4px_0px_0px_#452829]"
              style={{ transform: "rotate(-1deg)" }}
            >
              <FaRocket className="text-[#452829] mb-1 mx-auto text-2xl" />
              <span className="block text-[#452829] font-black text-2xl">
                10K+
              </span>
              <span className="text-sm text-[#57595B] font-bold">Links</span>
            </div>
            <div
              className="bg-[#E8D1C5] p-2 rounded-md border-[2px] border-[#452829] shadow-[4px_4px_0px_0px_#452829]"
              style={{ transform: "rotate(-2deg)" }}
            >
              <FaBolt className="text-[#452829] mb-1 mx-auto text-2xl" />
              <span className="block text-[#452829] font-black text-2xl">
                99.9%
              </span>
              <span className="text-sm text-[#57595B] font-bold">Uptime</span>
            </div>
            <div
              className="bg-[#E8D1C5] p-2 rounded-md border-[2px] border-[#452829] shadow-[4px_4px_0px_0px_#452829]"
              style={{ transform: "rotate(3deg)" }}
            >
              <FaFire className="text-[#452829] mb-1 mx-auto text-2xl" />
              <span className="block text-[#452829] font-black text-2xl">
                {totalUserClicks}
              </span>
              <span className="text-sm text-[#57595B] font-bold">Clicks</span>
            </div>
          </div>

          {/* Input - better custom things acc to mine */}
          <div className="bg-[#E8D1C5] p-2 rounded-lg border-[2px] border-[#452829] shadow-[6px_6px_0px_0px_#452829] max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Paste your long URL here..."
                className="bg-white text-[#452829] px-5 py-2 flex-1 outline-none placeholder-[#57595B] rounded-md border-[2px] border-[#57595B] focus:border-[#452829] transition-colors font-medium text-base"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#452829] hover:bg-[#57595B] text-[#E8D1C5] px-7 py-2 rounded-md font-black transition-all duration-200 flex items-center justify-center gap-2 border-[3px] border-[#452829] shadow-[4px_4px_0px_0px_#452829] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 text-base"
              >
                {loading ? (
                  "..."
                ) : (
                  <>
                    <FaLink /> Shorten It
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
    );
};
