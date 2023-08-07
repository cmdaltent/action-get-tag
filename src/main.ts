import * as core from '@actions/core'
import parseGitTag, {
  EmptyInputRefError,
  InvalidInputRefError
} from './parse-git-tag'

async function run(): Promise<void> {
  const ref = process.env['GITHUB_REF']

  try {
    const tag = parseGitTag(ref)

    core.info(`Ref: ${ref}`)
    core.info(`Tag: ${tag}`)

    core.setOutput('tag', tag)
  } catch (e) {
    if (e instanceof EmptyInputRefError) {
      core.setFailed('GITHUB_REF not defined')
      return
    }
    if (e instanceof InvalidInputRefError) {
      core.setFailed('GITHUB_REF must start with refs/tags/')
      return
    }
  }
}

run()
