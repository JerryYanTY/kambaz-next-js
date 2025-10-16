"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaLaptopCode } from "react-icons/fa";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";

import Link from "next/link";

export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: FaLaptopCode },
  ];
  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 115 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/Account"
        className={`text-center border-0 bg-black
${
  pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"
}`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            pathname.includes("Account") ? "text-danger" : "text-white"
          }`}
        />
        <br />
        Account
      </ListGroupItem>
      {links.map((link) => (
        <ListGroupItem
          key={link.path}
          as={Link}
          href={link.path}
          className={`bg-black text-center border-0
${
  pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"
}`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </ListGroupItem>
      ))}

      {/* <ListGroupItem className="bg-white border-0 text-center">
        <Link
          href="/Dashboard"
          id="wd-dashboard-link"
          className="text-danger text-decoration-none"
        >
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black border-0 text-center">
        <Link
          href="/Dashboard"
          id="wd-course-link"
          className="text-white text-decoration-none"
        >
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black border-0 text-center">
        <Link
          href="/Calendar"
          id="wd-calendar-link"
          className="text-white text-decoration-none"
        >
          <IoCalendarOutline className="fs-1 text-danger" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black border-0 text-center">
        <Link
          href="/Inbox"
          id="wd-inbox-link"
          className="text-white text-decoration-none"
        >
          <FaInbox className="fs-1 text-danger" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black border-0 text-center">
        <Link
          href="/Labs"
          id="wd-labs-link"
          className="text-white text-decoration-none"
        >
          <FaLaptopCode className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </ListGroupItem> */}
    </ListGroup>
  );
}
