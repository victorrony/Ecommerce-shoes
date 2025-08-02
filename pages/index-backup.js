import BannerHero from "../components/BannerHero";
import ProductCard from "../components/ProductCard";
import Wrapper from "../components/Wrapper";

import data from "../utils/data";

const products = [
   { src: "/slide-1.png", alt: "Image 4" },
   { src: "/slide-2.png", alt: "Image 4" },
   { src: "/slide-3.png", alt: "Image 4" },
];


export default function Home() {
   return (
      <main>
         <BannerHero images={products} />
         <Wrapper>
            <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
               <h1 className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                  Fall Limited Edition <br /> Sneakers
               </h1>
               <p className="text-md md:text-xl">
                  These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer
                  sole, they’ll withstand everything the weather can offer.
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-14 px-5 md:px-0 ">
               {data.map((product) => (
                  <ProductCard key={product.id} data={product} />
               ))}
            </div>
         </Wrapper>
      </main>
   );
}
