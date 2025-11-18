# Automated Version Bumping

This repository uses Git hooks to automatically bump the version number based on commit message prefixes.

## How It Works

When you commit with a special prefix, the version in `version.json` will automatically increment:

- **`patch:`** - Increments the patch version (1.0.0 → 1.0.1)
- **`minor:`** - Increments the minor version and resets patch (1.0.1 → 1.1.0)
- **`major:`** - Increments the major version and resets minor and patch (1.1.0 → 2.0.0)

The prefix is automatically removed from the final commit message.

## Examples

```bash
# Patch version bump (bug fixes, small changes)
git commit -m "patch: Fix typo in footer"
# Result: version.json updated to 1.0.1, commit message becomes "Fix typo in footer"

# Minor version bump (new features, backward compatible)
git commit -m "minor: Add new blog section"
# Result: version.json updated to 1.1.0, commit message becomes "Add new blog section"

# Major version bump (breaking changes)
git commit -m "major: Redesign entire website"
# Result: version.json updated to 2.0.0, commit message becomes "Redesign entire website"

# Regular commit (no version bump)
git commit -m "Update README"
# Result: version.json unchanged, commit message stays "Update README"
```

## Case Insensitive

The prefixes are case-insensitive, so these all work:
- `patch:`, `Patch:`, `PATCH:`
- `minor:`, `Minor:`, `MINOR:`
- `major:`, `Major:`, `MAJOR:`

## Technical Details

The system consists of:
- `version.json` - Stores the current version and last update date
- `.git/hooks/prepare-commit-msg.ps1` - Detects version prefixes and cleans commit message
- `.git/hooks/post-commit.ps1` - Bumps the version and amends the commit
- Git hooks automatically execute these PowerShell scripts on commit

The version is displayed on the website footer and loaded dynamically via JavaScript.
