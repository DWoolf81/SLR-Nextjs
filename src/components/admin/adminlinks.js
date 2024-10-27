'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const AdminLinks = () => {

    const path = usePathname()

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
            padding: "10px",
            borderBottom: "solid 1px #fefefe"
        }}>
        <Link className={path.endsWith("/admin") ? "admin-link on-page" : "admin-link"} href={"/admin"}>Home</Link>
        <Link className={path.includes("/payments") ? "admin-link on-page" : "admin-link"} href={"/admin/payments"}>Payments</Link>
        <Link className={path.includes("/renters") ? "admin-link on-page" : "admin-link"} href={"/admin/renters"}>Renters</Link>
        <Link className={path.includes("/rentals") ? "admin-link on-page" : "admin-link"} href={"/admin/rentals"}>Rentals</Link>
        <Link className={path.includes("/locations") ? "admin-link on-page" : "admin-link"} href={"/admin/locations"}>Locations</Link>
        <Link className={path.includes("/addons", 0) ? "admin-link on-page" : "admin-link"} href={"/admin/addons"}>Addons </Link>
        
        </div>
        
        

    )
}


export default AdminLinks