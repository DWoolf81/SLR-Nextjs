import Addlink from "@/components/admin/addlink";
import Payment from "@/models/payments";
import Renter from "@/models/renters";
import Link from "next/link";

const Page = async () => {


  const payments = await Payment.find();



  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <h1>Payments</h1>
        <Addlink linkpath={"/admin/payments/add-payment"} text={"Add Payment"} />
      </div>

      <div>
        <ul className={"admin-flex-list admin-flex-list-head"}>
          <li>Pay ID</li>
          <li>Renter ID</li>
          <li>Rental ID</li>
          <li>Amount</li>
          <li>Payment Date</li>
          <li>OnTime?</li>
          <li>Links</li>
        </ul>
      </div>
      <div>
        {payments.map((el, index) => {
          const prime = index % 2 == 0 ? "acct-history-item" : "";

       

            const payment = `$${el.amount}`
            

          return (
            <ul
              key={index}
              className={"admin-flex-list admin-flex-list-content"}
            >
              <li>{ el.pid }</li>
              <li>{ el.rvid }</li>
              <li><Link href={`/admin/rentals/${el.rid}`}>{ el.rid }</Link></li>
              <li>{ payment }</li>
              <li>{ el.date }</li>
              <li className="iot"><p>L</p></li>
              <li>
                <div style={{width: "100%"}}>
                  <ul className={"admin-flex-list-links"}>
                    <li>
                      <Link href={`/admin/payments/${el.pid}`}>
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href={`/admin/payments/${el.pid}/edit`}>
                        <span className="material-symbols-outlined">edit</span>
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
