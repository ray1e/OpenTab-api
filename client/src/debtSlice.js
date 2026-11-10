import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    debts: [],
}

const debtSlice = createSlice({
    name: "debts",
    initialState,
    reducers: {
        addDebt: (state, action) => {
            state.debts.push(action.payload);
        }
    }
})

export const {addDebt} = debtSlice.actions();
export default debtSlice.reducer;