import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import "./css/styles.css";
import "./globalicons.css";
import Menubtn from "@/components/menubtn";
import { getSession } from "@/lib/sessions";
import { findAmenityById } from "@/lib/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Simply Living Rentals",
  description: "Living in an RV is cool",
};

export default async function RootLayout({ children }) {
 
  let toad = "";
  let renter = false
  const session = await getSession();
  if (session) {
    renter = await findUserById(session.renter.id);
  }

   

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/icon/apple-touch-icon.png"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className={inter.className}>
        <div className="container">
          <div className="nav-bar">
            <div className="logo">
              <a className="home-link" href="#">
                <Image
                  src="/assets/logo/logo-transparent-small.png"
                  width={35}
                  height={35}
                  alt="Simply Living Logo"
                />
                <p className="logoText">Simply Living Rentals</p>
              </a>
            </div>

            <Menubtn renter={renter} />
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
