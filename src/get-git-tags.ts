import {exec} from 'child_process'

const getGitTags = async (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    exec('git tag --list', (err, data) => {
      if (err) {
        reject(err)
      }
      const tags = data.split('\n').filter(tag => tag !== '')
      resolve(tags)
    })
  })
}

const getLatestGitTag = async (): Promise<string> => {
  const tags = await getGitTags()
  return tags[tags.length - 1]
}

export default getLatestGitTag
export {getGitTags}
