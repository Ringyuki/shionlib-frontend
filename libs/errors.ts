export class ShionlibBizError extends Error {
  code: number
  constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.name = 'ShionlibBizError'
  }
}
