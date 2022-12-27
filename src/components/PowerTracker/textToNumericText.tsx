export function textToNumericText(
    text: string, maxValue: number, minValue: number):string {
    let newValue = text.replace(/[,\.\s]/g, "");
    let parsedNewValue = parseInt(newValue);
    if (!isNaN(parsedNewValue)) {
        if (parsedNewValue <= maxValue && parsedNewValue > minValue) {
           return parsedNewValue.toString()
        }
    }
    return newValue
}
