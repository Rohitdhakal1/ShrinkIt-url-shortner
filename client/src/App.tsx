import { useState, useEffect } from "react";
// Merged Icons: UI, Social (LinkedIn, Resume), Stats, and Utility
import { FaCopy, FaLink, FaCheck, FaChartLine, FaHistory, FaGithub, FaTrash, FaGlobe, FaServer, FaUserClock, FaLinkedinIn, FaFileAlt } from "react-icons/fa";
// Tech Stack Icons for Background
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import client from "./helpers/axiosConfig";

// Define the shape of a history item for type safety
interface HistoryItem {
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  date: string;
}

function App() {
  // --- STATE (Application Memory) ---
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [clicks, setClicks] = useState(0);
  
  // History State for Local Storage
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from LocalStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("linkHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Calculate Total Clicks for the Navbar stats bar
  const totalUserClicks = history.reduce((acc, item) => acc + item.clicks, 0);

  // --- ACTIONS (Functions) ---
  
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
      // API Call using the configured client (baseURL: localhost:5001/api)
      const response = await client.post("api/url/shorten", { longUrl: text });
      
      const newShortUrl = response.data.shortUrl;
      const newClicks = response.data.clicks;

      setResult(newShortUrl);
      setClicks(newClicks);

      // Save to History (LocalStorage)
      const newItem: HistoryItem = {
        shortUrl: newShortUrl,
        originalUrl: text,
        clicks: newClicks,
        date: new Date().toLocaleDateString()
      };

      const updatedHistory = [newItem, ...history].slice(0, 5); // Keep last 5 items
      setHistory(updatedHistory);
      localStorage.setItem("linkHistory", JSON.stringify(updatedHistory));

    } catch (err) {
      console.error(err);
      setError("Server Error. Check Backend Console.");
    } finally {
      setLoading(false);
    }
  };

  // Background Icons Configuration (Fixed positions for floating effect)
  const backgroundIcons = [
    { icon: <SiMongodb />, color: "text-green-500", pos: "top-32 left-16", delay: "delay-0" },
    { icon: <SiExpress />, color: "text-gray-500", pos: "top-40 right-32", delay: "delay-1" },
    { icon: <SiReact />, color: "text-blue-400", pos: "bottom-10 left-32", delay: "delay-2" },
    { icon: <SiNodedotjs />, color: "text-green-600", pos: "bottom-20 right-16", delay: "delay-3" },
    { icon: <SiTailwindcss />, color: "text-cyan-400", pos: "top-1/2 left-10", delay: "delay-4" },
    { icon: <SiTypescript />, color: "text-blue-600", pos: "top-1/2 right-10", delay: "delay-5" },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex flex-col font-sans relative overflow-x-hidden">
      
      {/* --- BACKGROUND LAYER (FIXED) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {backgroundIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.pos} ${item.color} opacity-20 text-6xl animate-float ${item.delay}`}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* --- FOREGROUND LAYER --- */}
      
      {/* 1. NAVBAR (Sticky) */}
      <nav className="w-full p-6 flex justify-between items-center border-b border-gray-800 bg-[#0B1120]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-lg">
            S
          </div>
          <span className="font-bold text-xl tracking-tight">Shrink<span className="text-blue-500">It</span></span>
        </div>
        
        {/* --- SOCIAL/PROFESSIONAL LINKS --- */}
        <div className="flex items-center gap-4">
          
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/rohitdhakal" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-blue-400 transition"
          >
            <FaLinkedinIn size={24} />
          </a>
          
          {/* GitHub */}
          <a 
            href="https://github.com/Rohitdhakal1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition"
          >
            <FaGithub size={24} />
          </a>
          
          {/* Resume/File (FORCED DOWNLOAD) */}
          <a 
            href="/resume.pdf" 
            download="Rohit_Dhakal_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-green-400 transition"
          >
            <FaFileAlt size={24} />
          </a>
        </div>
      </nav>

      {/* 2. MAIN CONTENT (Scrollable) */}
      <main className="flex-1 flex flex-col items-center justify-start pt-12 px-4 pb-4 gap-8 w-full max-w-4xl mx-auto z-10 relative bg-[#0B1120]">
        
        {/* HERO SECTION */}
        <div className="w-full max-w-lg text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Shorten Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Looooong Links
              </span>
            </h1>
            <p className="text-gray-400 mb-8 text-lg">
              Streamline your links with our professional URL shortener.
            </p>

            {/* --- SOCIAL PROOF STATS BAR (Example Data) --- */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              <div className="bg-gray-800/50 border border-gray-700 p-3 rounded-xl flex flex-col items-center">
                <FaGlobe className="text-blue-500 mb-1" />
                <span className="text-white font-bold text-lg">10K+</span>
                <span className="text-xs text-gray-500">Links</span>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 p-3 rounded-xl flex flex-col items-center">
                <FaServer className="text-green-500 mb-1" />
                <span className="text-white font-bold text-lg">99.9%</span>
                <span className="text-xs text-gray-500">Uptime</span>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 p-3 rounded-xl flex flex-col items-center">
                <FaUserClock className="text-purple-500 mb-1" />
                <span className="text-white font-bold text-lg">{totalUserClicks}</span>
                <span className="text-xs text-gray-500">Your Clicks</span>
              </div>
            </div>

            {/* --- INPUT CARD --- */}
            <div className="bg-gray-800 p-2 rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-900/20 ring-1 ring-blue-500/20 flex flex-col sm:flex-row gap-2">
              <input 
                type="text" 
                placeholder="Paste link here..." 
                className="bg-transparent text-white px-4 py-3 flex-1 outline-none placeholder-gray-500 font-medium"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-blue-600/30"
              >
                {loading ? "..." : <>Shorten <FaLink /></>}
              </button>
            </div>

            {error && <p className="text-red-400 mt-4 bg-red-900/20 p-2 rounded-lg border border-red-500/20">{error}</p>}

            {/* RESULT CARD */}
            {result && (
              <div className="mt-6 bg-gray-800/90 backdrop-blur-sm border border-green-500/30 p-4 rounded-xl animate-fade-in space-y-3 shadow-xl text-left">
                <div className="flex items-center justify-between pb-2 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <FaChartLine className="text-blue-400 text-sm" />
                    <span className="text-xs text-gray-400 font-medium">Clicks on this link</span>
                  </div>
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {clicks}
                  </span>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <a href={result} target="_blank" rel="noreferrer" className="truncate text-green-400 font-bold hover:underline text-lg">
                    {result}
                  </a>
                  <button onClick={() => handleCopy(result)} className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded-lg transition">
                    {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                  </button>
                </div>
              </div>
            )}
        </div>

        {/* HISTORY SECTION */}
        <div className="w-full">
          <div className="flex justify-between items-end mb-4 border-b border-gray-800 pb-2">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-200">
              <FaHistory className="text-gray-500" /> Recent History
            </h3>
            {history.length > 0 && (
              <button onClick={clearHistory} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                <FaTrash /> Clear
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-800 rounded-2xl text-gray-600 bg-gray-900/50">
              <p>No history yet.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {history.map((item, idx) => (
                <div key={idx} className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-500 transition group overflow-hidden hover:shadow-lg">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-500/10 text-blue-400 text-xs px-2 py-0.5 rounded border border-blue-500/20">Short</span>
                      <a href={item.shortUrl} target="_blank" rel="noreferrer" className="text-blue-400 font-medium truncate hover:underline block">
                        {item.shortUrl}
                      </a>
                    </div>
                    <p className="text-gray-500 text-xs truncate w-full" title={item.originalUrl}>
                      {item.originalUrl}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-gray-700">
                    <div className="text-right">
                      <span className="block text-gray-200 font-bold">{item.clicks} <span className="text-xs text-gray-500 font-normal">clicks</span></span>
                      <span className="text-xs text-gray-600">{item.date}</span>
                    </div>
                    <button 
                      onClick={() => handleCopy(item.shortUrl)}
                      className="p-2 bg-gray-700 rounded-lg text-gray-400 hover:bg-gray-600 hover:text-white transition"
                      title="Copy"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default App;