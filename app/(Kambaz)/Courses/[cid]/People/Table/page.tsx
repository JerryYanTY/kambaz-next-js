"use client";
import { useParams } from "next/navigation";
import { Table, FormControl, Row, Col, Button, FormSelect } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import * as usersClient from "../../../../Users/client";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

const emptyUser = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  email: "",
  role: "STUDENT",
  loginId: "",
  section: "",
};

export default function PeopleTable() {
  const { cid } = useParams();
  const currentUser = useSelector((s: RootState) => s.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const [people, setPeople] = useState<any[]>([]);
  const [draft, setDraft] = useState<any>(emptyUser);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadPeople = async () => {
    if (!cid) return;
    const data = await usersClient.findUsersForCourse(cid as string);
    setPeople(data);
  };

  const resetDraft = () => {
    setDraft(emptyUser);
    setEditingId(null);
  };

  const onSave = async () => {
    if (!cid) return;
    if (editingId) {
      const updated = await usersClient.updateUser({ ...draft, _id: editingId });
      setPeople(people.map((p) => (p._id === editingId ? updated : p)));
    } else {
      const created = await usersClient.createUserForCourse(cid as string, draft);
      setPeople([...people, created]);
    }
    resetDraft();
  };

  const onDelete = async (userId: string) => {
    await usersClient.deleteUser(userId);
    setPeople(people.filter((p) => p._id !== userId));
    if (editingId === userId) resetDraft();
  };

  useEffect(() => {
    loadPeople();
  }, [cid]);

  return (
    <div id="wd-people-table">
      {isFaculty && (
        <div className="mb-3 p-3 border rounded">
          <h5 className="mb-3">{editingId ? "Edit User" : "Add User"}</h5>
          <Row className="mb-2">
            <Col>
              <FormControl
                placeholder="First Name"
                value={draft.firstName}
                onChange={(e) => setDraft({ ...draft, firstName: e.target.value })}
              />
            </Col>
            <Col>
              <FormControl
                placeholder="Last Name"
                value={draft.lastName}
                onChange={(e) => setDraft({ ...draft, lastName: e.target.value })}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <FormControl
                placeholder="Username"
                value={draft.username}
                onChange={(e) => setDraft({ ...draft, username: e.target.value })}
              />
            </Col>
            <Col>
              <FormControl
                placeholder="Password"
                type="password"
                value={draft.password}
                onChange={(e) => setDraft({ ...draft, password: e.target.value })}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <FormControl
                placeholder="Email"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
              />
            </Col>
            <Col>
              <FormControl
                placeholder="Login ID"
                value={draft.loginId}
                onChange={(e) => setDraft({ ...draft, loginId: e.target.value })}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <FormControl
                placeholder="Section"
                value={draft.section}
                onChange={(e) => setDraft({ ...draft, section: e.target.value })}
              />
            </Col>
            <Col>
              <FormSelect
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
              >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="TA">TA</option>
                <option value="ADMIN">Admin</option>
              </FormSelect>
            </Col>
          </Row>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={onSave}>
              {editingId ? "Update User" : "Add User"}
            </Button>
            {editingId && (
              <Button variant="secondary" onClick={resetDraft}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Email</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {people.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-email">{user.email}</td>
              {isFaculty && (
                <td className="text-nowrap">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    className="me-2"
                    onClick={() => {
                      setDraft({ ...user, password: user.password ?? "" });
                      setEditingId(user._id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => onDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
