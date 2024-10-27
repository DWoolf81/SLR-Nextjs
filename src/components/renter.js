const { findUserFromSession } = require("@/lib/actions")

const Renter = async () => {

    const renter = await findUserFromSession()


    return renter
}

export default Renter