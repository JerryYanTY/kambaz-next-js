import Link from "next/link";
export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Tianyuan Yan&apos;s Labs and Final Project (Section 05)</h1>
      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab4" id="wd-lab4-link">
            Lab 4: State Management
          </Link>
        </li>        
        <li>
          <Link href="/Labs/Lab5" id="wd-lab5-link">
            Lab 5: Restful
          </Link>
        </li>
        <li>
          <Link href="/Account/Signin" id="wd-kambaz-link">
            Kambaz
          </Link>
        </li>
        <li>
          <Link href="https://github.com/JerryYanTY/kambaz-next-js/tree/Final(quiz)" id = "wd-github-link">
          Tianyuan Yan&apos;s Github for Final Project
          </Link>
        </li>
        <li>
          <Link href="https://github.com/JerryYanTY/kambaz-node-server-app/tree/Final(Quiz)" id = "wd-github-link">
          Tianyuan Yan&apos;s Github (Server) for Final Project
          </Link>
        </li>
      </ul>
    </div>
  );
}
