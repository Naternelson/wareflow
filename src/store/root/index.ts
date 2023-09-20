import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StrUtil } from "../../utiltity";
import { AppState } from "../store";

interface RootState {
	organizationId: string | null;
	organizationName: string;
	siteName: string;
}

const initialState: RootState = {
	organizationId: null,
	organizationName: "Ogden Custom Solutions",
	siteName: "WareFlow",
};

const reducers = {
	updateOrganization: (state: RootState, action: PayloadAction<{ id?: string | null; name?: string }>) => {
		const { id, name } = action.payload;
		if (id !== undefined) state.organizationId = id;
		if (name) state.organizationName = StrUtil.sanitize(name);
	},
};

const slice = createSlice({
	name: "root",
	initialState,
	reducers,
});

export const { updateOrganization } = slice.actions;
export default slice.reducer;


export const selectOrganizationId = (state: AppState) => state.root.organizationId;
export const selectOrganizationName = (state: AppState) => state.root.organizationName;
export const selectSiteName = (state: AppState) => state.root.siteName;
