import * as fs from 'fs'
import * as path from 'path'
import { Parser } from 'commonmark'

function mv(src: string): string {
  // TODO
  return src
}

export default function mvImage(filepath: string, root: string, text: string): string {
  const parser = new Parser()
  const ast = parser.parse(text)
  const walker = ast.walker()

  let event = null
  while ((event = walker.next()) !== null) {
    if (event.entering && event.node.type === 'image') {
      event.node.destination = mv(event.node.destination)
    }
  }
  // TODO
  return text
}
