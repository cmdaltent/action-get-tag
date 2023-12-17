import {describe, it, expect} from '@jest/globals'
import getLatestGitTag, {getGitTags} from '../src/get-git-tags'
import {jest} from '@jest/globals'
import {exec} from 'child_process'

type ExecCallback = Parameters<typeof exec>[2]

interface ChildProcess {
  exec: (command: string, cb?: ExecCallback) => void
}

const refs = `
refs/tags/v1.0.0 Fri Sep 1 16:31:45 2023 +0200
refs/tags/v1.0.1 Fri Sep 29 19:13:49 2023 +0200
refs/tags/v1 Mon Oct 2 09:35:58 2023 +0200
`

jest.mock('child_process', () => {
  const cp = jest.createMockFromModule<ChildProcess>('child_process')
  cp.exec = jest.fn((_command, cb) => {
    if (cb) {
      cb(null, refs, '')
    }
  })
  return cp
})

describe('get-git-tags', () => {
  it('should return a list of tags', async () => {
    const expected = ['v1.0.1', 'v1.0.0']
    const actual = await getGitTags()
    expect(actual).toStrictEqual(expected)
  })
  it('should get the newest tag', async () => {
    const expected = 'v1.0.1'
    const actual = await getLatestGitTag()
    expect(actual).toBe(expected)
  })
  it('should return only tags that match the given expression', async () => {
    const expected = ['v1']
    const actual = await getGitTags(/v\d*$/)
    expect(actual).toStrictEqual(expected)
  })
  it('should return only the newest tag that matches the given expression', async () => {
    const expected = 'v1'
    const actual = await getLatestGitTag(/v\d*$/)
    expect(actual).toBe(expected)
  })
})
