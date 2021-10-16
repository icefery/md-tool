import { format } from 'prettier'

export default function prettier(filepath: string, root: string, text: string): string {
  return format(text, { parser: 'markdown' })
}
