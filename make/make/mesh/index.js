import { minimatch } from 'minimatch';
export function loadCard(base, link) {
    if (code.testHaveCard(base, link)) {
        return;
    }
    const deck = code.loadDeckFile(link);
    const mint = code.loadMintFile(deck);
    walk: for (const have of mint.mint) {
        if (minimatch(link, have.link)) {
            switch (have.name) {
                case 'deck':
                    return code.load_deckCard(base, link);
                case 'code':
                    return code.load_codeCard(base, link);
                case 'mint':
                    return code.load_mintCard(base, link);
                case 'call': // api urls
                    return code.load_callCard(base, link);
                case 'line': // cli hooks
                    return code.load_lineCard(base, link);
                case 'note': // a note type is a scratch type which isn't validated
                    return code.load_noteCard(base, link);
                case 'book':
                    return code.load_bookCard(base, link);
                default:
                    throw code.haltMissMintName();
            }
        }
    }
    throw code.haltCardMiss();
}
//# sourceMappingURL=index.js.map