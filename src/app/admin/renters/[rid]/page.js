import Addlink from "@/components/admin/addlink";
import { formatPhoneNumber } from "@/lib/admin_actions";
import Addon from "@/models/addons";
import Renter from "@/models/renters";

const Page = async ({ params }) => {
  const renter = await Renter.findOne({ rid: params.rid });

  console.log("add ons", Object.values(renter.renting));

  let moveout = " -- ";
  let nextdate = " -- "
  let renting = false;
  let addons = false;

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
        <h1>Renter: {renter.name}</h1>
        <Addlink
          linkpath={`/admin/renters/${params.rid}/edit`}
          text={"Edit Renter"}
        />
      </div>

      <div className={"admin-info-box"}>
        <span className="material-symbols-outlined">face_6</span>
        <div className={"admin-header-div"}>
          <h2>Personal</h2>
          <Addlink
            className="al-green-bg"
            linkpath={`/admin/renters/${params.rid}/edit`}
            text={"Edit"}
          />
        </div>

        <p>
          Name: <span>{renter.name}</span>
        </p>
        <p>
          Email: <span>{renter.email}</span>
        </p>
        <p>
          Location:{" "}
          <span>{`${renter.location.city}, ${renter.location.state} `}</span>
        </p>
        <p>
          DOB: <span>{renter.dob}</span>
        </p>
        <p>
          Phone: <span>{phone}</span>
        </p>
        <p>
          DL: <span>{renter.dl}</span>
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

            <Addlink
              className="al-green-bg"
              linkpath={`/admin/renters/${params.rid}/addons`}
              text={"Edit Addons"}
            />
          </div>
          {renter.addon[0] !== undefined ? (
            <div>
              <ul>
                {renter.addon.map((el, index) => {
                  return (
                    <li key={index}>
                      {el.name}: ${el.rate}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p>No Add Ons</p>
          )}
        </div>
    </>
  );
};

export default Page;
