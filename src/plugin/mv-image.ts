import * as fs from 'fs'
import * as path from 'path'

function extract(text: string): { token: string; alt: string; url: string }[] {
  const result = []
  const pattern = /!\[(.*?)\]\((.*?)\)/gm
  let matcher
  while ((matcher = pattern.exec(text)) !== null) {
    const [token, alt, url] = matcher
    result.push({ token, alt, url })
  }
  return result
}

export default function mvImage(filename: string, root: string, text: string): string {
  const list = extract(text)
  let result = text
  for (const { token, alt, url } of list) {
    if (/^http(s?):\/\//.test(url)) { continue }
    if (path.isAbsolute(url)) { continue }

    const source = path.join(filename, url)
    const dirname = path.join(path.dirname(filename), path.basename(filename, path.extname(filename)))
    fs.mkdirSync(dirname)
    const target = path.join(dirname, path.basename(url, path.extname(url)))

    if (source !== target) {
      let buffer: Buffer
      try { buffer = fs.readFileSync(source) } catch (error) { continue }
      fs.writeFileSync(target, buffer)
      fs.rmSync(source)
      result = result.replaceAll(token, `![${alt}](${target})`)
    }
  }
  return text
}
