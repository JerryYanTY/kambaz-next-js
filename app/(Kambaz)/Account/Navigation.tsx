"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function AccountNavigation() {
 const {currentUser} = useSelector((state: RootState) => state.accountReducer);
 const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
 const pathname = usePathname(); 
 return (
  <Nav variant="pills">
  {links.map((link) => (
    <NavItem key={link}>
      <NavLink as={Link} href={link} active={pathname.endsWith(link.toLowerCase())}>
        {link} </NavLink> </NavItem>
  ))}
</Nav>
);}
