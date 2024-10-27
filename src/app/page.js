import Image from "next/image";
import bg from "../../public/assets/shutterstock_758389312-1.jpg";
import { RentalCard } from "../components/rentalcard";
import connectToDatabase from "@/lib/mongoose";
import Camper from "@/models/campers";
import Renter from "@/models/renters";
import { cookies } from "next/headers";

export default async function Home() {
  const bgStyles = {
    background: `rgba(0, 0, 0, 0.5) url(${bg.src}) center center no-repeat`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    top: "0",
    left: "0",
    transition: "all 0.3s ease-in-out",
    color: "white",
  };


  await connectToDatabase()

   const res = await fetch("http://localhost:3000/api/")

   const data = await Camper.find();
   const renter = await Renter.findOne({email: "darrellwoolfolk@outlooks.com"})

   //console.log(renter.name, await res.json())
   //console.log( res.name)

   

   

   // data.map(list => console.log("This is the camper name and length", list.nam, list.length) )


  return (
    <main>
      <div>
        <div className="main-search vh100-box" style={bgStyles}>
          <div className="main-info">
            <div className="top-info">
              <div className="big-logo">
                <Image
                  src="/assets/logo/_30fbfd25-0a21-4bc2-85d1-019c27385bf6-transparent.png"
                  width={0}
                  height={0}
                  alt="Simply Living Logo"
                  sizes="100vw"
                  style={{ width: "50%", height: "auto" }}
                />
              </div>
              <h1>
                Welcome to 
                <span className="mobile-block">Simply Living Rentals</span>
              </h1>

              <p>Enjoy freestyle living made simple</p>
              <h2></h2>
            </div>
            
          </div>
          <div id="dynamicContentBox"></div>
        </div>
        <div className="vh100-box">
          <div className="flex-center">
            <div className="big-quote">
              <h2>A better stay is waiting</h2>
              <div className="padding-small">
                <p className="p-quote">
                  Are you looking for a unique and comfortable way to when
                  you're travelling for work or pleasure? Look no further than
                  RV rentals! With RV rentals, you can enjoy the freedom of
                  privacy while still having all the amenities of a hotel. Our
                  RVs come equipped with everything you need for a comfortable
                  stay, including a bed, bathroom, kitchen, and more. RV rentals
                  are the perfect way to experience the world in comfort and
                  style. So why wait? Book your RV rental today and start your
                  adventure
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="vh100-box rv-river-bg text-white">
          <div className="flex-center" style={{ backgroundColor: "#38492ed1" }}>
            <div className="big-quote">
              <h2 className="text-white text-green-shadow">
                Enjoy the great outdoors
              </h2>
              <p className="p-quote" style={{ padding: "10%" }}>
                We set up our campers at a location closes to your work so you
                can sleep more and come home sooner
                <br />
                In the future, SLR will have multiple camp grounds for your
                convenient ranging from small site for ultimate for privacy to
                large and spacious for hanging out with friends and other
                coworkers.
              </p>
            </div>
          </div>
        </div>

        <div className="vh100-box">
          <div className="flex-center">
            <div className="big-quote">
            <h2>Find A Camper</h2>
            <section className="flex-direction-mobile">
              <ul className="box-container ">
              { data.map(list => {
                return <li key={list.id}><RentalCard item={list} /></li>
              })}
              </ul>
            </section>
          </div>
        </div>
      </div>
      <div className="vh100-box">
        <div
          className="flex-center"
          style={{
            position: "absolute",
            width: "100%",
            background: "rgb(56 73 46 / 85%)",
            color: "white"
          }}
        >
        
          <p className="p-quote" style={{ padding: "10%" }}>
            We set up our campers at a location closes to your work so you can
            sleep more and come home sooner<br />In the future, SLR will have
            multiple camp grounds for your convenient ranging from small site
            for ultimate for privacy to large and spacious for hanging out with
            friends and other coworkers.
          </p>
        </div>
        <div className="flex-center" style={{ height: "100vh" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d55245.9997421382!2d-93.7857228825583!3d30.069117781493233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1srv%20parks%20in%20orange%20tx!5e0!3m2!1sen!2sus!4v1703286546547!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="vh100-box">
        <div className="flex-center">
          <div className="big-quote padding-small">
            <h2>We take care of everything for you</h2>
            <p className="p-quote">
              If you are looking for a hassle-free way to stay in comfort and
              style, you should consider renting a RV from our company. We offer
              a wide range of RVs to suit your needs and preferences, from cozy
              trailers to spacious motorhomes. And the best part is, you don't
              have to worry about any fees associated with the rental, because
              we handle everything for you. That means no hidden charges, no
              maintenance costs, no insurance fees, and no cleaning fees. You
              just pay a flat rate per day, week or month and enjoy your stay.
              We take care of the rest. Contact us today to book your RV rental
              and start your adventure
            </p>
          </div>
        </div>
      </div>


      <div className="vh100-box">
        <div className="flex-center">
          <div className="big-quote padding-small">
            <h2>Book Your Next Stay With SLR</h2>
            <p className="p-quote">Email:</p>
            <p className="book-email" style={{ marginBottom: "30px" }}>inquire@simplylivingrentals.com</p>
            <p></p>
            <p className="p-quote">Call or Text:</p><p style={{ fontSize: "36px", marginBottom: "30px" }}> (713) 364-4497</p>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
