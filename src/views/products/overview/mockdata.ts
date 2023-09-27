import { ProductSlice } from "../../../store/products";

const mockData = {
	names: [
		"BelleX",
		"Mini Guardians",
		"Belle BTE",
		"Drink Mix 1",
		"Drink Mix 2",
		"Drink Mix 3",
		"Drink Mix 4",
		"Drink Mix 5",
	],
	getProductId: function (index: number) {
		return `PROD-${index}`;
	},
	getCustomerName: function (index: number) {
		return index < 3 ? "Freeus" : "Pharmachem";
	},
	getCustomerId: function (index: number) {
		return index < 3 ? "CUST-1" : "CUST-2";
	},
	getVariations: function (index: number) {
		return (index % 3) + 1;
	},
	createItems: function () {
		return mockData.names.map((name, index) => ({
			name,
			productId: mockData.getProductId(index),
			customerName: mockData.getCustomerName(index),
			customerId: mockData.getCustomerId(index),
			variations: mockData.getVariations(index),
		}));
	},
	createDetails: function (id: string) {
		const index = parseInt(id.split("-")[1]);
		if (isNaN(index)) return null;
		return {
			name: mockData.names[index],
			productId: mockData.getProductId(index),
			customerId: mockData.getCustomerId(index),
			customerName: mockData.getCustomerName(index),
			variationCount: mockData.getVariations(index),
			variations: Array.from({ length: mockData.getVariations(index) }, (_, i) => ({
				id: `${id}-VAR-${i}`,
				name: `${mockData.names[index]} Variation ${i + 1}`,
				sku: `${id}-VAR-${i}`,
				description: `This is a description for ${mockData.names[index]} Variation ${i + 1}`,
				color: i % 2 === 0 ? "red" : "blue",
				binSize: 24,
				instructions: "Filename",
			})),
		};
	},
};

export const productItems = mockData.createItems();
export const mockDetails = mockData.createDetails


function normalizeMockData() {
	const groups:ProductSlice["groups"] = {
		byId: {},
		allIds: [],
	};

	const variants:ProductSlice["variants"] = {
		byId: {},
		allIds: [],
	};

	productItems.forEach((item) => {
		const details = mockDetails(item.productId);
		if (!details) return;
		groups.byId[item.productId] = {
			id: item.productId,
			name: item.name,
			description: "", // Fill in or modify as per your needs
			primaryCustomerName: item.customerName,
			primaryCustomerId: item.customerId,
			productVariants: details.variations.map((variant) => variant.id),
			productProperties: [], // Fill in or modify as per your needs
		};
		groups.allIds.push(item.productId);

		details.variations.forEach((variant) => {
			variants.byId[variant.id] = {
				id: variant.id,
				name: variant.name,
				description: variant.description,
				productId: item.productId,
				images: [], // Fill in or modify as per your needs
				properties: {}, // Fill in or modify as per your needs
			};
			variants.allIds.push(variant.id);
		});
	});

	return {
		groups,
		variants,
		properties: {
			// You can expand this as per your requirements
			byId: {},
			allIds: [],
		},
	};
}

// Now generate the normalized data using the function
export const normalizedData = normalizeMockData();

