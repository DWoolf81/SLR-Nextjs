'use client'
import Link from "next/link"
import { useState } from "react"
const Menubtn = () => {

    const [isOpen, setIsOpen] = useState(false)

    let menu = "nav navHome";

    const test = () => {

        !isOpen ? setIsOpen(true) : setIsOpen(false)

        isOpen ? menu += " open-nav" : menu = "nav navHome"

    }

    console.log("Hit anywhere")

  return (
    <>
    <nav className={isOpen ? menu += " open-nav": menu}>
          <ul>
            <li><Link href="/extras">Rates & Amenities</Link></li>
            <li><Link href="/search">Listings</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </nav>
        <Link className="menu-link" href="" onClick={test} ><span className="material-symbols-outlined">Menu</span></Link>

    </>

  )
}

export default Menubtn