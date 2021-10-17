import * as fs from 'fs'
import * as path from 'path'

import prettier from './plugin/pretttier'
import frontMatter from './plugin/front-matter'
import mvImage from './plugin/mv-image'

export function format(
  filename: string,
  root: string,
  plugins: ((filename: string, root: string, text: string) => string)[] = [mvImage, frontMatter, prettier]
): void {
  let stat: fs.Stats
  try { stat = fs.statSync(filename) } catch (error) { return }
  
  if (stat.isDirectory()) {
    fs.readdirSync(filename).forEach(it => format(path.join(filename, it), root, plugins))
  } else if (stat.isFile() && /\.md$/i.test(filename)) {
    const source = fs.readFileSync(filename, 'utf-8')
    let target = source

    plugins.forEach(it => (target = it(filename, root, target)))
    if (target !== source) {
      fs.writeFileSync(filename, target)
    }
  }
}
