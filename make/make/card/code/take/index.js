import card from '../../../../make/card.js';
// the code url handlers go here
export function load_codeCard_take(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_codeCard_take_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_codeCard_take_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticTerm:
            const term = card.resolveTermString(load);
            break;
        default:
            card.throwError(card.generateUnhandledTermCaseError(load));
    }
}
//# sourceMappingURL=index.js.map