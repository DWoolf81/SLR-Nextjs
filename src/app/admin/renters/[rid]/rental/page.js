import Addrental from "@/components/admin/addrental";
import Newrenter from "@/components/admin/newrenterform";
import Camper from "@/models/rental";
import Renter from "@/models/renters";

const Page = async ({ params }) => {
  const renter = await Renter.findOne({ rid: params.rid });

  let terms = ""

  if (renter.renting) {
    const rental = await Camper.findOne({ rvid: renter.renting.rv });

    if (rental) {
      renter.terms = rental.rate;
    }
   
    terms = JSON.parse(JSON.stringify(rental.rate));
  }

  const json = JSON.parse(JSON.stringify(renter));

  console.log("Renter info", json, terms);

  return <Addrental edit={json} terms={terms} />;
};

export default Page;
