export const unknownToString = (value: unknown) => (`${value}`)

export const unknownToInt = (value: unknown) => {
	switch(typeof value) {
		case 'number':
			return value
		case 'string':
			return Number(value)
	}
	return NaN
}
