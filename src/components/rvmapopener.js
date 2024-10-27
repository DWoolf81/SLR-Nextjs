"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import TestRv from "@/lib/searchrv";

let mapOpen = "search-popout";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

const searchRv = async () => {
  return await TestRv();
};

const Rvmapopener = ({ children }) => {
  const [open, setOpen] = useState("search-popout");

  const [locations, setLocation] = useState(false);

  const params = useSearchParams();

  useEffect(() => {
   const data = searchRv();

   //setLocation(data);

    if (isBrowser()) {
      //Only add the event listener client-side

      window.addEventListener(
        "click",
        (e) => {
          const el = e.target;

          if (el.id !== "mapOpener" && open === false) {
            //e.preventDefault();
            openMap();
          }
        },
        false
      );
    }
  }, [open]);

  const openMap = () => {
    !open ? setOpen(true) : setOpen(false);

    mapOpen = open ? "search-popout open-map" : "search-popout close-map";
  };

  return (
    <>
      <p style={{ textAlign: "right" }}>
        <Link href="#" id="mapOpener" onClick={openMap}>
          Filter search
        </Link>
      </p>
      <div className={mapOpen}>
        <div className="rv-search-box">
          <form name="rv-search">
            <div
              style={{
                borderRadius: "20px",
                padding: "5px 10px",
                background: "rgba(241,241,241, 1)",
                display: "flex",
                alignItems: "stretch",
              }}
            >
              <input
                onChange={searchRv}
                style={{
                  padding: "10px",
                  border: "transparent",
                  flexGrow: "100",
                  background: "transparent",
                }}
                type="text"
                name="rv-search"
                placeholder="Search campground and resorts"
              />
              <button style={{ marginTop: "0px" }}>
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </form>
        </div>

        
        {children}
      </div>
    </>
  );
};

export default Rvmapopener;
