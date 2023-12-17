import * as core from '@actions/core'
import getLatestGitTag, {getGitTags} from './get-git-tags'

async function run(): Promise<void> {
  const latestTagOnly = core.getInput('latest_tag_only')
  if (latestTagOnly === 'true') {
    const tag = await getLatestGitTag()
    core.setOutput('tag', tag)
  } else {
    const tags = await getGitTags()
    core.setOutput('tags', tags)
  }
}

run()
