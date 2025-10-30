"use client";

import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";


export default function lab4() {
    function sayHello() {
        alert("Hello");
    }
    return (
        <div id="wd-lab4">
            <h2>Lab 4</h2>
            <ClickEvent/>
            <PassingDataOnEvent/>
            <PassingFunctions theFunction={sayHello}/>
            <EventObject/>
            <Counter/>
        </div>
    ) ;
}