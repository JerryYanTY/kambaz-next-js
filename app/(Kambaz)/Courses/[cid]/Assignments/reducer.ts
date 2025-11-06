import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    assignments: assignments,
}

const assignmentsSlice = createSlice({
    name:"assignments",
    initialState,
    reducers: {
        addAssignment: (state, {payload: assignment})=> {
            const newAssignment: any = {
                _id: uuidv4(),
                title: assignment.title,
                course: assignment.course,
                points: assignment.points ?? 0,
                published: assignment.published ?? false,
                available_from: assignment.available_from ?? null,
                due: assignment.due ?? null,
                available_until: assignment.available_until ?? null,
                online_or_paper: assignment.online_or_paper ?? "online",
                submission_types: assignment.submission_types ?? ["online_upload"],
                assign_to: assignment.assign_to ?? "everyone",
                description: assignment.description ?? "",
                grading_type: assignment.grading_type ?? "points",
                modules: assignment.modules ?? "", 
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },

        deleteAssignment: (state, { payload: assignmentId}) => {
            state.assignments = state.assignments.filter(
                (a:any) => a._id !== assignmentId
            );
        },

        updateAssignment: (state, { payload: assignment}) => {
            state.assignments = state.assignments.map((a:any)=>
            a._id === assignment._id? assignment : a
        )as any;
        },

    },
});

export const {
    addAssignment,
    deleteAssignment,
    updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;