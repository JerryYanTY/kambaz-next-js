export default function Modules() {
  return (
    <div>
      <div id="Top buttons">
        <button>Collapse All</button>
        <button>View Progress</button>
        <select id="Action-select">
          <option value="Publish">Publish All</option>
          <option value="Unpublish">Unpublish</option>
        </select>
        <button>Add Module</button>
      </div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to CSS</li>
                <li className="wd-content-item">The box model - styling margins, borders, and paddings</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">CSS Libraries: Bootstrap, Tailwind</li>
                <li className="wd-content-item">Float and grid systems</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
);}
