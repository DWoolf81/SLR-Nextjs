"use client";

import { addOnAmounts } from "@/lib/actions";
import { addAddon, deleteAddon } from "@/lib/admin_actions";
import Image from "next/image";
import Link from "next/link";

const makeithappen = async (data) => {
  console.log("Click this bitch", data);

  const action = await addAddon({
    addon: data.addon,
    rid: data.rid,
    action: "add",
  });

  console.log(action);
};

const Renteraddons = ({ addons, renteraddons, rid }) => {
  console.log("Client side renter addons", renteraddons);

  let sum = 0;

  renteraddons.forEach((rate) => (sum += rate.rate));

  console.log("The add on amounts", sum)

  return (
    <>
      <div
        style={{
          margin: "20px 0px",
        }}
      >
        
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0px",
          }}
        ><h2>Rentals Addons - ${ sum } Total</h2> </div>

        <div>
          <ul className={"admin-flex-list admin-flex-list-head"}>
            <li>#</li>
            <li>Name</li>
            <li>Rate</li>
            <li>Links</li>
          </ul>
        </div>
        <div>
          {renteraddons !== undefined &&
            renteraddons.map((el, index) => {
              const prime = index % 2 == 0 ? "acct-history-item" : "";
              const aid = el.aid;

              let instock = "Out Of Stock";
              let color = "red";

              if (el.instock) {
                instock = "Instock";
                color = "green";
              }

              return (
                <ul
                  key={index}
                  className={"admin-flex-list admin-flex-list-content"}
                >
                  <li>{index}</li>

                  <li>
                    <Link href={`/admin/addons/${aid}`}>{el.name}</Link>
                  </li>
                  <li>${el.rate}</li>
                  <li>
                    <div>
                      <form
                        action={(formData) => {
                          deleteAddon(formData);
                        }}
                      >
                        <input type="hidden" name="stock" value={el.stockNum} />
                        <input type="hidden" name="rid" value={rid} />
                        <button>
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </form>
                      {/* <a href={""} onClick={(e) =>{  e.preventDefault();  makeithappen({addon: { aid: aid, name: el.name, rate: el.rate}, rid: rid })}}>Remove</a> */}
                    </div>
                  </li>
                </ul>
              );
            })}
        </div>
      </div>

      <div
        style={{
          margin: "20px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0px",
          }}
        >         <h2>Addons Available</h2>
</div>

        <div>
          <ul className={"admin-flex-list admin-flex-list-head"}>
            <li>#</li>
            <li>Image</li>
            <li>Name</li>
            <li>Rate</li>
            <li>In stock</li>
            <li>Links</li>
          </ul>
        </div>
        <div>
          {addons.map((el, index) => {
            const prime = index % 2 == 0 ? "acct-history-item" : "";
            const aid = el.aid;

            let instock = "Out Of Stock";
            let color = "red";

            if (el.instock) {
              instock = "Instock";
              color = "green";
            }

            return (
              <ul
                key={index}
                className={"admin-flex-list admin-flex-list-content"}
              >
                <li>{index}</li>
                <li>
                  <Image
                    src={`/assets/amenities/vectors/${el.image}`}
                    className="amenity-list-image"
                    width={0}
                    height={0}
                    alt={el.name}
                    sizes="50px"
                  />
                </li>
                <li>
                  <Link href={`/admin/addons/${aid}`}>{el.name}</Link>
                </li>
                <li>${el.rate}</li>
                <li>
                  <span style={{ color: color, fontWeight: "bold" }}>
                    {instock}
                  </span>
                </li>
                <li>
                  <div>
                    {el.instock && (
                      <a
                        href={""}
                        onClick={(e) => {
                          e.preventDefault();
                          makeithappen({
                            addon: { aid: aid, name: el.name, rate: el.rate },
                            rid: rid,
                          });
                        }}
                      >
                        <span className="material-symbols-outlined">add_box</span>
                      </a>
                    )}
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Renteraddons;
