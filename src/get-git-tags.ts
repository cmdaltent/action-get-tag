import {exec} from 'child_process'

const command =
  "git for-each-ref --sort=creatordate --format '%(refname) %(creatordate)' refs/tags"
const reqExp = /refs\/tags\/(.*?)\s/
const semanticTagRegExp = /v\d*\.\d*\.\d*/
const getGitTags = async (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    exec(command, (err, data) => {
      if (err) {
        reject(err)
      }
      const tags = data
        .split('\n')
        .map(tag => tag.match(reqExp))
        .filter(tag => tag)
        .map(tag => {
          return tag ? tag[1] : ''
        })
        .filter(tag => tag.match(semanticTagRegExp))
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
