# git-att

Check if the current git project needs attention by checking the following:

- Is the repo on the master branch?
- Is the current branch ahead of the remote tracking branch?
- Is the repo dirty (i.e. does it contain changes that have not yet been
  checked in)
- Is there any untracked files in the repo?

If the answer is yes to any of those questions, this module will let you
know.

## Installation

Install git-att globally:

```
npm install -g git-att
```

## Example usage

```
$ git att
branch: patch-1
ahead: 10
dirty: 2
untracked: 1
```

## Docs

```
git-att [options]
```

Options:

- `--help` - show the help
- `--version` - show version
- `--quiet` - don't output anything (check the exist code)

## License

MIT
