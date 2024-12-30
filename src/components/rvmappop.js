import Camper from "@/models/rental";
import Location from "@/models/locations";
import Link from "next/link";

const Rvmappop = async ({ items }) => {
  const locations = await Location.find();
  const campers = await Camper.find().length;

  const testarr = [0, 0, 1, 1, 1, 2, 1, 3, 4, 4, 5, 6, 6, 6, 5, 6, 2, 3, 3];

  
  const locCount = (arr, val) => {
    let num = 0;

    arr.map((el) => {
      if (el == val) num++;
    });

    return num;
  };


  // const rvs = [...Array(2)];
  return (
    <>
      <div className="rv-search-items">
        <ul>
          {locations.map(async (rv, index) => {

            const count = (await Camper.find({ "location.loc_id": rv.loc_id } )).length;
            return (
              <li key={index} style={{ position: "relative" }}>
                <Link
                  href={{
                    pathname: "/search",
                    query: { loc: rv.loc_id },
                  }}
                  style={{
                    position: "absolute",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                  }}
                ></Link>
                <div className="rv-map-item">
                  <div className="rv-map-img"></div>
                  <div className="rv-map-content">
                    <div className="rv-map-head">
                      <p className="rv-map-title">{rv.name} </p>
                      <div className="rv-map-ta">
                        <p>{rv.type}</p>
                        <p>
                          <span className="material-symbols-outlined">map</span>{" "}
                          {rv.location.street}
                        </p>
                      </div>
                      <div>
                        <p>
                          {" "}
                          Available Rentals: <strong> { count }</strong>
                        </p>
                      </div>
                    </div>
                    <div className="rv-map-links">
                      <div>
                        <a
                          style={{
                            zIndex: "100",
                          }}
                          target="_blank"
                          href={`${rv.web}`}
                        >
                          <span className="material-symbols-outlined">
                            public
                          </span>
                          <p>Website</p>
                        </a>
                      </div>
                      <div>
                        <a
                          style={{
                            zIndex: "100",
                          }}
                          target="_blank"
                          href={`${rv.location.map}`}
                        >
                          <span className="material-symbols-outlined">
                            moving
                          </span>
                          <p>Directions</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Rvmappop;
