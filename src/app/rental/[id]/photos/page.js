import Image from "next/image";
const PhotosPage = async ({ params }) => {
  const imgPath = `/assets/campers/${params.id}`
  const res = await fetch(`http://localhost:3000/rt/${params.id}.json`);

  const photos = await res.json();

  console.log(photos.pictures);

  return (
    <div className="phCenterBox">
      {photos.pictures.map((img, index) => {
        return (
        <div key={index}>
          <Image
            src={`${imgPath}/${img}`}
            unoptimized
            width={0}
            height={0}
            alt="rv"
            style={{ width: "100%", height: "100%" }}
          />
        </div>)
      }
    
    )}
    </div>
  );
};

export default PhotosPage;
