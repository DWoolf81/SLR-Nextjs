import Addlink from "@/components/admin/addlink";
import Adminrentallist from "@/components/admin/rentallist/adminrentallist";
import Removerentalform from "@/components/admin/removerentalform";
import Rental from "@/models/rental";
import { rentalTypes } from '@/lib/actions'



const Page = async () => {
  const rentals = await Rental.find();

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
        <Addlink
          linkpath={"/admin/rentals/new-rental"}
          text={"Create Rental"}
        />
      </div>

      <Adminrentallist allrentals={rentals} />
    </div>
  );
};

export default Page;
