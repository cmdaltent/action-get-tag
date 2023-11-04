import * as core from '@actions/core'
import parseGitTag, {
  EmptyInputRefError,
  InvalidInputRefError
} from './parse-git-tag'
import getLatestGitTag, {getGitTags} from './get-git-tags'

function parseFromCurrentCommit(): void {
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

async function run(): Promise<void> {
  const parseCurrentCommit = core.getInput('parse_current_commit')
  if (parseCurrentCommit === 'true') {
    parseFromCurrentCommit()
  } else {
    const latestTagOnly = core.getInput('latest_tag_only')
    if (latestTagOnly === 'true') {
      const tag = await getLatestGitTag()
      core.setOutput('tag', tag)
    } else {
      const tags = await getGitTags()
      core.setOutput('tags', tags)
    }
  }
}

run()
