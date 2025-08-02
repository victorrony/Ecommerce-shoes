import Image from "next/image";
import { useState, useEffect } from "react";

const OptimizedImage = ({
   src,
   alt,
   width,
   height,
   className = "",
   fallbackSrc = "/placeholder-shoe.svg",
   onMouseEnter,
   onMouseLeave,
   ...props
}) => {
   const [imgSrc, setImgSrc] = useState(src);
   const [isLoading, setIsLoading] = useState(false); // Start with false to match server
   const [hasError, setHasError] = useState(false);
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
      setIsLoading(true);
   }, []);

   const handleError = () => {
      console.warn(`Image failed to load: ${src}`);
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
   };

   const handleLoad = () => {
      setIsLoading(false);
   };

   // Don't render loading state on server to prevent hydration mismatch
   const showLoadingState = isMounted && isLoading && !hasError;

   return (
      <div className={`relative ${className}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
         {showLoadingState && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />}
         <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            onError={handleError}
            onLoad={handleLoad}
            className={`transition-opacity duration-300 ${showLoadingState ? "opacity-0" : "opacity-100"}`}
            {...props}
         />
      </div>
   );
};

export default OptimizedImage;
