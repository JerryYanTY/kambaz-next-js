"use client";
import { FormControl, FormSelect } from "react-bootstrap";
import Link from "next/link";
import * as client from "../client";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { setCurrentUser } from "../reducer";

export default function Signup() {
  const [user, setUser] = useState<any>({ role: "STUDENT" });
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/Account/Profile");
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username b-2"
        placeholder="username"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="password"
        type="password"
      />
      <FormSelect
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        className="mb-2"
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
      </FormSelect>
      <Button
        onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100"
      >
        Sign up
      </Button>
      <br />
      <Link href="/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
