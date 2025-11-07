'use client'
import data from "@/app/data/data.json";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () =>{
    const pathName=usePathname();

    return(

        <ul className="flex bg-pink-300 justify-center gap-4 h-[10vh] items-center">
            {data.navLinks.map((item,index)=>{
                const isActive= pathName===`${item.path}`;

                return(

                    <li className={`${isActive?'font-bold text-white underline':'text-black'}`} key={index}>
                        <Link href={item.path}>{item.label}</Link>
                    </li>

                )
            })}
        </ul>
    );
};

export default Navbar;