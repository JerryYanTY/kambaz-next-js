import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {CardBody, CardImg,CardText, CardTitle, Card} from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4 gy-4">
        <Col className="wd-dashboard-course" style={{width:"300px"}}>
        <Card>
          <Link href="/Courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS1234 React JS</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                Full Stack software developer
              </CardText>
              <Button variant="primary"> Go </Button>
              </CardBody>
          </Link>
          </Card>
        </Col>
        
        <Col className="wd-dashboard-course" style={{width:"300px"}}>
        <Card>
          <Link href="/Courses/4000" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/python.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4000 Python</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}} >
                Intro to Python
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
          </Col>
        
        <Col className="wd-dashboard-course" style={{width:"300px"}}>
          <Card>
          <Link href="/Courses/4001" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cpp.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4001 C++</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}} >
                Intro to CPP
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
        </Col>


        <Col className="wd-dashboard-course" style={{width:"300px"}}>
          <Card>
          <Link href="/Courses/4002" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cs.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4002 C#</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}} >
                Intro to C#
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
        </Col>


        <Col className="wd-dashboard-course" style={{width:"300px"}}>
        <Card>
          <Link href="/Courses/4003" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/java.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4003 Java</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}} >
                Intro to Java
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{width:"300px"}}>
        <Card>
          <Link href="/Courses/4004" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/ruby.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4004 Ruby</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}} >
                Intro to Ruby
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
        </Col>


        <Col className="wd-dashboard-course" style={{width:"300px"}}>
        <Card>
          <Link href="/Courses/4005" className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/swift.jpg" width="100%" height={160} />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> CS4005 swift</CardTitle>
              <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                Intro to swift
              </CardText>
              <Button variant="primary"> Go </Button>
            </CardBody>
          </Link>
          </Card>
        </Col>
        </Row>
      </div>
    </div>
);}
