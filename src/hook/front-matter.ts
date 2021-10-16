import * as path from 'path'
import { load, dump } from 'js-yaml'

export default function frontMatter(filepath: string, root: string, text: string): string {
  const reg = /---(.*?)---/gs
  let [_, yaml] = reg.exec(text) || []

  let json = yaml === undefined ? {} : load(yaml) || {}
  Object.assign(json, {
    title: path.basename(filepath, path.extname(filepath)),
    categories: [path.dirname(filepath).replace(root, '').split(path.sep)]
  })
  yaml = dump(json, { flowLevel: 2 })

  let result = text.replace(reg, '')
  return `---\n${yaml}---\n${result}`
}
