module.exports = {
	content: {
		files: ["./pages/**/*.{vue,js,ts}", "./components/**/*.{vue,js,ts}"],
	},
	theme: {
		extend: {
			colors: {
				primary: "#FFD700",
			},
		},
	},
	plugins: [require("daisyui")],
};
