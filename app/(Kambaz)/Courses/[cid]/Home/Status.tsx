import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoBarChartSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdHomeFilled } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdOutlinePlayCircle } from "react-icons/md";

import Button from "react-bootstrap/Button";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{width:"350px"}}>
      <h2>Course Status</h2>
      <div className="w-50 pe-1">
         <Button variant="secondary" size="lg" className="w-100 text-nowrap ">
           <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </Button> </div>
       <div className="w-50">
         <Button variant="success" size="lg" className="w-100">
           <FaCheckCircle className="me-2 fs-5" /> Publish </Button> </div>
     <br />
     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <BiImport className="me-2 fs-5" /> Import Existing Content </Button>
     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </Button>
       <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <MdHomeFilled className="me-2 fs-5" /> Choose Home Page </Button>
       <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <MdOutlinePlayCircle className="me-2 fs-5" /> View Course Stream </Button>
       <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <TfiAnnouncement className="me-2 fs-5" /> New Announcement </Button>
       <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <IoBarChartSharp className="me-2 fs-5" /> New Analystics </Button>
       <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <IoMdNotificationsOutline className="me-2 fs-5" /> View Course Notifications </Button>
    </div> );}