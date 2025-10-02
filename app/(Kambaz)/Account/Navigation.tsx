import { NavLink } from "react-bootstrap";
export default function AccountNavigation() {
 return (
   <div id="wd-account-navigation" className="wd list-group fs-6 rounded-0">
     <NavLink href="Signin" className="active list-group-item border-0"> Signin </NavLink> <br />
     <NavLink href="Signup" className="text-danger list-group-item border-0"> Signup </NavLink> <br />
     <NavLink href="Profile" className="text-danger list-group-item border-0"> Profile </NavLink> <br />
   </div>
);}
