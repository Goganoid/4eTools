export default function limitLength(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength-3) + "...";
    }
    return text;
}