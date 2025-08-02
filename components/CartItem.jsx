import OptimizedImage from "./OptimizedImage";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addToCart, removeFromCart as removeProductFromCart } from "../store/cartSlice";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import RemoveButton from "./RemoveButton";
import QuantityControl from "./QuantityControl";
import AddToCartButton from "./AddToCard";

export const CartItem = ({ searchShoes, isOpen, closeModel }) => {
   const [Quantity, setQuantity] = useState(0);
   const dispatch = useDispatch();

   const [currentImage, setCurrentImage] = useState(searchShoes.image);
   const [hoveredImage, setHoveredImage] = useState(null);

   const removeFromCart = () => {
      dispatch(removeProductFromCart(searchShoes.id));
      closeModel();
   };

   return (
      <Transition appear show={isOpen} as={Fragment}>
         <Dialog as="div" className=" relative z-" onClose={closeModel}>
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className=" fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
               <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0 scale-95"
                     enterTo="opacity-100 scale-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100 scale-100"
                     leaveTo="opacity-0 scale-95"
                  >
                     <Dialog.Panel className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex justify-end">
                           <button
                              type="button"
                              className="bg-blue-500 hover:bg-blue-700  p-2 rounded-full"
                              onClick={closeModel}
                           >
                              X
                           </button>
                        </div>

                        <div className="flex flex-col  md:gap-5 md:flex-row border-b">
                           <div className="flex flex-col justify-center ">
                              <div
                                 className={`w-[350px] h-[300px] ${
                                    searchShoes.thumbnails ? "md:h-[250px]" : "md:h-[400px]"
                                 }`}
                              >
                                 <OptimizedImage
                                    src={hoveredImage || currentImage}
                                    alt="image"
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover"
                                    fallbackSrc="/placeholder-shoe.svg"
                                 />
                              </div>
                              <div className="flex flex-wrap gap-2  items-center mt-2">
                                 {searchShoes.thumbnails?.map((thumbnail) => (
                                    <OptimizedImage
                                       key={thumbnail.id}
                                       src={thumbnail.image}
                                       alt="thumbnail"
                                       width={63}
                                       height={56}
                                       className="w-[63px] h-14 object-cover mb-6"
                                       loading="lazy"
                                       fallbackSrc="/placeholder-shoe.svg"
                                       onMouseEnter={() => setHoveredImage(thumbnail?.image)}
                                       onMouseLeave={() => setHoveredImage(null)}
                                    />
                                 ))}
                              </div>
                           </div>
                           <div className="w-full flex flex-col md:gap-2 ">
                              <div className="flex flex-col gap-4 md:flex-col md:h-[292px] justify-between">
                                 <div className=" flex justify-center  text-base md:text-lg font-semibold text-black/[0.8]">
                                    {searchShoes.name}
                                 </div>
                                 <div className=" text-sm md:text-md text-black/[0.5] overflow-y-auto">
                                    {searchShoes.description}
                                 </div>

                                 <div className="text-sm md:text-md font-bold text-orange-500 mt-2">
                                    MRP : &#8377;{searchShoes.price}
                                 </div>
                              </div>

                              <div className="flex items-center gap-2  text-black/[0.5] text-sm md:text-md">
                                 <div className="flex items-center font-bold text-orange-500">
                                    Color : {searchShoes.color}
                                 </div>
                              </div>

                              <div className="flex gap-4 mt-4 xl:w-[100%] xl:items-center md:gap-8 bottom-0 static">
                                 <AddToCartButton
                                    onAdd={() => {
                                       dispatch(addToCart(searchShoes, Quantity));
                                       closeModel();
                                    }}
                                 />
                              </div>
                           </div>
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   );
};
