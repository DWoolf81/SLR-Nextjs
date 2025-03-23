import "../css/account.css";
import Link from "next/link";
import Image from "next/image";
import { findUserFromSession, getRv } from "@/lib/actions";
import Rentingheader from "@/components/account/rentingheader";
//import { createContext } from "react";

const AcountLayout = async ({ children }) => {
  const renter = await findUserFromSession();


//const Renter = createContext (null)

const [ renterInfo, setRenterinfo] = useState(renter)


   

  let toda = false

  if (!renter) {
    toda = true;

    let rv = false;

    if (renter.renting) rv = await getRv(renter.renting.rv);

    let rate = renter.renting.rate;
  }

  return (
    <>
      <div className="max-wid-1024 flex-dir-column">
        {toda && <Rentingheader rv={rv} renter={renter} />}
        
        <div className="acct-main-box">

            {children}
          
          </div>
      </div>
    </>
  );
};

export default AcountLayout;
