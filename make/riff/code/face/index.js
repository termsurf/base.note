import { Link, LinkHint, code } from '../../../index.js';
export function process_codeCard_face(input) {
    code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
        process_codeCard_face_nestedChildren(code.withLink(input, nest, index));
    });
}
export function process_codeCard_face_nestedChildren(input) {
    const type = code.getLinkHint(input);
    switch (type) {
        case LinkHint.StaticText:
            break;
        default:
            code.throwError(code.generateUnhandledTermCaseError(input));
    }
}
//# sourceMappingURL=index.js.map