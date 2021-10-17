import { format } from 'prettier'

export default function prettier(filename: string, root: string, text: string): string {
  return format(text, { parser: 'markdown' })
}
