import {exec} from 'child_process'

const command =
  "git for-each-ref --sort=creatordate --format '%(refname) %(creatordate)' refs/tags"
const reqExp = /refs\/tags\/(.*?)\s/
const semanticTagRegExp = /v\d*\.\d*\.\d*/
const getGitTags = async (filter = semanticTagRegExp): Promise<string[]> => {
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
        .filter(tag => tag.match(filter))
        .reverse()
      resolve(tags)
    })
  })
}

const getLatestGitTag = async (filter = semanticTagRegExp): Promise<string> => {
  const tags = await getGitTags(filter)
  if (tags.length === 0) {
    throw new Error('No tags found')
  }
  return tags[0]
}

export default getLatestGitTag
export {getGitTags}
