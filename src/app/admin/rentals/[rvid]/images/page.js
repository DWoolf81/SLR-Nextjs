import Imageholder from "@/components/admin/imageuploader/imageholder";
import Rentalimageuploader from "@/components/admin/imageuploader/rentalimageuploader";
import { getRv } from "@/lib/actions";
import { deleteImg } from "@/lib/admin_actions";

const Page = async ({ params }) => {
  const rental = await getRv(params.rvid);

  const filterImg = []
  rental.pictures.map((img, index) => {
    if (index == 1){
      filterImg[index] = "9773969304-0-1734286729901.jpg";

      index++

    } else filterImg[index] = img
  });

  filterImg[0] = "9773969304-0-1734286729901.jpg";

  console.log("This is the rental", rental.pictures, filterImg);

  return (
    <>
      <div
        style={{
          padding: "20px 0px",
        }}
      >
        <h2>
          {rental.name} - {params.rvid} | Images
        </h2>
      </div>      
      <Rentalimageuploader rental={rental} />

      <div className="image-holder-box">
        {rental.pictures.length > 0 ? (
          rental.pictures.map((img, index) => {
            return (
              <Imageholder
                imageObj={{
                  rvid: params.rvid,
                  images: rental.pictures,
                  image: img,
                }}
                index={index}
                deleteImg={deleteImg}
              />
            );
          })
        ) : (
          <>
            <Imageholder
              imageObj={{ rvid: params.rvid, image: null }}
              foo={"bar"}
            />
            <Imageholder
              imageObj={{ rvid: params.rvid, image: null }}
              foo={"bar"}
            />
            <Imageholder
              imageObj={{ rvid: params.rvid, image: null }}
              foo={"bar"}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Page;
