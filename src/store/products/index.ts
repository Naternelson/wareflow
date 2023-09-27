import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { normalizedData } from "../../views/products/overview/mockdata";
const isDevelopment = process.env.NODE_ENV === "development";

interface GroupAttributes {
	id: string;
	name: string;
	description: string;
	primaryCustomerName: string;
	primaryCustomerId: string;
	productVariants: string[]; // variantID
	productProperties: string[]; // Properties IDs
}
interface VariantAttributes {
	id: string;
	name: string;
	description: string;
	productId: string;
    images: string[]; // Image IDs
	properties: {
		[propertyID: string]: string; // Give the value for this property
	};
}
interface PropertyAttributes {
	id: string;
	name: string;
	options?: string[];
	type: "unique-text" | "text" | "pick-from-list" | "file";
	defaultValue: string;
}

export interface ProductSlice {
	groups: {
		byId: {
			[id: string]: GroupAttributes;
		};
		allIds: string[];
	};
	variants: {
		byId: {
			[id: string]: VariantAttributes;
		};
		allIds: string[];
	};
	properties: {
		byId: {
			[id: string]: PropertyAttributes;
		};
		allIds: string[];
	};
}

const initialState: ProductSlice = isDevelopment ? normalizedData : {
	groups: {
		byId: {},
		allIds: [],
	},
	variants: {
		byId: {},
		allIds: [],
	},
	properties: {
		byId: {},
		allIds: [],
	},
};

const reducers = {
	// For Groups
	upsertGroups: (state: ProductSlice, action: PayloadAction<GroupAttributes | GroupAttributes[]>) => {
		const groups = Array.isArray(action.payload) ? action.payload : [action.payload];
		groups.forEach((group) => {
			state.groups.byId[group.id] = group;
			if (!state.groups.allIds.includes(group.id)) {
				state.groups.allIds.push(group.id);
			}
		});
	},
	deleteGroup: (state: ProductSlice, action: PayloadAction<string>) => {
		const productId = action.payload;
		delete state.groups.byId[productId];
		state.groups.allIds = state.groups.allIds.filter((id) => id !== productId);
	},

	// For Variants
	upsertVariants: (state: ProductSlice, action: PayloadAction<VariantAttributes | VariantAttributes[]>) => {
		const variants = Array.isArray(action.payload) ? action.payload : [action.payload];
		variants.forEach((variant) => {
			state.variants.byId[variant.id] = variant;
			if (!state.variants.allIds.includes(variant.id)) {
				state.variants.allIds.push(variant.id);
			}
		});
	},
	deleteVariant: (state: ProductSlice, action: PayloadAction<string>) => {
		const variantId = action.payload;
		delete state.variants.byId[variantId];
		state.variants.allIds = state.variants.allIds.filter((id) => id !== variantId);
	},

	// For Properties
	upsertProperties: (state: ProductSlice, action: PayloadAction<PropertyAttributes | PropertyAttributes[]>) => {
		const properties = Array.isArray(action.payload) ? action.payload : [action.payload];
		properties.forEach((property) => {
			state.properties.byId[property.id] = property;
			if (!state.properties.allIds.includes(property.id)) {
				state.properties.allIds.push(property.id);
			}
		});
	},
	deleteProperty: (state: ProductSlice, action: PayloadAction<string>) => {
		const propertyId = action.payload;
		delete state.properties.byId[propertyId];
		state.properties.allIds = state.properties.allIds.filter((id) => id !== propertyId);
	},
};

const slice = createSlice({
	name: "products",
	initialState,
	reducers,
});

export default slice.reducer;
export const { upsertGroups, deleteGroup, upsertVariants, deleteVariant, upsertProperties, deleteProperty } =
	slice.actions;

export const selectGroups = (state: AppState) => state.products.groups.byId;
export const selectGroupById = (id:string) => (state: AppState) => state.products.groups.byId[id];
export const selectVariants = (state: AppState) => state.products.variants.byId;
export const selectVariantById = (id:string) => (state: AppState) => state.products.variants.byId[id];
export const selectProperties = (state: AppState) => state.products.properties.byId;
export const selectPropertyById = (id:string) => (state: AppState) => state.products.properties.byId[id];
