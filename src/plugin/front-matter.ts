import * as path from 'path'
import { dump, load } from 'js-yaml'

export default function frontMatter(filename: string, root: string, text: string): string {
  const pattern = /---(.*?)---/gs
  let [_, yaml] = pattern.exec(text) || []

  let json = yaml === undefined ? {} : load(yaml) || {}
  json = {
    ...json,
    title: path.basename(filename, path.extname(filename)),
    categories: [path.dirname(filename).replace(root, '').split(path.sep).filter(it => it !== '')]
  }
  yaml = dump(json, { flowLevel: 2 })

  const result = text.replace(pattern, '')
  return `---\n${yaml}---\n${result}`
}
