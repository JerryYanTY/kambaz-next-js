import { createSlice } from "@reduxjs/toolkit";

export type Assignment = Record<string, any>;

type AssignmentsState = {
    assignments: Assignment[];
};

const initialState: AssignmentsState ={
    assignments: [],
}

const assignmentsSlice = createSlice({
    name:"assignments",
    initialState,
    reducers: {
        setAssignments: (state, { payload }) => {
            state.assignments = payload as Assignment[];
        },
        addAssignment: (state, {payload: assignment})=> {
            state.assignments = [...state.assignments, assignment] as Assignment[];
        },

        deleteAssignment: (state, { payload: assignmentId}) => {
            state.assignments = state.assignments.filter(
                (a:any) => a._id !== assignmentId
            );
        },

        updateAssignment: (state, { payload: assignment}) => {
            state.assignments = state.assignments.map((a:any)=>
            a._id === assignment._id? assignment : a
        )as Assignment[];
        },

    },
});

export const {
    setAssignments,
    addAssignment,
    deleteAssignment,
    updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
