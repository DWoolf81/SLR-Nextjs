import { createId, makeid } from '../admin_actions';

export const payment_create_action = async (formData) => {
    // const renters = await Renter.find( {rid: "9999" })
  
    //const last = renters.pop()
  
    const pid = createId(10, "number");
  /*
  
    const res = Payment.create({
      pid: pid,
      rvid: formData.get('rvid'), // Rental ID
      rid: formData("rid"), // Renters ID
      date: formData.get("date"),
      location: {
        address: formData.get("address"),
        city: formData.get("city"),
        state: formData.get("state"),
      },
      dob: formData.get("dob"),
      phone: formData.get("phone"),
      dl: formData.get("dl"),
    });
    */
  
    console.log("This is a server action payment creation test", formData.get("renter"));
  
    return { test: "Good" };
  };
  
  