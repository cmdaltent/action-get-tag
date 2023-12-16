import {describe, it, expect} from '@jest/globals'
import getLatestGitTag, {getGitTags} from '../src/get-git-tags'

describe('get-git-tags', () => {
  it('should return a list of tags', async () => {
    const expected = ['v1.0.1', 'v1.0.0']
    const actual = await getGitTags()
    expect(actual).toStrictEqual(expected)
  })
  it('should get the latest tag', async () => {
    const expected = 'v1.0.1'
    const actual = await getLatestGitTag()
    expect(actual).toBe(expected)
  })
  it('should return only tags that match the given expression', async () => {
    const expected = ['v1']
    const actual = await getGitTags(/v\d*$/)
    expect(actual).toStrictEqual(expected)
  })
  it('should return only the latest tag that matches the given expression', async () => {
    const expected = 'v1'
    const actual = await getLatestGitTag(/v\d*$/)
    expect(actual).toBe(expected)
  })
})
