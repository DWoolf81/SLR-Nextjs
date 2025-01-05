import UpdateCamper from "@/components/admin/rentalforms/camper/update";
import UpdateContainer from "@/components/admin/rentalforms/container/update";
import UpdateHouse from "@/components/admin/rentalforms/house/update";
import { getRv } from "@/lib/actions";
import { getLocationList } from "@/lib/admin_actions"

const items = ['house', 'condo', "apartment", 'townhome']


const Page = async ({ params }) => {

    const rental = await getRv(params.rvid)

    console.log("what's the rental type", rental.type)

    const type = rental.type;


    const res = await getLocationList();

    const locations = JSON.parse(JSON.stringify(res))


    return  (
        <>
            { type  == 'camper' && <UpdateCamper locations={locations} rental={rental} type={"update"} /> }

            { type  == 'container' && <UpdateContainer locations={locations} rental={rental} type={"update"} /> }
            { items.includes(type) && <UpdateHouse locations={locations} rental={rental} type={"update"} item={type} /> }

        </>
    )

    
}

export default Page