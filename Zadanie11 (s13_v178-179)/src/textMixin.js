export const textMixin = {
    computed: {
        textLen() {
            return this.text + ' (' + this.text.length + ')';
        }
    }
}