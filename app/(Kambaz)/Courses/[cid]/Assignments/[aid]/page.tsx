import { redirect } from "next/navigation";


export default async function CoursesPage({ params }: { params: {cid: any; aid:any} }) {
 const { cid, aid } = params;
 redirect(`/Courses/${cid}/Assignments/${aid}/Editor`);
}
