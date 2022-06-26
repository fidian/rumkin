/* global m */

module.exports = class Checkbox {
    view(vnode) {
        const attrs = vnode.attrs;

        return m('label', [
                m('input', Object.assign({}, attrs, {
                    type: 'checkbox',
                    onchange: (e) => {
                        attrs.value = !attrs.value;

                        if (attrs.onchange) {
                            return attrs.onchange(e);
                        }

                        return true;
                    }
                })), this.viewLabel(attrs)]);
    }

    viewLabel(attrs) {
        if (attrs.label) {
            return [
                ' ',
                attrs.label
            ];
        }

        return null;
    }
};
