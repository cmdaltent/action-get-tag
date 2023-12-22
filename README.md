# Get Tag GitHub Action

This is a simple GitHub Action that can be used to get git-tags from the repository that the action is run in.
It can be used to get a list of all git-tags in the repository or to get only the newest git-tag.

## Usage

In order to return the newest git-tag, the action can be used as follows:

```yaml
- name: Get Tag
  uses: cmdaltent/action-get-tag@v2
  id: get-tag
- name: Print Tag
  run: echo ${{ steps.get-tag.outputs.tag }}
```

In order to return all git-tags, the action can be used as follows:

```yaml
- name: Get Tags
  uses: cmdaltent/action-get-tag@v2
  with:
    newest_tag_only: 'false'
  id: get-tags
- name: Print Tags
  §run: echo ${{ steps.get-tags.outputs.tags }}
```

Both actions need the full history of the repository to be checked out.
This can be achieved as follows:

```yaml
- name: Checkout repository with full history
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

If only the latest commit is being checked out, the action will return an empty list `[]` if all tags are being fetched
or an empty string `''` if only the latest commit is being fetched unless the latest commit contains a valid git-tag.
