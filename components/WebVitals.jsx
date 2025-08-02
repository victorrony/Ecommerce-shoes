import { useEffect } from "react";

export function reportWebVitals(metric) {
   // You can send these metrics to your analytics service
   if (process.env.NODE_ENV === "development") {
      console.log("Web Vital:", metric);
   }

   // Example: Send to Google Analytics
   // gtag('event', metric.name, {
   //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
   //   event_label: metric.id,
   //   non_interaction: true,
   // });
}

// Web Vitals monitoring component
export default function WebVitalsMonitor() {
   useEffect(() => {
      // Only load web-vitals in production
      if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
         import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB, getINP }) => {
            getCLS(reportWebVitals);
            getFID(reportWebVitals);
            getFCP(reportWebVitals);
            getLCP(reportWebVitals);
            getTTFB(reportWebVitals);
            // INP (Interaction to Next Paint) - replaces FID in 2024
            if (getINP) {
               getINP(reportWebVitals);
            }
         });
      }
   }, []);

   return null; // This component doesn't render anything
}
