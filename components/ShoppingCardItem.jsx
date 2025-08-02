// components/ShoppingCart.js

import { removeFromCart, updateCart } from "../store/cartSlice";
import OptimizedImage from "./OptimizedImage";
import { useMemo, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

export default function ShoppingCartItem({ data }) {
   const dispatch = useDispatch();
   const [quantity, setQuantity] = useState(data.quantity);

   const item = useMemo(
      () => ({
         id: data.id,
         name: data.name,
         image: data.image,
         price: data.price,
         quantity: quantity,
      }),
      [data, quantity]
   );

   const handleChange = (key) => (e) => {
      const setValue = e.target.value;
      if (key === "quantity") {
         const newQuantity = parseInt(setValue);
         setQuantity(newQuantity); // Atualiza o estado local com a nova quantidade
         dispatch(
            updateCart({
               ...item,
               [key]: newQuantity, // Atualiza o item no Redux
            })
         );
      }
   };

   const totalPrice = useMemo(() => item.price * item.quantity, [item.price, item.quantity]);

   return (
      <div className="flex items-center justify-between w-full p-2 gap-4 border-b bg-slate-100 border-gray-300">
         <div className="flex items-center space-x-4">
            <div className="w-20 h-20">
               <OptimizedImage
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded"
                  fallbackSrc="/placeholder-shoe.svg"
               />
            </div>
         </div>
         <div className="flex flex-col items-start gap-3 w-full">
            <div className="w-full">
               <h3 className="text-lg truncate w-48 md:w-72">{item.name}</h3>
            </div>
            <div className="flex w-full justify-between space-x-4">
               <p className="text-sm font-semibold">${totalPrice}</p>
               <input
                  type="number"
                  min={1}
                  max={100}
                  defaultValue={item.quantity}
                  onChange={handleChange("quantity")}
               />
               <button
                  onClick={() => dispatch(removeFromCart(item))}
                  className="flex items-end justify-end text-red-500 hover:text-red-700"
               >
                  <RiDeleteBin6Line />
               </button>{" "}
            </div>
         </div>
      </div>
   );
}
