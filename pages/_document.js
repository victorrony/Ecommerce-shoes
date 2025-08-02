import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
   return (
      <Html lang="en">
         <Head>
            {/* Preconnect to external font origins */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

            {/* Optimized font loading with display=swap */}
            <link
               href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
               rel="stylesheet"
            />

            {/* Preconnect to image CDNs for faster loading */}
            <link rel="preconnect" href="https://images.puma.com" />
            <link rel="preconnect" href="https://static.nike.com" />
            <link rel="preconnect" href="https://assets.adidas.com" />

            {/* DNS prefetch for better performance */}
            <link rel="dns-prefetch" href="https://images.puma.com" />
            <link rel="dns-prefetch" href="https://static.nike.com" />
            <link rel="dns-prefetch" href="https://assets.adidas.com" />
         </Head>
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}
