class EmptyInputRefError extends Error {
  constructor() {
    super('No inputRef provided')
  }
}

class InvalidInputRefError extends Error {
  constructor() {
    super('inputRef must start with refs/tags/')
  }
}

const parseGitTag = (inputRef: string | undefined): string => {
  if (!inputRef) {
    throw new EmptyInputRefError()
  }

  if (!inputRef.startsWith('refs/tags/')) {
    throw new InvalidInputRefError()
  }

  return inputRef.replace(/^refs\/tags\//, '')
}

export default parseGitTag
export {EmptyInputRefError, InvalidInputRefError}
