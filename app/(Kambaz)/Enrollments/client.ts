import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findEnrollmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/enrollments`
  );
  return data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/enrollments`
  );
  return data;
};

export const findMyEnrollments = async () => findEnrollmentsForUser("current");

export const enrollInCourse = async (
  courseId: string,
  userId?: string
) => {
  const payload = userId ? { userId } : {};
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/enrollments`,
    payload
  );
  return data;
};

export const unenrollFromCourse = async (courseId: string, userId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/enrollments/${userId}`
  );
  return data;
};
