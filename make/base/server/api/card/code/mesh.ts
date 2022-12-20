import {
  ASTKnitType,
  ASTFormType,
  BaseCardCodeMeshMixinType,
  BaseType,
} from '../../../type'

export function mintCodeForm(
  this: BaseType,
  fork,
): ASTKnitType<ASTFormType> {
  const form: ASTKnitType<ASTFormType> = this.makeKnit(
    {
      like: 'form',
      name: undefined,
      base: this.makeList(),
      link: this.makeMesh(),
      task: this.makeMesh(),
      wear: this.makeMesh(),
      hook: this.makeMesh(),
    },
    fork.knit,
  )

  return form
}

export function mintCodeTaskMesh(parent, key, tree, seed) {
  const task = this.makeKnit({
    like: 'task',
    name: null,
    base: null,
    take: this.makeMesh(),
    task: this.makeMesh(),
    free: null,
    call: [],
  })

  return task
}

export function mintCodeLoad(fork) {
  const load = this.makeKnit(
    {
      like: 'load',
      link: null,
      bear: [],
      take: [],
    },
    fork.knit,
  )

  fork.nest.nest[0]

  fork.tree.link.forEach((link, i) => {
    if (i === 0) {
      const loadLink = {
        like: 'cord',
        cord: shared.findPath(
          link.text,
          fork.card.mesh['link-host'],
        ),
      }
      load.link = loadLink
    } else {
      load.take.push(link)
    }
  })

  const childFork = this.extendObject(fork, { mesh: load })
  this.convertToMesh(childFork)
}

export function mintCodeFuseMesh(fork) {
  const fuse = this.makeKnit(
    {
      like: 'fuse',
      name: null,
      bind: [],
    },
    fork.knit,
  )

  const nameFork = this.extendObject(fork, {
    nest: fork.nest.nest[0],
  })
  const name = this.getTerm(nameFork)

  this.addToTreeLink(fuse, name)
  fuse.mesh.name = name

  fork.nest.nest.slice(1).forEach(nest => {
    const nestFork = this.extendObject(fork, { nest })
    if (shared.isSimpleTerm(nestFork)) {
      const term = shared.getTerm(nestFork)
      switch (term) {
        case 'loan': {
          const loanFork = this.extendObject(nestFork, {
            nest: nest.nest[0],
          })
          const loan = shared.getTerm(loanFork)
          this.addToTreeLink(fuse, loan)
          fuse.mesh.bind.push(loan)
          break
        }
        case 'mark': {
          const mark = parseMark(nest.nest[0])
          this.addToTreeLink(fuse, mark)
          fuse.mesh.bind.push(mark)
          break
        }
        case 'term': {
          const termFork = this.extendObject(nestFork, {
            nest: nest.nest[0],
          })
          const term = shared.getTerm(termFork)
          this.addToTreeLink(fuse, term)
          fuse.mesh.bind.push(term)
          break
        }
        case 'bind': {
          break
        }
        default:
          throw new Error(`${term} - ${card.seed.link}`)
      }
    } else {
      throw new Error(`${card.seed.link}`)
    }
  })
}

export function mintCodeTree(fork) {}

export function mintCodeFaceTree(fork) {}

export function mintCodeHostTree(fork) {}

export function mintCodeSuitTree(fork) {}

export function mintCodeTaskTree(fork) {}
