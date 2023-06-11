import {
  Link,
  MESH_BOOLEAN_LINK_TYPE,
  MESH_TERM_LINK_TYPE,
  Mesh,
  code,
} from '~'
import type { MeshLink } from '~'

export * from './base/index.js'
export * from './case/index.js'
export * from './wear/index.js'

export function load_codeCard_form(input: MeshLink): void {
  const container = code.createContainerScope(input)
  const scope = code.createStepScope(container)
  const red = code.pushRed(input, code.createRedGather(input, 'class'))
  const blue = code.pushBlue(input, 'classes', {
    callbacks: code.createBlueArray(input),
    interfaces: code.createBlueArray(input),
    methods: code.createBlueArray(input),
    parents: code.createBlueArray(input),
    properties: code.createBlueArray(input),
    type: Mesh.Class,
    typeInputs: code.createBlueArray(input),
  })

  const scopeInput = code.withScope(input, scope)
  const colorInput = code.withColors(scopeInput, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(colorInput.base, () => {
      code.load_codeCard_form_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_form_nestedChildren(
  input: MeshLink,
): void {
  const type = code.getLinkHint(input)
  if (type === 'static-term') {
    const index = code.assumeLinkIndex(input)
    if (index === 0) {
      code.load_first_staticTerm(input, 'name')
    } else {
      const term = code.assumeTermString(input)
      switch (term) {
        case 'link':
          code.load_codeCard_link(input, 'properties')
          break
        case 'task':
          code.load_codeCard_task(input, 'methods')
          break
        case 'head':
          code.load_codeCard_head(input)
          break
        // case 'wear':
        //   code.load_codeCard_form_wear(input)
        //   break
        case 'base':
          code.load_codeCard_form_base(input)
          break
        case 'case':
          code.load_codeCard_formCase(input)
          break
        // case 'fuse':
        //   code.load_codeCard_fuse(input)
        //   break
        case 'hold':
          code.load_codeCard_hold(input)
          break
        case 'stem':
          code.load_codeCard_stem(input)
          break
        case 'note':
          code.load_codeCard_note(input)
          break
        case 'like':
          code.load_codeCard_like(input)
          break
        default:
          code.throwError(code.generateUnknownTermError(input))
      }
    }
  } else {
    code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}
