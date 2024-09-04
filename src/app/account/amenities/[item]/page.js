import { findAmenityById } from "@/app/lib/actions";
import Amenitycardbig from "@/components/amenitycardbig";
import Backbtn from "@/components/backbtn";

const Amenity = async ({ params }) => {
  const item = await findAmenityById(parseInt(params.item));



  console.log(item);

  const stock = item.instock === true ? "In stock" : " Out Of Stock";
  const stockClass = item.instock === true ? "green" : "red";

  return (
    <>
      <Backbtn link={"./addons"} />

      <Amenitycardbig item={item} />
      
    </>
  );
};

export default Amenity;
