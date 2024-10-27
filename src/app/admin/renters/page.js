import Addlink from "@/components/admin/addlink";
import Renter from "@/models/renters";
import Link from "next/link";

const Page = async () => {
  const items = [...Array(25)];


  const renters = await Renter.find();



  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <h1>Renters</h1>
        <Addlink linkpath={"/admin/renters/new-renter"} text={"Add Renter"} />
      </div>

      <div>
        <ul className={"admin-flex-list admin-flex-list-head"}>
          <li>#</li>
          <li>Name</li>
          <li>Renting</li>
          <li>Payment</li>
          <li>Due Date</li>
          <li>Links</li>
        </ul>
      </div>
      <div>
        {renters.map((el, index) => {
          const prime = index % 2 == 0 ? "acct-history-item" : "";

          let renting = " -- "
          let payment = " -- "
          let nextdate = " -- "
          let moveout = " -- "

          if (el.renting.rv !== undefined){
            renting = el.renting.rv
            payment = `$${el.renting.rate}`
            nextdate = el.renting.nextdate
            nextdate = `${el.renting.nextdate.getMonth()}/${el.renting.nextdate.getDate()}`;
            moveout = el.renting.moveout
            
          }


          console.log(el.renting.rv)

          return (
            <ul
              key={index}
              className={"admin-flex-list admin-flex-list-content"}
            >
              <li>{ el.rid }</li>
              <li>{ el.name }</li>
              <li><Link href={`/admin/rentals/${renting}`}>{ renting }</Link></li>
              <li>{ payment }</li>
              <li>{ nextdate }</li>
              <li>
                <div style={{width: "100%"}}>
                  <ul className={"admin-flex-list-links"}>
                    <li>
                      <Link href={`/admin/renters/${el.rid}`}>
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
