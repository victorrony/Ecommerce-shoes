import { memo } from "react";

// Performance-optimized layout component
const OptimizedLayout = memo(({ children, className = "", useContentVisibility = false }) => {
   const layoutClassName = useContentVisibility
      ? `${className} [content-visibility:auto] [contain-intrinsic-size:auto_500px]`
      : className;

   return <div className={layoutClassName}>{children}</div>;
});

OptimizedLayout.displayName = "OptimizedLayout";

export default OptimizedLayout;
