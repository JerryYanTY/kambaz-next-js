"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem,NavLink } from "react-bootstrap";
export default function TOC() {
  const pathname = usePathname();
 return (
  <Nav variant="pills">
  <NavItem>
    <NavLink href="/Labs" as={Link} className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>
      Home </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="/Labs/Lab1" as={Link} className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}>
      Lab 1 </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="/Labs/Lab2" as={Link} className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}>
      Lab 2 </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="/Labs/Lab3" as={Link}  className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}>
      Lab 3 </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="/Labs/Lab4" as={Link}  className={`nav-link ${pathname.endsWith("Lab4") ? "active" : ""}`}>
      Lab 4 </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="/Labs/Lab5" as={Link}  className={`nav-link ${pathname.endsWith("Lab5") ? "active" : ""}`}>
      Lab 5 </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="/" as={Link}>
      Kambaz </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="https://github.com/JerryYanTY/kambaz-next-js/tree/a5" as={Link}>
      My kambaz-next-js Github </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="https://github.com/JerryYanTY/kambaz-node-server-app/tree/a5" as={Link}>
      My kambaz-node-server Github </NavLink>
  </NavItem>
</Nav>
   
);}
