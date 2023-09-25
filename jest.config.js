module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
	// Add other configuration as needed
};
