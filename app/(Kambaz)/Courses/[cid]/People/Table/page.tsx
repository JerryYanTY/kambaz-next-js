"use client";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
    const {cid}  = useParams();
    const users = db.users;
    const enrollments = db.enrollments;
    return (
  <div id="wd-people-table">
   <Table striped>
    <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
        {users
        .filter((usr) =>
        enrollments.some((enrollment) =>enrollment.user === usr._id &&
        enrollment.course === cid)
        )
        .map((user: any) => (
            <tr key = {user._id}>
                <td className="wd-full-name text-nowrap">
                    <FaUserCircle className="me-2 fs-1 text-secondary"/>
                    <span className="wd-first-name">{user.firstName}</span>
                    <span className="wd-last-name">{user.lastName}</span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
        ))}
     {/* <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Tony</span>{" "}
          <span className="wd-last-name">Stark</span></td>
      <td className="wd-login-id">001234561S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-01</td>
      <td className="wd-total-activity">10:21:32</td></tr>
      <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Jason</span>{" "}
          <span className="wd-last-name">Bourne</span></td>
      <td className="wd-login-id">020166655M</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2025-4-1</td>
      <td className="wd-total-activity">22:21:32</td></tr>
      <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Harry</span>{" "}
          <span className="wd-last-name">Potter</span></td>
      <td className="wd-login-id">743555608S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2024-12-01</td>
      <td className="wd-total-activity">00:21:32</td></tr>
      <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Barry</span>{" "}
          <span className="wd-last-name">Allen</span></td>
      <td className="wd-login-id">000000000M</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2025-10-01</td>
      <td className="wd-total-activity">00:00:01</td></tr> */}
    </tbody>
   </Table>
  </div> );}