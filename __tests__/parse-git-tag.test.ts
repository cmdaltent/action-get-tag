import {describe, it, expect} from '@jest/globals'
import parseGitTag, {
  EmptyInputRefError,
  InvalidInputRefError
} from '../src/parse-git-tag'

describe('parse-git-tag', () => {
  it('should parse a tag', () => {
    expect(parseGitTag('refs/tags/v1.2.3')).toBe('v1.2.3')
    expect(parseGitTag('refs/tags/9.7.8')).toBe('9.7.8')
  })

  it('should throw an error if the input is not a tag', () => {
    expect(() => parseGitTag('randomSomethingNotATag')).toThrow(
      new InvalidInputRefError()
    )
  })

  it('should throw an error if the input is empty', () => {
    expect(() => parseGitTag(undefined)).toThrow(new EmptyInputRefError())
  })
})
