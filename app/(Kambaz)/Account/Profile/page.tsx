import { FormSelect, FormControl } from "react-bootstrap";
import Link from "next/link";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        className="mb-2" />
      <FormControl
        id="wd-password"
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2" />
      <FormControl
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="mb-2" />
      <FormControl
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="mb-2" />
      <FormControl
        defaultValue="2000-01-01"
        type="date"
        id="wd-dob"
        className="mb-2" />
      <FormControl
        defaultValue="alice@wonderland.com"
        type="email"
        id="wd-email"
        className="mb-2" />
      <FormSelect defaultValue="STUDENT" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Link href="Signin" id="wd-signin-link" className="btn btn-primary w-100 mb-2"> Sign out </Link>
    </div>
  );
}
