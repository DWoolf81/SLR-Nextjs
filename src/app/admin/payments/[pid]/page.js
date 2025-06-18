import Addlink from "@/components/admin/addlink";
import PaymentInfo from "@/components/admin/paymentinfo";
import { formatPhoneNumber } from "@/lib/admin_actions";
import Payment from "@/models/payments";

const Page = async ({ params }) => {

  const payment = await Payment.findOne({ pid: params.pid });

  console.log("Checking the payment", params)



  return (
    <>
      <PaymentInfo payment={payment} text={"This just a test"} />
    </>
  );
};

export default Page;
