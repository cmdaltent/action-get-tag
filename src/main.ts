import * as core from '@actions/core'
import getLatestGitTag, {getGitTags} from './get-git-tags'

async function run(): Promise<void> {
  const newestTagOnly = core.getInput('newest_tag_only') ?? 'true'
  if (newestTagOnly === 'true') {
    const tag = await getLatestGitTag()
    core.setOutput('tag', tag)
  } else {
    const tags = await getGitTags()
    core.setOutput('tags', tags)
  }
}

run()
