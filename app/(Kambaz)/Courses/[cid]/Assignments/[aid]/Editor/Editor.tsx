export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h2>
        <label htmlFor="wd-name">Assignment Name</label>
      </h2>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <label htmlFor="wd-description">Description</label>
      <br />
      <textarea
        id="wd-description"
        defaultValue="The assignment is available online Submit a link to the landing page of"
        cols={30}
        rows={20}
      ></textarea>
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} type="number" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="Assignment">Assignment</option>
                <option value="Exam">Exam</option>
                <option value="Quiz">Quiz</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="Points">Points</option>
                <option value="Percentage">Percentage</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="Online">Online</option>
                <option value="Paper-Copy">Paper Copy</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
              <input
                id="wd-assign-to"
                type="string"
                defaultValue="Everyone"
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input type="date" defaultValue="2025-09-18" id="wd-due-date" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td>
              <input
                type="date"
                defaultValue="2025-09-18"
                id="wd-available-from"
              />
            </td>
            <td>
              <label htmlFor="wd-available-until">Available Until</label>
            </td>

            <td>
              <input
                type="date"
                defaultValue="2025-09-18"
                id="wd-available-until"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ textAlign: "center" }}>Online Entry Options</p>
      <table align="center">
        <tbody>
          <tr>
            <td>
              <input type="checkbox" id="wd-text-entry" />
            </td>
            <td>
              <label htmlFor="wd-text-entry">Text Entry</label>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" id="wd-website-url" />
            </td>
            <td>
              <label htmlFor="wd-website-url">Website URL</label>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" id="wd-media-recordings" />
            </td>
            <td>
              <label htmlFor="wd-media-recordings">Media Recordings</label>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" id="wd-student-annotation" />
            </td>
            <td>
              <label htmlFor="wd-student-annotation">Student Annotation</label>
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" id="wd-file-upload" />
            </td>
            <td>
              <label htmlFor="wd-file-upload">File Upload</label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
