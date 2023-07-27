export function checkTagsUtil(array: string[], value: string): string[] {
    const index = array.indexOf(value);
    if (index === -1) {
        return [...array, value];
    } else {
        return [...array.slice(0, index), ...array.slice(index + 1)];
    }
}
