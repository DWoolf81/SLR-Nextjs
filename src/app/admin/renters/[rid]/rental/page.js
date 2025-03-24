import Addrental from "@/components/admin/addrental";
import Newrenter from "@/components/admin/newrenterform";
import Camper from "@/models/rental";
import Renter from "@/models/renters";

const Page = async ({ params }) => {
  const renter = await Renter.findOne({ rid: params.rid });

  let terms = ""

  if (renter.renting) {
    const rental = await Camper.findOne({ rvid: renter.renting.rv })
    console.log(rental)
    if (rental) {
      renter.terms = rental.rate;
      //terms = JSON.parse(JSON.stringify(rental.rate));
    }
   
    
  }

  const json = JSON.parse(JSON.stringify(renter));

  console.log("Renter info", json, terms);

  return terms !== "" ? <Addrental edit={json} terms={terms} /> : `No active rental or inactive serach for rvid : ${renter.renting.rv}`
};

export default Page;
