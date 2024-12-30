import UpdateCamper from "@/components/admin/rentalforms/camper/update";
import { getRv } from "@/lib/actions";
import { getLocationList } from "@/lib/admin_actions"

const Page = async ({ params }) => {

    const rental = await getRv(params.rvid)


    const res = await getLocationList();

    const locations = JSON.parse(JSON.stringify(res))


    return <UpdateCamper locations={locations} rental={rental} type={"update"} /> 
}

export default Page