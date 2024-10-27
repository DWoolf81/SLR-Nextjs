import { findAmenityById } from "@/lib/actions";
import Amenitycardbig from "@/components/amenitycardbig";
import Backbtn from "@/components/backbtn";

const Amenity = async ({ params }) => {
  const item = await findAmenityById(parseInt(params.item));

  const stock = item.instock === true ? "In stock" : " Out Of Stock";
  const stockClass = item.instock === true ? "green" : "red";

  return (
    <>
      <Backbtn link={"./addons"} />

      <Amenitycardbig item={item} />

      <div style={{
        display: "flex",
        width: "100%",
        height: "100px",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}>
        <p>Please call SLR to add/remove addon items at <br />(713) 364-4497</p>
      </div>
      
    </>
  );
};

export default Amenity;
