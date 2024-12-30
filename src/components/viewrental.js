import Image from "next/image";
import Link from "next/link";
import { RentalCard } from "@/components/rentalcard";
import "@/app/css/rental.css";
import Camper from "@/models/rental";
import connectToDatabase from "@/lib/mongoose";
import Map from "@/components/map";


const data1 = async (id) => {

    console.log("This the id", id)

  const data = await Camper.findOne({ rvid: id });

  return data;
};

const data2 = async () => {

  const data = Camper.find();

  return data;
};
const ViewRental = async ({ params }) => {

  await connectToDatabase();

  const rv = await data1(params.rvid);

  console.log("The map field is ", rv, params)


  const mainImage = rv.pictures[0]
    ? `/assets/rentals/uploads/${params.rvid}/${rv.pictures[0]}`
    : "/assets/rentals/default_camper.jpg";


  const rvs = await data2();


  let isAvail = "";
  let isAvailClass = "is-avail ";

  if (rv.available === 0) {
    let isAvail = "Unavailable";
  } else if (rv.available === 1) {
    isAvailClass = isAvailClass + "avail";
    isAvail = "Available";
  } else if (rv.available === 2) {
    isAvailClass = isAvailClass + "soon";
    isAvail = "Reserve";
  }
    

  return (
    <>
    
      <div className="vh100-box">
        <div className="rv-image-box">
          <div id="rv-main-image">
            <div>
              <Image
                src={mainImage}
                unoptimized
                width={0}
                height={0}
                alt="rv"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div id="rv-sub-images">
            {rv.pictures.slice(1).map((img, index) => {
              const rv_img = `/assets/rentals/uploads/${params.rvid}/${img}`;
              if (index == 3) {
                return (
                  <div key={index} className="view-more">
                    <Link href={`/rental/${params.rvid}/photos`}>
                      <p>+ {rvs.length - index}</p>
                    </Link>
                  </div>
                );
              } else if (index < 2) {
                return (
                  <div key={index}>
                    <Image
                      src={rv_img}
                      unoptimized
                      width={0}
                      height={0}
                      alt="rv"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="sub-container">
          <div className="book-info-box">
            <div className="book-box">
              <div className="booking-rate-box">
                <p>
                  <span className="rv-price">
                    $
                    <span id="day" className="rv-price day-rate-top">
                      {rv.rate.day}
                    </span>
                    /Day
                  </span>{" "}
                  starting
                  <br />
                  <span className="wm-rate wm-rate-top">
                    ${rv.rate.week} /Week | ${rv.rate.month} /Month
                  </span>
                </p>
              </div>
              <p className={isAvailClass}>{isAvail}</p>
              <div
                className="booking-info display-none-mobile"
                style={{ backgroundColor: "white" }}
              >
                <p className="sub-title">For Booking</p>
                <p>Email:</p>
                <p>inquire@simplylivingrentals.com</p>
                <p>Text or Call</p>
                <p>(713) 364-4497</p>
              </div>
            </div>
          </div>
          <div className="details-box">
            <div className="under-line-head">
              <h3 id="name">{rv.name}</h3>
            </div>
            <div id="feats">
              <p>
                <span className="material-symbols-outlined">bed</span>:{" "}
                <span id="sleeps"> {rv.sleeps}</span>
              </p>
              <p>
                <span id="length"> {rv.length} </span> ft.{" "}
                <span className="material-symbols-outlined">straighten</span>
              </p>
              <p>
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                <span id="year">{rv.year}</span>
              </p>
            </div>
            <div id="desc">
              <p>{rv.desc} </p>
            </div>
            <div className="loc-box">
              <div className="under-line-head" style={{ marginBottom: "10px" }}>
                <p className="sub-title">Location: </p>
              </div>
              <Map link={rv.location} />
            </div>
            <div className="under-line-head">
              <p className="sub-title">Amenities</p>
            </div>
            <div id="amenities" className="grid-2-row">
              {rv.amenities.map((am, index) => (
                <p key={index}>{am} </p>
              ))}
            </div>

            <div className="under-line-head">
              <p className="sub-title">Add Ons</p>
            </div>
            <div id="addons" className="grid-2-row">
              {rv.addons.map((add, index) => (
                <p key={index}>{add} </p>
              ))}
            </div>
          </div>
          <div className="book-info-box desktop-none">
            <div className="book-box">
              <div className="booking-rate-box">
                <p>
                  <span className="rv-price">
                    $
                    <span id="day" className="rv-price day-rate-top">
                      {rv.rate.day}
                    </span>
                    /Day
                  </span>{" "}
                  starting
                  <br />
                  <span className="wm-rate wm-rate-top">
                    ${rv.rate.week} /Week | ${rv.rate.month} /Month
                  </span>
                </p>
              </div>
              <div className="booking-info">
                <p className="sub-title">For Booking</p>
                <p>Email:</p>
                <p>inquire@simplylivingrentals.com</p>
                <p>Text or Call</p>
                <p>(713) 364-4497</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="vh100-box">
        <div className="flex-center">
          <div className="big-quote">
            <h2>Related Rentals</h2>
            <section className="box-container">
              <ul className="box-container ">
                {rvs.map((list) => {
                  return (
                    <li key={list.id}>
                      <RentalCard item={list} />
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <div className="vh100-box">
        <div className="flex-center">
          <div className="big-quote padding-small">
            <h2>Book Your Next Stay With SLR</h2>
            <p className="p-quote">Email:</p>
            <p className="book-email" style={{ marginBottom: "30px" }}>
              inquire@simplylivingrentals.com
            </p>
            <p></p>
            <p className="p-quote">Call or Text:</p>
            <p style={{ fontSize: "36px", marginBottom: "30px" }}>
              {" "}
              (713) 364-4497
            </p>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default ViewRental;
