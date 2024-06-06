import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLinks from "./NavLinks";

type Props = {}

const SmallNavLinks = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }


  return (
    <div>
        <button onClick={toggleNavbar}>
            { isOpen ? (
                <XMarkIcon className="h-6 w-6"/>
            ) : (
                <Bars3Icon className="h-6 w-6"/>
            ) }
        </button>

        {isOpen && 
            <div onClick={toggleNavbar} className="flex basis-full flex-col items-center ">
                <NavLinks/>
            </div>
        }

    </div>
  )
}

export default SmallNavLinks