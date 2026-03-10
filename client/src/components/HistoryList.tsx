import { FaHistory, FaTrash, FaCopy } from "react-icons/fa";

export interface HistoryItemType {
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  date: string;
}

interface HistoryListProps {
    history: HistoryItemType[];
    onClear: () => void;
    onCopy: (text: string) => void;
}

export const HistoryList = ({ history, onClear, onCopy }: HistoryListProps) => {
    return (
        <div className="w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6 pb-4 border-b-[3px] border-[#452829]">
            <h3
              className="text-2xl font-black flex items-center gap-3 text-[#452829]"
              style={{ transform: "rotate(-1deg)" }}
            >
              <FaHistory className="text-[#57595B] text-xl" /> Recent Links
            </h3>
            {history.length > 0 && (
              <button
                onClick={onClear}
                className="text-sm text-[#452829] hover:text-[#E8D1C5] flex items-center gap-2 transition-colors font-bold border-[2px] border-[#452829] px-3 py-2 rounded-md hover:bg-[#452829]"
              >
                <FaTrash className="text-xs" /> Clear All
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-13 border-[3px] border-dashed border-[#452829] rounded-lg text-[#57595B] bg-[#E8D1C5]/60 shadow-[5px_5px_0px_0px_rgba(69,40,41,0.3)]">
              <p className="text-lg font-bold">
                No links yet. Start shortening!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#E8D1C5] p-4 rounded-lg border-[2px] border-[#452829] shadow-[5px_5px_0px_0px_#452829] hover:shadow-[7px_7px_0px_0px_#452829] hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#452829] text-[#E8D1C5] text-xs px-3 py-1 rounded-md border-[1px] border-[#452829] font-black">
                          SHORT
                        </span>
                        <a
                          href={item.shortUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#57595B] font-bold truncate hover:underline text-base"
                        >
                          {item.shortUrl}
                        </a>
                      </div>
                      <p
                        className="text-[#57595B] text-sm truncate font-semibold"
                        title={item.originalUrl}
                      >
                        {item.originalUrl}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5">
                      <div className="text-right">
                        <span className="block text-[#452829] font-black text-xl">
                          {item.clicks}{" "}
                          <span className="text-sm text-[#57595B] font-bold">
                            clicks
                          </span>
                        </span>
                        <span className="text-xs text-[#57595B] font-bold">
                          {item.date}
                        </span>
                      </div>
                      <button
                        onClick={() => onCopy(item.shortUrl)}
                        className="p-3 bg-white rounded-md text-[#452829] hover:bg-[#452829] hover:text-[#E8D1C5] transition-colors border-[3px] border-[#452829] shadow-[3px_3px_0px_0px_rgba(69,40,41,0.3)]"
                      >
                        <FaCopy className="text-base" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    );
};
