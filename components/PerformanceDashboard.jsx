import { useState, useEffect } from "react";

// Performance metrics dashboard component
export default function PerformanceDashboard() {
   const [metrics, setMetrics] = useState({});
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      // Only show in development
      if (process.env.NODE_ENV === "development") {
         setIsVisible(true);

         // Monitor performance metrics
         if (typeof window !== "undefined" && "performance" in window) {
            const observer = new PerformanceObserver((list) => {
               list.getEntries().forEach((entry) => {
                  setMetrics((prev) => ({
                     ...prev,
                     [entry.name]: {
                        startTime: entry.startTime,
                        duration: entry.duration,
                        entryType: entry.entryType,
                     },
                  }));
               });
            });

            observer.observe({ entryTypes: ["measure", "navigation"] });

            // Cleanup
            return () => observer.disconnect();
         }
      }
   }, []);

   const formatTime = (time) => `${Math.round(time)}ms`;

   if (!isVisible) return null;

   return (
      <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-xs z-50">
         <h3 className="font-bold mb-2">Performance Metrics</h3>
         <div className="space-y-1">
            {Object.entries(metrics)
               .slice(0, 5)
               .map(([name, data]) => (
                  <div key={name} className="flex justify-between">
                     <span className="truncate mr-2">{name}</span>
                     <span>{formatTime(data.duration || data.startTime)}</span>
                  </div>
               ))}
         </div>
         <button onClick={() => setIsVisible(false)} className="mt-2 text-gray-400 hover:text-white">
            Hide
         </button>
      </div>
   );
}
