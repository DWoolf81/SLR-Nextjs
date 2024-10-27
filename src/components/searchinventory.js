import { RentalCard } from "@/components/rentalcard";
import Camper from "@/models/campers";

const Searchinventory = async ({ search }) => {

  let data = ""

  if (search){
     // data = await Camper.find().where("location.loc_id").equals(search.loc)

     data = await Camper.find({"location.loc_id":search.loc})

  } else {
     data = await Camper.find()
  }

  

  return (
    <>
      <section className="flex-direction-mobile">
        {search && search.loc }
        <ul className="box-container ">
          {data.map((list) => {
            return (
              <li key={list.id}>
                <RentalCard item={list} />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Searchinventory;
