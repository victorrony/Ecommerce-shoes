import Link from "next/link";
import React, { useState } from "react";
import OptimizedImage from "./OptimizedImage";
import { getDiscountedPricePercentage } from "../utils/helper";
import { CartItem } from "./CartItem";

import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const ProductCard = ({ data }) => {
   const [isOpen, setIsOpen] = useState(false);
   const discountedPrice = data.price - (data.price * data.discountPercentage) / 100;
   const discountedPricePercentage = getDiscountedPricePercentage(data.price, discountedPrice);

   return (
      <motion.div
         initial="hidden"
         animate="show"
         className="bg-white shadow rounded overflow-hidden hover:scale-105 transition-all duration-200 ease-in-out "
      >
         <CartItem
            isOpen={isOpen}
            closeModel={() => setIsOpen(false)}
            searchShoes={data}
            className="flex justify-center items-center z-20"
         />

         <motion.div variants={fadeIn("up", "spring", 0.6, 0.76)}>
            <button onClick={() => setIsOpen(true)} className="w-full">
               <div className="relative">
                  <OptimizedImage
                     src={data.image}
                     alt={data.name}
                     width={400}
                     height={320}
                     sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                     className="w-full h-full object-cover"
                     loading="lazy"
                     fetchPriority="low"
                     quality={85}
                     fallbackSrc="/placeholder-shoe.svg"
                  />
               </div>
               <div className="flex justify-between p-4">
                  <div className="flex flex-col">
                     <p className="text-lg font-bold">{data.name}</p>
                  </div>
                  <div>
                     <p className="text-lg font-bold text-orange-500">${discountedPrice}</p>
                     <p className="text-gray-500 line-through">${data.price}</p>
                     <p className="text-gray-500">{discountedPricePercentage}% off</p>
                  </div>
               </div>
            </button>
         </motion.div>
      </motion.div>
   );
};

export default ProductCard;
