import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { apiService } from "./services/api";
import type { ShortenResponse } from "./services/api";

import { Navbar } from "./components/Navbar";
import { BackgroundIcons } from "./components/BackgroundIcons";
import { Hero } from "./components/Hero";
import { ResultCard } from "./components/ResultCard";
import { HistoryList } from "./components/HistoryList";
import type { HistoryItemType } from "./components/HistoryList";

function App() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [history, setHistory] = useState<HistoryItemType[]>([]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchLatestStats = async () => {
      const saved = localStorage.getItem("linkHistory");
      if (saved) {
        let historyItems: HistoryItemType[] = JSON.parse(saved);
        // Only set initially if history is currently empty to prevent UI thrashing
        if (history.length === 0 && isMounted) {
            setHistory(historyItems);
        }

        const updatedHistoryPromises = historyItems.map(async (item) => {
          try {
            const code = item.shortUrl.split('/').pop();
            if (code) {
               const stats = await apiService.getUrlStats(code);
               return { ...item, clicks: stats.clicks };
            }
          } catch (e) {
             console.error("Could not fetch stats for", item.shortUrl);
          }
          return item;
        });
        
        const latestHistory = await Promise.all(updatedHistoryPromises);
        if (isMounted) {
            setHistory(latestHistory);
            localStorage.setItem("linkHistory", JSON.stringify(latestHistory));
        }
      }
    };
    
    fetchLatestStats();
    
    // Poll for updates every 5 seconds
    const intervalId = setInterval(fetchLatestStats, 5000);
    
    return () => {
        isMounted = false;
        clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleShortenSubmit = async (text: string) => {
    if (!text) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response: ShortenResponse = await apiService.shortenUrl(text);

      const newShortUrl = response.shortUrl;
      const newClicks = response.clicks || 0;

      setResult(newShortUrl);
      setClicks(newClicks);

      const newItem: HistoryItemType = {
        shortUrl: newShortUrl,
        originalUrl: text,
        clicks: newClicks,
        date: new Date().toLocaleDateString(),
      };

      const existingIndex = history.findIndex(item => item.shortUrl === newShortUrl);
      let updatedHistory;

      if (existingIndex >= 0) {
        // If it exists, update the click count and move it to the top
        const updatedItems = [...history];
        updatedItems[existingIndex] = { ...updatedItems[existingIndex], clicks: newClicks };
        const [movedItem] = updatedItems.splice(existingIndex, 1);
        updatedHistory = [movedItem, ...updatedItems];
      } else {
        // Otherwise just prepend and enforce length limit
        updatedHistory = [newItem, ...history].slice(0, 5);
      }

      setHistory(updatedHistory);
      localStorage.setItem("linkHistory", JSON.stringify(updatedHistory));
    } catch (err: any) {
       console.error(err);
       setError(err.message || "Server Error. Check Backend Console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#F3E8DF] text-[#452829] flex flex-col font-sans relative overflow-x-hidden overflow-y-auto">
      <BackgroundIcons />
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start pt-10 px-4 pb-8 gap-12 w-full max-w-3xl mx-auto z-10 relative">
        <div className="w-full text-center space-y-5">
            <Hero 
                totalUserClicks={totalUserClicks} 
                onSubmit={handleShortenSubmit} 
                loading={loading} 
            />

            {error && (
                <p className="text-[#452829] bg-[#E8D1C5] p-4 rounded-lg border-[3px] border-[#452829] max-w-xl mx-auto font-bold text-base shadow-[4px_4px_0px_0px_#452829]">
                {error}
                </p>
            )}

            {result && (
                <ResultCard 
                    resultUrl={result} 
                    clicks={clicks} 
                    copied={copied} 
                    onCopy={handleCopy} 
                />
            )}
        </div>

        <HistoryList 
            history={history} 
            onClear={clearHistory} 
            onCopy={handleCopy} 
        />
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
