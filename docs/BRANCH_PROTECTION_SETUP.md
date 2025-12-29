# Branch Protection Setup Guide

This guide explains how to set up branch protection rules for the `main` branch in your repository to ensure code quality and maintain a clean commit history.

## Prerequisites

- Repository admin access
- GitHub account with appropriate permissions

## Setup Steps

### 1. Navigate to Branch Protection Settings

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. In the left sidebar, click on **Branches**
4. Under "Branch protection rules", click **Add rule** or **Add branch protection rule**

### 2. Configure Branch Name Pattern

- In the "Branch name pattern" field, enter: `main`

### 3. Configure Protection Rules

Enable the following settings:

#### Require Pull Request Reviews

- ✅ **Require a pull request before merging**
  - ✅ **Require approvals**: Set to `1` (or more based on team size)
  - ✅ **Dismiss stale pull request approvals when new commits are pushed**
  - ✅ **Require review from Code Owners** (if you have a CODEOWNERS file)

#### Require Status Checks

- ✅ **Require status checks to pass before merging**
  - ✅ **Require branches to be up to date before merging**
  - Add required status checks:
    - `build` (or your CI job name)
    - `test` (or your test job name)
    - `lint` (if you have linting in CI)
    - Any other CI/CD checks you've configured

#### Additional Settings

- ✅ **Require conversation resolution before merging**
  - Ensures all PR comments are resolved before merge
- ✅ **Require signed commits** (optional but recommended)
  - Adds an extra layer of security
- ✅ **Require linear history**
  - Prevents merge commits, enforces rebase or squash
- ✅ **Include administrators**
  - Applies rules to repository administrators too

#### Restrictions (Optional)

- **Restrict who can push to matching branches**
  - Can be left unchecked for smaller teams
  - For larger teams, restrict to specific users or teams

#### Rules Applied to Everyone

- ✅ **Allow force pushes**: ❌ (Keep disabled)
- ✅ **Allow deletions**: ❌ (Keep disabled)

### 4. Save Changes

- Scroll to the bottom and click **Create** or **Save changes**

## Recommended Configuration Summary

Here's a quick checklist of recommended settings:

```
✅ Require pull request before merging
  ✅ Require 1 approval
  ✅ Dismiss stale reviews
✅ Require status checks to pass
  ✅ Require branches to be up to date
  ✅ Add CI/CD status checks
✅ Require conversation resolution
✅ Require linear history
✅ Include administrators
❌ Allow force pushes (disabled)
❌ Allow deletions (disabled)
```

## Verification

After setup, try to:

1. Push directly to `main` branch - should be blocked
2. Create a PR without passing CI - should not be mergeable
3. Create a PR with passing CI - should require approval before merge

## Troubleshooting

### Can't Push to Main

**Issue**: Getting error when trying to push to main
**Solution**: This is expected! Create a feature branch and open a PR instead.

```bash
git checkout -b feature/your-feature
git push origin feature/your-feature
# Then create a PR on GitHub
```

### Status Checks Not Showing

**Issue**: Required status checks aren't appearing
**Solution**: 
- Ensure your CI workflow is configured correctly
- Status checks must run at least once before they can be added as required
- Check that the status check names match exactly

### PR Can't Be Merged

**Issue**: PR shows "Merge blocked" even though CI passed
**Solution**:
- Ensure all required approvals are given
- Check that all conversations are resolved
- Verify branch is up to date with main
- Confirm all required status checks have passed

## Best Practices

1. **Start with basic protection** and add more rules as needed
2. **Test the workflow** with a small change before enforcing on the team
3. **Document your branching strategy** for team members
4. **Use meaningful commit messages** for better history
5. **Keep branches short-lived** to avoid merge conflicts
6. **Review PRs promptly** to keep the development flow smooth

## For Team Leads

When setting this up for your team:

1. **Communicate changes**: Let team members know about new branch protection rules
2. **Provide training**: Ensure everyone understands the PR workflow
3. **Set expectations**: Define SLAs for PR reviews
4. **Monitor compliance**: Check that rules are being followed
5. **Adjust as needed**: Be flexible and refine rules based on team feedback

## Exemptions and Emergency Procedures

### Creating Bypass Rules

If you need to allow certain users or apps to bypass branch protection:

1. Go to **Settings** > **Branches**
2. Click on your branch protection rule
3. Scroll to "Allow bypasses"
4. Add specific users, teams, or apps that can bypass

### Emergency Hotfixes

For critical production issues:

1. **Document the emergency** in a tracking system
2. If bypass is enabled for admins, create an emergency PR
3. Get expedited review from available team members
4. Merge and deploy
5. Follow up with a post-mortem
6. Update documentation if needed

## Integration with CI/CD

Ensure your CI/CD pipeline includes:

```yaml
# Example GitHub Actions workflow snippet
name: CI
on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
      - name: Run lint
        run: npm run lint
```

The status check names in your workflow (e.g., `build`) should match the ones you add to branch protection.

## Additional Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Code Review Best Practices](https://google.github.io/eng-practices/review/)

## Updating Branch Protection Rules

To modify existing rules:

1. Go to **Settings** > **Branches**
2. Find your branch protection rule for `main`
3. Click **Edit**
4. Make your changes
5. Click **Save changes**

## Common Branch Protection Patterns

### Pattern 1: Small Team (2-5 developers)

```
✅ Require PR before merging (1 approval)
✅ Require status checks
✅ Require conversation resolution
❌ Require signed commits
✅ Require linear history
```

### Pattern 2: Medium Team (6-15 developers)

```
✅ Require PR before merging (2 approvals)
✅ Dismiss stale reviews
✅ Require status checks (must be up to date)
✅ Require conversation resolution
✅ Require signed commits
✅ Require linear history
✅ Include administrators
```

### Pattern 3: Large Team/Open Source (15+ developers)

```
✅ Require PR before merging (2+ approvals)
✅ Require review from Code Owners
✅ Dismiss stale reviews
✅ Require status checks (must be up to date)
✅ Require conversation resolution
✅ Require signed commits
✅ Require linear history
✅ Include administrators
✅ Restrict push access to specific teams
```

## Conclusion

Proper branch protection is essential for maintaining code quality and preventing accidental changes to important branches. Start with the recommended configuration and adjust based on your team's needs and workflow.

Remember: The goal is to improve code quality and collaboration, not to create unnecessary obstacles. Find the right balance for your team.
