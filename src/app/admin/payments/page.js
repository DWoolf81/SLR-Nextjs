import Addlink from "@/components/admin/addlink";
import ListOfPayments from "@/components/admin/listofpayments";
import Payment from "@/models/payments";
import Link from "next/link";

const Page = async () => {



  const payments = await Payment.find();



  return (
    <>
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
    <ListOfPayments payments={ payments } />
    
    
    </>
    
  );
};

export default Page;
