import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image alt="" src="/images/reactjs.jpg" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/4000" className="wd-dashboard-course-link">
            <Image alt="" src="/images/python.jpg" width={200} height={150} />
            <div>
              <h5> CS4000 Python</h5>
              <p className="wd-dashboard-course-title">
                Intro to Python
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/4001" className="wd-dashboard-course-link">
            <Image  alt="" src="/images/cpp.jpg" width={200} height={150} />
            <div>
              <h5> CS4001 C++</h5>
              <p className="wd-dashboard-course-title">
                Intro to CPP
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/4002" className="wd-dashboard-course-link">
            <Image alt="" src="/images/cs.jpg" width={200} height={150} />
            <div>
              <h5> CS4002 C#</h5>
              <p className="wd-dashboard-course-title">
                Intro to C#
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/4003" className="wd-dashboard-course-link">
            <Image alt="" src="/images/java.jpg" width={200} height={150} />
            <div>
              <h5> CS4003 Java</h5>
              <p className="wd-dashboard-course-title">
                Intro to Java
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/4004" className="wd-dashboard-course-link">
            <Image alt="" src="/images/ruby.jpg" width={200} height={150} />
            <div>
              <h5> CS4004 Ruby</h5>
              <p className="wd-dashboard-course-title">
                Intro to Ruby
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/4005" className="wd-dashboard-course-link">
            <Image alt="" src="/images/swift.jpg" width={200} height={150} />
            <div>
              <h5> CS4005 swift</h5>
              <p className="wd-dashboard-course-title">
                Intro to swift
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
