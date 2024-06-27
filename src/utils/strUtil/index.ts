export const checkTextFromHtml = (html: string) => {
    if (!html) {
        return ""
    } else {
        const text = html.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "")
        if (text) {
            return html
        } else {
            return text
        }
    }
}
