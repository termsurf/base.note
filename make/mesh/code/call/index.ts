import { Link, LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function load_codeCard_call(input: SiteProcessInputType): void {
  const red = code.pushRed(input, code.createRedGather(input, 'step'))
  const blue = code.pushBlue(input, 'steps', {
    bind: [] as unknown as code.BlueArrayType<code.BlueBindType>,
    type: Mesh.Call,
  })
  const colorInput = code.withColors(input, { blue, red })

  code.assumeNest(input).forEach((nest, index) => {
    code.addTask(input.base, () => {
      load_codeCard_call_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_call_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.DynamicTerm: {
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        const term = code.createBlueTerm(
          code.assumeLink(input, Link.Term),
        )
        code.pushRed(input, code.createRedGather(input, 'path', [term]))
        code.attachBlue(input, 'path', term)
      } else {
        code.throwError(
          code.generateUnhandledNestCaseError(input, type),
        )
      }
      break
    }
    case LinkHint.StaticText:
      break
    case LinkHint.StaticPath:
    case LinkHint.DynamicPath: {
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        const path = code.createBluePath(
          code.assumeLink(input, Link.Path),
        )
        code.pushRed(input, code.createRedGather(input, 'path', [path]))
        code.attachBlue(input, 'path', path)
      } else {
        code.throwError(
          code.generateUnhandledNestCaseError(input, type),
        )
      }
      break
    }
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        const term = code.createBlueTerm(
          code.assumeLink(input, Link.Term),
        )
        code.pushRed(input, code.createRedGather(input, 'path', [term]))
        code.attachBlue(input, 'path', term)
      } else {
        const term = code.assumeTermString(input)
        switch (term) {
          case 'read':
            break
          case 'loan':
            break
          case 'bind':
            code.load_codeCard_bind(input)
            break
          default:
            code.throwError(code.generateUnhandledTermCaseError(input))
        }
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}
