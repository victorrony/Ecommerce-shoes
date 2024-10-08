import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const data = [
   { id: 1, name: "Home", url: "/" },
   { id: 2, name: "Collection", subCollection: true },
   { id: 3, name: "Men", url: "men" },
   { id: 4, name: "Women", url: "women" },
   { id: 5, name: "About", url: "about" },
   { id: 6, name: "Contact", url: "contact" },
];

const subCollection = [
   { id: 1, name: "Nike", doc_count: 20 },
   { id: 2, name: "Jordan", doc_count: 25 },
   { id: 3, name: "Adidas", doc_count: 32 },
   { id: 4, name: "Running shoes", doc_count: 25 },
   { id: 5, name: "Football shoes", doc_count: 16 },
];

const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
   return (
      <ul className="hidden md:flex items-center gap-8 font-medium text-black ">
         {data.map((item) => {
            return (
               <React.Fragment key={item.id}>
                  {!!item?.subCollection ? (
                     <li
                        className="cursor-pointer flex items-center gap-2 relative "
                        onMouseEnter={() => setShowCatMenu(true)}
                        onMouseLeave={() => setShowCatMenu(false)}
                     >
                        {item.name}
                        <BsChevronDown size={14} />

                        {showCatMenu && (
                           <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
                              {subCollection.map(({ index, id }) => {
                                 return (
                                    <Link key={id} href={""} onClick={() => setShowCatMenu(false)}>
                                       <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                                          {index?.name}
                                          <span className=""></span>
                                       </li>
                                    </Link>
                                 );
                              })}
                           </ul>
                        )}
                     </li>
                  ) : (
                     <li className="cursor-pointer">
                        <Link href={item.url}>{item.name}</Link>
                     </li>
                  )}
               </React.Fragment>
            );
         })}
      </ul>
   );
};

export default Menu;
