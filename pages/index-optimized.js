import { memo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import BannerHero from "../components/BannerHero";
import ProductCard from "../components/ProductCard";
import Wrapper from "../components/Wrapper";
import OptimizedLayout from "../components/OptimizedLayout";

import data from "../utils/data";

// Lazy load non-critical components
const DynamicProductCard = dynamic(() => import("../components/ProductCard"), {
   loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded"></div>,
   ssr: true,
});

const products = [
   { src: "/slide-1.png", alt: "Premium Sneaker Collection" },
   { src: "/slide-2.png", alt: "Latest Sports Shoes" },
   { src: "/slide-3.png", alt: "Trending Footwear" },
];

// Memoize the product grid component
const ProductGrid = memo(({ products }) => (
   <OptimizedLayout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-14 px-5 md:px-0 product-grid"
      useContentVisibility
   >
      {products.map((product) => (
         <DynamicProductCard key={product.id} data={product} />
      ))}
   </OptimizedLayout>
));

ProductGrid.displayName = "ProductGrid";

export default function Home() {
   return (
      <>
         <Head>
            <title>Premium Sneakers Collection | Ecommerce Shoes</title>
            <meta
               name="description"
               content="Discover our Fall Limited Edition sneakers collection. Premium quality footwear from top brands like Nike, Adidas, and Puma."
            />
            <meta property="og:title" content="Premium Sneakers Collection | Ecommerce Shoes" />
            <meta
               property="og:description"
               content="Discover our Fall Limited Edition sneakers collection. Premium quality footwear from top brands."
            />
            <meta property="og:type" content="website" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://your-domain.com/" />

            {/* Preload critical images */}
            <link rel="preload" as="image" href="/slide-1.png" fetchpriority="high" />
         </Head>

         <main>
            {/* Hero section with optimized images */}
            <section className="hero-section">
               <BannerHero images={products} />
            </section>

            <Wrapper>
               <OptimizedLayout className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
                  <h1 className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                     Fall Limited Edition <br /> Sneakers
                  </h1>
                  <p className="text-md md:text-xl">
                     These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer
                     sole, they'll withstand everything the weather can offer.
                  </p>
               </OptimizedLayout>

               {/* Product grid with performance optimizations */}
               <ProductGrid products={data} />
            </Wrapper>
         </main>
      </>
   );
}
