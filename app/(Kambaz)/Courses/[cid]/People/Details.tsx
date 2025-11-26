import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../Account/client";
import { FormControl, Button, FormSelect } from "react-bootstrap";

type Props = { uid: string | null; onClose: () => void };

export default function PeopleDetails({ uid, onClose }: Props) {
  const [user, setUser] = useState<any>({});
  const [draft, setDraft] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const fetched = await client.findUserById(uid);
    setUser(fetched);
    setDraft(fetched);
  };

  const onSave = async () => {
    if (!draft?._id) return;
    setSaving(true);
    const updated = await client.updateUser(draft);
    setUser(updated);
    setDraft(updated);
    setSaving(false);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
        aria-label="Close"
      >
        <IoCloseSharp className="fs-1" />{" "}
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="mb-2">
        <FormControl
          className="mb-2"
          placeholder="First Name"
          value={draft?.firstName ?? ""}
          onChange={(e) => setDraft({ ...draft, firstName: e.target.value })}
        />
        <FormControl
          className="mb-2"
          placeholder="Last Name"
          value={draft?.lastName ?? ""}
          onChange={(e) => setDraft({ ...draft, lastName: e.target.value })}
        />
        <FormControl
          className="mb-2"
          placeholder="Email"
          value={draft?.email ?? ""}
          onChange={(e) => setDraft({ ...draft, email: e.target.value })}
        />
        <FormControl
          className="mb-2"
          placeholder="Login ID"
          value={draft?.loginId ?? ""}
          onChange={(e) => setDraft({ ...draft, loginId: e.target.value })}
        />
        <FormControl
          className="mb-2"
          placeholder="Section"
          value={draft?.section ?? ""}
          onChange={(e) => setDraft({ ...draft, section: e.target.value })}
        />
        <FormSelect
          className="mb-3"
          value={draft?.role ?? "STUDENT"}
          onChange={(e) => setDraft({ ...draft, role: e.target.value })}
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          <option value="TA">TA</option>
          <option value="ADMIN">Admin</option>
        </FormSelect>
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            onClick={onSave}
            disabled={saving}
            aria-label="Save user changes"
          >
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button variant="secondary" onClick={fetchUser} disabled={saving}>
            Reset
          </Button>
        </div>
      </div>
      <div className="text-danger fs-5 mt-3">
        {user.firstName} {user.lastName}
      </div>
      <b>Roles:</b> <span className="wd-roles">{user.role}</span> <br />
      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
      <b>Email:</b> <span className="wd-email">{user.email}</span> <br />
    </div>
  );
}

