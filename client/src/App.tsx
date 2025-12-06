import { useState, useEffect } from "react";
import {
  FaCopy,
  FaLink,
  FaCheck,
  FaChartLine,
  FaHistory,
  FaGithub,
  FaTrash,
  FaLinkedinIn,
  FaFileAlt,
  FaHeart,
  FaRocket,
  FaBolt,
  FaFire,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import client from "./helpers/axiosConfig";

interface HistoryItem {
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  date: string;
}

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("linkHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const totalUserClicks = history.reduce((acc, item) => acc + item.clicks, 0);

  const handleCopy = (textToCopy: string) => {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("linkHistory");
  };

  const handleSubmit = async () => {
    if (!text) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Real API Call
      const response = await client.post("/api/url/shorten", { longUrl: text });

      const newShortUrl = response.data.shortUrl;
      const newClicks = response.data.clicks || 0;

      setResult(newShortUrl);
      setClicks(newClicks);

      const newItem: HistoryItem = {
        shortUrl: newShortUrl,
        originalUrl: text,
        clicks: newClicks,
        date: new Date().toLocaleDateString(),
      };

      const updatedHistory = [newItem, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem("linkHistory", JSON.stringify(updatedHistory));
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Server Error. Check Backend Console."
      );
    } finally {
      setLoading(false);
    }
  };

  // ADDED: SiTypescript and SiExpress to the background icons array
  const backgroundIcons = [
    {
      icon: <SiMongodb />,
      color: "text-emerald-400/10",
      pos: "top-20 left-[8%] hidden lg:block",
      rotate: "rotate-[17deg]",
      size: "text-8xl",
    },
    {
      icon: <SiReact />,
      color: "text-cyan-400/10",
      pos: "bottom-40 left-[15%] hidden lg:block",
      rotate: "rotate-[52deg]",
      size: "text-9xl",
    },
    {
      icon: <SiNodedotjs />,
      color: "text-lime-400/10",
      pos: "bottom-32 right-[8%] hidden lg:block",
      rotate: "-rotate-[15deg]",
      size: "text-7xl",
    },
    {
      icon: <SiTailwindcss />,
      color: "text-sky-400/10",
      pos: "top-1/2 left-[5%] hidden lg:block",
      rotate: "rotate-[8deg]",
      size: "text-8xl",
    },
    {
        icon: <SiTypescript />,
        color: "text-blue-400/10",
        pos: "top-32 right-[15%] hidden lg:block",
        rotate: "-rotate-[12deg]",
        size: "text-8xl",
    },
    {
        icon: <SiExpress />,
        color: "text-gray-500/10",
        pos: "top-1/3 right-[5%] hidden lg:block",
        rotate: "rotate-[25deg]",
        size: "text-7xl",
    },
  ];

  return (
    // Changed min-h-screen to h-screen and added overflow-y-auto to fix double scrollbar
    <div className="h-screen bg-[#F3E8DF] text-[#452829] flex flex-col font-sans relative overflow-x-hidden overflow-y-auto">
      {/* More visible now*/}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(69,40,41,0.05) 1px, rgba(69,40,41,0.05) 3px),
            repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(69,40,41,0.05) 1px, rgba(69,40,41,0.05) 3px)
          `,
          }}
        ></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(69,40,41,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Background icons - more tilted  */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {backgroundIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.pos} ${item.color} ${item.rotate} ${item.size}`}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Navbar -getting better */}
      <nav
        className="w-full p-5 flex justify-between items-center border-b-[3px] border-[#452829] bg-[#F3E8DF]/95 backdrop-blur sticky top-0 z-50"
        style={{ transform: "rotate(-0.3deg)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 bg-[#452829] rounded-sm flex items-center justify-center font-bold text-2xl text-[#E8D1C5] border-[3px] border-[#452829] shadow-[4px_4px_0px_0px_#452829]"
            style={{ transform: "rotate(3deg)" }}
          >
            S
          </div>
          <span className="font-black text-xl tracking-tight text-[#452829]">
            Shrink<span className="text-[#57595B]">It</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/rohitdhakal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#57595B] hover:text-[#452829] transition-colors duration-200 hover:scale-110 transform"
          >
            <FaLinkedinIn size={24} />
          </a>

          <a
            href="https://github.com/Rohitdhakal1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#57595B] hover:text-[#452829] transition-colors duration-200 hover:scale-110 transform"
          >
            <FaGithub size={24} />
          </a>

          <a
            href="/resume.pdf"
            download="Rohit_Dhakal_Resume.pdf"
            className="text-[#57595B] hover:text-[#452829] transition-colors duration-200 hover:scale-110 transform"
          >
            <FaFileAlt size={24} />
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-10 px-4 pb-8 gap-12 w-full max-w-3xl mx-auto z-10 relative">
        {/* Hero */}
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
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
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

          {error && (
            <p className="text-[#452829] bg-[#E8D1C5] p-4 rounded-lg border-[3px] border-[#452829] max-w-xl mx-auto font-bold text-base shadow-[4px_4px_0px_0px_#452829]">
              {error}
            </p>
          )}

          {/* Result */}
          {result && (
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
                  href={result}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-[#57595B] font-bold hover:underline text-lg flex-1"
                >
                  {result}
                </a>
                <button
                  onClick={() => handleCopy(result)}
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
          )}
        </div>

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
                onClick={clearHistory}
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
                        onClick={() => handleCopy(item.shortUrl)}
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
      </main>

      <footer
        className="w-full py-6 border-t-[4px] border-[#452829] bg-[#E8D1C5] text-[#452829] mt-16"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-base flex items-center justify-center gap-2 font-bold">
            Made with <FaHeart className="text-[#57595B] text-lg" /> by{" "}
            <span className="font-black text-lg">ROHIT</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
