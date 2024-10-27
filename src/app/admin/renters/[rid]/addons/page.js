import Addlink from "@/components/admin/addlink";
import Renteraddons from "@/components/admin/renteraddons";
import { formatPhoneNumber } from "@/lib/admin_actions";
import Addon from "@/models/addons";
import Renter from "@/models/renters";

const Page = async ({ params }) => {
  const renter = await Renter.findOne({ rid: params.rid });
  const addon = await Addon.find()

  // console.log("add ons", Object.values(renter.renting));


    
    const renteraddons = JSON.parse(JSON.stringify(renter.addon))
    const addons = JSON.parse(JSON.stringify(addon))

    console.log("Renters addons",  renteraddons.length
    )


  let moveout = " -- ";
  let nextdate = " -- "
  let renting = false;

  if (renter.renting && renter.renting.rv !== undefined) {
    renting = renter.renting;
    const nd = renting.nextdate

    moveout = renting.moveout && `${renting.moveout.getMonth()}/${renting.moveout.getDate()}/${renting.moveout.getFullYear()}`;
    nextdate = `${nd.getMonth()}/${nd.getDate()}/${nd.getFullYear()}`;

  }

  const phone = formatPhoneNumber(renter.phone);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <h1>Addons: {renter.name}</h1>
        
      </div>

      <div className={"admin-info-box"}>
        <span className="material-symbols-outlined">face_6</span>
        <div className={"admin-header-div"}>
          <h2>Personal</h2>
        </div>

        <p>
          Name: <span>{renter.name}</span>
        </p>
        <p>
          Phone: <span>{phone}</span>
        </p>
      </div>

      <div className={"admin-info-box"}>
        <div className={"admin-header-div"}>
          <h2>Renting</h2>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {renting ? (
              <Addlink
                className="al-green-bg"
                linkpath={`/admin/renters/${params.rid}/rental`}
                text={"Edit Rental"}
              />
            ) : (
              <Addlink
                className="al-green-bg"
                linkpath={`/admin/renters/${params.rid}/rental`}
                text={"Add Rental"}
              />
            )}
          </div>
        </div>
        {renting ? (
          <div>
            <p>
              RV:{" "}
              <span
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                {renter.renting.rv}
              </span>
            </p>
            <p>
              Rate: <span>{renter.renting.rate}</span>
            </p>
            <p>
              Location: <span>{renter.renting.location}</span>
            </p>
            <p>
              Tenants: <span>{renter.renting.tenants}</span>
            </p>
            <p>
              Next Payment: <span>{nextdate}</span>
            </p>
            <p>
              Move Out: <span>{moveout}</span>
            </p>
          </div>
        ) : (
          <p>Not Currently Renting</p>
        )}
        </div>
        <div className={"admin-info-box"}>
          <div className={"admin-header-div"}>
            <h2>Add Ons</h2>
          </div>
          <Renteraddons addons={addons} renteraddons={renteraddons} rid={params.rid} />
        </div>
    </>
  );
};

export default Page;
