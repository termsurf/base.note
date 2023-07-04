import card from '../../../../../make/card.js';
export function load_deckCard_deck_mint(load) {
    card.loadLink(load, Link.Tree).nest.forEach((nest, index) => {
        load_deckCard_deck_mint_nestedChildren(card.withLink(load, nest, index));
    });
}
export function load_deckCard_deck_mint_nestedChildren(load) {
    const type = card.getLinkHint(load);
    switch (type) {
        case LinkHint.StaticText:
            const string = card.assumeText(load);
            const blueString = card.createBlueString(string);
            card.pushRed(load, card.createRedValue(load, 'version', blueString));
            card.attachBlue(load, 'mark', blueString);
            break;
        default:
            card.throwError(card.generateUnhandledNestCaseError(load, type));
    }
}
//# sourceMappingURL=index.js.map