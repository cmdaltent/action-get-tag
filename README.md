# Get Tag GitHub Action

This is a simple GitHub Action that gets the tag of the current commit and sets the tag's name as an output variable.
The tag itself is parsed from the `GITHUB_REF` environment variable.

## Usage

As we parse the tag from the `GITHUB_REF` environment variable, this action should be run only when an actual tag is
pushed.
Otherwise, the action will fail.

```yaml
on:
  push:
    tags:
      - '*'
```

If an actual tag is pushed, the action can be used as follows:

```yaml
- name: Get Tag
  uses: cmdaltent/action-get-tag@v1
  id: get-tag
- name: Print Tag
  run: echo ${{ steps.get-tag.outputs.tag }}
```
