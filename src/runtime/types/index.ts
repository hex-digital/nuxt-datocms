export interface DatoCmsState {
  preview: boolean
  token: string
}

interface StructuredTextRoot {
  type: 'root'
  children: Array<StructuredTextNode>
}

interface StructuredTextBranch {
  type: string
  children: Array<StructuredTextNode>
}

// @TODO maybe one day grab all the types for all fields, but not on this day
interface StructuredTextLeaf {
  type: string
  [key: string]: any
}

type StructuredTextNode = StructuredTextBranch | StructuredTextLeaf;

export interface StructuredText {
  value: {
    schema: string
    document: StructuredTextRoot
  }
}
