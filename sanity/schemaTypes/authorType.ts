// @ts-nocheck
// app/schemaTypes/authorType.ts

export interface Author {
  name: string
  picture?: {
    asset: {
      _ref: string
      _type: string
    }
  }
  bio?: string
}

