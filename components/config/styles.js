export const generalTheme =  {
	mainColor: 'blue10',
	secondary: 'violet10',
	third: 'jade9'
}

export const generalStyles =  {
	...generalTheme,
	defaultBorder: `text-white  border border-${generalTheme.mainColor} hover:text-${generalTheme.secondary} hover:shadow-neutral-600`,
	buttonBordered: `mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-sm  shadow-neutral-800 
				hover:cursor-pointer text-center text-white  border border-${generalTheme.mainColor} hover:text-${generalTheme.secondary} hover:shadow-neutral-600 transform hover:scale-[1.03] transition-all`,
	getDefaultBorder: function () {
		const x = `mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-sm  shadow-neutral-800 
				hover:cursor-pointer text-center text-white  border border-${generalTheme.third} hover:text-${generalTheme.secondary} hover:shadow-neutral-600 transform hover:scale-[1.03] transition-all`
		return JSON.stringify(x);
	},
	getHeaderStyle: () => {
		const x = `block select-none rounded px-3 py-3 text-17px] font-medium leading-none text-mauve8 hover:text-${generalTheme.mainColor} no-underline outline-none  focus:shadow-[0_0_0_2px]`
		return JSON.stringify(x)
	}
}