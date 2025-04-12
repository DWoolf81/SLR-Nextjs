import Addlink from "@/components/admin/addlink";
import { formatPhoneNumber } from "@/lib/admin_actions";
import Payment from "@/models/payments";

const Page = async ({ params }) => {
  const payment = await Payment.findOne({ rid: params.rid });


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <h1>Payment ID: {payment.name}</h1>
        <Addlink
          linkpath={`/admin/renters/${params.pid}/edit`}
          text={"Edit Renter"}
        />
      </div>

      <div className={"admin-info-box"}>

        <p>
          Payment ID: <span>{payment.pid}</span>
        </p>
        <p>
          Rental ID: <span>{payment.rvid}</span>
        </p>
        <p>
          Renter: <span>{renter.dob}</span>
        </p>
        <p>
          Phone: <span>{phone}</span>
        </p>
        <p>
          DL: <span>{renter.dl}</span>
        </p>
      </div>
    </>
  );
};

export default Page;
