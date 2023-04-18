import {withRole} from "../../hoc/withAuth";


export const CustomersPage = withRole("Admin")(() => <div>CustomerPage</div>)