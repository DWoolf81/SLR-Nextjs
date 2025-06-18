import Addrental from "@/components/admin/addrental";
import Camper from "@/models/rental";
import Renter from "@/models/renters";

const Page = async ({ params }) => {
  const renter = await Renter.findOne({ rid: params.rid });

  let terms = ""

  if (renter.renting) {
    const rental = await Camper.findOne({ rvid: renter.renting.rv })
    console.log(rental)
    if (rental) {
      terms = rental.rate;
      //terms = JSON.parse(JSON.stringify(rental.rate));
    }
   
    
  }

  const json = JSON.parse(JSON.stringify(renter));

  console.log("Renter info", json, terms);

  return <Addrental edit={json} terms={terms} />
};

export default Page;
