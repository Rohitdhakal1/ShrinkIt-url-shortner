import { FaChartLine, FaCheck, FaCopy } from "react-icons/fa";

interface ResultCardProps {
    resultUrl: string;
    clicks: number;
    copied: boolean;
    onCopy: (text: string) => void;
}

export const ResultCard = ({ resultUrl, clicks, copied, onCopy }: ResultCardProps) => {
    return (
        <div className="mt-6 bg-[#E8D1C5] border-[3px] border-[#452829] p-1 rounded-lg max-w-1xl mx-auto space-y-1 shadow-[6px_6px_0px_0px_#452829]">
            <div className="flex items-center justify-between pb-2 border-b-[3px] border-[#57595B]">
            <div className="flex items-center gap-2">
                <FaChartLine className="text-[#452829] text-xl" />
                <span className="text-base text-[#452829] font-black">
                Total Clicks
                </span>
            </div>
            <span className="bg-[#452829] text-[#E8D1C5] text-base font-black px-4 py-2 rounded-md border-[2px] border-[#452829]">
                {clicks}
            </span>
            </div>

            <div className="flex items-center justify-between gap-4">
            <a
                href={resultUrl}
                target="_blank"
                rel="noreferrer"
                className="truncate text-[#57595B] font-bold hover:underline text-lg flex-1"
            >
                {resultUrl}
            </a>
            <button
                onClick={() => onCopy(resultUrl)}
                className="text-[#452829] hover:text-[#E8D1C5] p-3 hover:bg-[#452829] rounded-md transition-colors border-[3px] border-[#452829] shadow-[3px_3px_0px_0px_#452829]"
            >
                {copied ? (
                <FaCheck className="text-[#57595B] text-lg" />
                ) : (
                <FaCopy className="text-lg" />
                )}
            </button>
            </div>
        </div>
    );
};
