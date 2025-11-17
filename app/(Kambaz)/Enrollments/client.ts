import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const findEnrollmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/enrollments`);
  return data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axios.get(`${USERS_API}/${userId}/enrollments`);
  return data;
};

export const enrollInCourse = async (
  courseId: string,
  userId?: string
) => {
  const payload = userId ? { userId } : {};
  const { data } = await axios.post(
    `${COURSES_API}/${courseId}/enrollments`,
    payload,
    { withCredentials: true }
  );
  return data;
};

export const unenrollFromCourse = async (courseId: string, userId: string) => {
  const { data } = await axios.delete(
    `${COURSES_API}/${courseId}/enrollments/${userId}`,
    { withCredentials: true }
  );
  return data;
};
