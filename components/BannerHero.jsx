import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";

const BannerHero = ({ images }) => {
   return (
      <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto ">
         <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            interval={5000}
            showThumbs={false}
            renderArrowPrev={(clickHandler, hasPrev) => (
               <div
                  onClick={clickHandler}
                  className="absolute left-0  bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90 "
               >
                  <BiArrowBack className="text-sm md:text-lg" />
               </div>
            )}
            renderArrowNext={(clickHandler, hasNext) => (
               <div
                  onClick={clickHandler}
                  className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
               >
                  <BiArrowBack className="rotate-180 text-sm md:text-lg" />
               </div>
            )}
         >
            {images?.map((item, index) => (
               <div key={index} className="relative flex md:h-[500px] h-[300px]">
                  <img
                     src={item.src}
                     alt={item.alt}
                     className="w-full h-full object-cover"
                     loading={index === 0 ? "eager" : "lazy"}
                     fetchpriority={index === 0 ? "high" : "low"}
                  />
                  {/* <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                     Shop now
                  </div> */}
               </div>
            ))}
         </Carousel>
      </div>
   );
};

export default BannerHero;
