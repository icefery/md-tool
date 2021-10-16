import * as fs from 'fs'
import * as path from 'path'

import prettier from './hook/pretttier'
import frontMatter from './hook/front-matter'
import mvImage from './hook/mv-image'

const HOOKS = [mvImage, frontMatter, prettier]

export function format(filepath: string, root: string): void {
  let stats: fs.Stats = null
  try {
    stats = fs.statSync(filepath)
  } catch (error) {
    return
  }
  if (stats.isDirectory()) {
    fs.readdirSync(filepath).forEach(filename => format(path.join(filepath, filename), root))
  } else if (stats.isFile() && (filepath.endsWith('.md') || filepath.endsWith('.MD'))) {
    const source = fs.readFileSync(filepath, 'utf-8')

    let target = source
    HOOKS.forEach(hook => (target = hook(filepath, root, target)))

    if (target !== source) {
      fs.writeFileSync(filepath, target)
    }
  }
}
