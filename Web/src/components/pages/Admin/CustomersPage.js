import {withRole} from "../../../utils/hoc/withAuth";


export const CustomersPage = withRole("Admin")(() => <div>CustomerPage</div>)