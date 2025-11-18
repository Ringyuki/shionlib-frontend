type HashWorkerProgressMessage = {
  type: 'hash-progress'
  bytesHashed: number
  totalBytes: number
}

type HashWorkerCompleteMessage = {
  type: 'hash-complete'
  digest: string
}

type HashWorkerErrorMessage = {
  type: 'hash-error'
  error: {
    name: string
    message: string
  }
}

export type HashWorkerResponse =
  | HashWorkerProgressMessage
  | HashWorkerCompleteMessage
  | HashWorkerErrorMessage

export type HashWorkerRequest =
  | {
      type: 'hash'
      file: File
      step: number
    }
  | {
      type: 'abort'
    }
