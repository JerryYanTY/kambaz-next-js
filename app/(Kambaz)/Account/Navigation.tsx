"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function AccountNavigation() {
 const {currentUser} = useSelector((state: RootState) => state.accountReducer);
 const links = currentUser
   ? [{ href: "Profile", label: "Profile" }]
   : [
       { href: "Signin", label: "Signin" },
       { href: "Signup", label: "Signup" },
     ];
 const pathname = usePathname(); 
 return (
  <Nav variant="pills">
  {links.map((link) => (
    <NavItem key={link.href}>
      <NavLink
        as={Link}
        href={link.href}
        active={pathname.toLowerCase().endsWith(link.href.toLowerCase())}
      >
        {link.label} </NavLink> </NavItem>
  ))}
       {currentUser && currentUser.role === "ADMIN" && (
       <NavLink as={Link} href={`/Account/Users`}  active={pathname.endsWith('Users')}> Users </NavLink> )}
</Nav>
);}
