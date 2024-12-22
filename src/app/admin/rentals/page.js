import Addlink from "@/components/admin/addlink";
import Camper from "@/models/campers";
import Link from "next/link";

const Page = async () => {
  const items = [...Array(25)];


  const campers = await Camper.find();



  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <h1>Rentals</h1>
        <Addlink linkpath={"/admin/rentals/new-rental"} text={"Create Rental"} />
      </div>

      <div>
        <ul className={"admin-flex-list admin-flex-list-head"}>
          <li>#</li>
          <li>Name</li>
          <li>Renting</li>
          <li>Location</li>
          <li>Rates</li>
          <li>Links</li>
        </ul>
      </div>
      <div>
        {campers.map((el, index) => {
          const prime = index % 2 == 0 ? "acct-history-item" : "";

          let renting = " -- "
          let location = " -- "
          let nextdate = " -- "
          let moveout = " -- "

          if (el.renting !== undefined){
            renting = el.renting.rid
            
          } else renting = "Available"

          if (el.location.loc_id) location = el.location.loc_id


          return (
            <ul
              key={index}
              className={"admin-flex-list admin-flex-list-content"}
            >
              <li>{ el.rvid }</li>
              <li>{ el.name }</li>
              <li><Link href={`/admin/rentals/${renting}`}>{ renting }</Link></li>
              <li>{ location }</li>
              <li>{ `$${el.rate.day}/$${el.rate.week}/$${el.rate.month}` }</li>
              <li>
                <div style={{width: "100%"}}>
                  <ul className={"admin-flex-list-links"}>
                    <li>
                      <Link href={`/admin/rentals/${el.rvid}`}>
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/admin/rentals/${el.rvid}/edit`}>
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
