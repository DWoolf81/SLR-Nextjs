import Addlink from "@/components/admin/addlink";
import Addon from "@/models/addons";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const items = [...Array(25)];


  const addons = await Addon.find();



  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <h1>Addons</h1>
        <Addlink linkpath={"/admin/addons/new-addon"} text={"Add Addon"} />
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
            const aid = el.aid

            let instock = "Out Of Stock"
            let color = "red"


            if (el.instock){
                instock = "Instock"
                color = 'green'
            }
         
          return (
            <ul
              key={index}
              className={"admin-flex-list admin-flex-list-content"}
            >
              <li>{ aid }</li>
              <li><Image
                  src={`/assets/amenities/vectors/${el.image}`}
                  className="amenity-list-image"
                  width={0}
                  height={0}
                  alt={el.name}
                  sizes="50px"
                /></li>
              <li><Link href={`/admin/addons/${aid}`}>{ el.name }</Link></li>
              <li>${ el.rate }</li>
              <li><span style={{color: color, fontWeight: "bold"}}>{ instock }</span></li>
              <li>
                <div>
                  <ul className={"admin-flex-list-links"}>
                    <li>
                      <Link href={`/admin/renters/${el.aid}`}>
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href={""}>
                        <span className="material-symbols-outlined">edit</span>
                      </Link>{" "}
                    </li>
                    <li>
                      <Link href={""}>
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </Link>{" "}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
