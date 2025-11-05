"use client";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";

export default function AccountPage() {
const {currentUser} = useSelector((state:RootState) => state.accountReducer);
if (!currentUser){
 redirect("/Account/Signin");
} else {
    redirect("/Account/Profile");
}
}
