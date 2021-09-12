export function isOnlySpaces(string: string | undefined) {
	return string !== undefined && string.split(' ').join('') === ''
}