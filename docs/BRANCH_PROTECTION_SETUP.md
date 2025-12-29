# Branch Protection Setup Guide

This guide provides step-by-step instructions for configuring GitHub branch protection rules to enforce code quality and prevent direct pushes to the main branch.

## Overview

Branch protection rules ensure that:
- No one can push directly to the `main` branch
- All changes must go through pull requests
- All automated checks must pass before merging
- Code reviews are required
- Changes are properly documented with changesets

## Step-by-Step Configuration

### 1. Navigate to Branch Protection Settings

1. Go to your repository on GitHub
2. Click on **Settings** (top navigation)
3. Click on **Branches** (left sidebar)
4. Under "Branch protection rules", click **Add rule** or **Add branch protection rule**

### 2. Configure Basic Settings

In the "Branch name pattern" field, enter: `main`

### 3. Enable Required Settings

Check the following boxes:

#### ✅ Require a pull request before merging
- **Purpose**: Prevents direct pushes to main
- **Action**: Check this box
- **Recommended sub-options**:
  - ✅ Require approvals: Set to at least **1** approval
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners (if using CODEOWNERS file)
  - ✅ Require approval of the most recent reviewable push

#### ✅ Require status checks to pass before merging
- **Purpose**: Ensures all CI/CD checks pass before merge
- **Action**: Check this box
- **Required sub-options**:
  - ✅ Require branches to be up to date before merging
  
**Add the following status checks** (search for each and add):
1. `Lint (ESLint)` - Ensures code passes linting
2. `Format Check (Prettier)` - Ensures code is properly formatted
3. `Type Check` - Ensures TypeScript types are correct
4. `Build` - Ensures code builds successfully
5. `Release Check (Dry Run)` - Validates changeset format
6. `PR Validation Complete` - Final gate ensuring all checks passed

> **Note**: These status checks will only appear in the list after they have run at least once. You may need to create a test PR first to make them visible.

#### ✅ Require conversation resolution before merging
- **Purpose**: Ensures all review comments are addressed
- **Action**: Check this box

### 4. Additional Recommended Settings

Consider enabling these additional protections:

#### ⚠️ Require signed commits (Optional but Recommended)
- **Purpose**: Ensures commits are cryptographically signed
- **Action**: Check "Require signed commits"

#### ⚠️ Include administrators (Recommended)
- **Purpose**: Applies rules to administrators too
- **Action**: Check "Do not allow bypassing the above settings"
- **Note**: Recommended for team consistency, but may need to be disabled temporarily for emergency fixes

#### ⚠️ Restrict who can push to matching branches (Optional)
- **Purpose**: Limits who can push to main
- **Action**: Leave unchecked if you want PR-based workflow only
- **Use case**: Can be used to restrict even PR merges to specific people

#### ✅ Require linear history (Recommended)
- **Purpose**: Prevents merge commits, enforces squash or rebase
- **Action**: Check this box if you want a clean history

#### ✅ Require deployments to succeed before merging (Optional)
- **Purpose**: Ensures deployments work before merging
- **Action**: Enable if you have preview deployments

### 5. Save the Rule

Click **Create** or **Save changes** at the bottom of the page.

## What This Protection Guards Against

✅ **Direct pushes to main** - All changes must go through PRs  
✅ **Unreviewed code** - At least one approval required  
✅ **Linting violations** - Code must pass ESLint checks  
✅ **Format inconsistencies** - Code must pass Prettier checks  
✅ **Type errors** - TypeScript must compile without errors  
✅ **Build failures** - Code must build successfully  
✅ **Missing changesets** - Package changes are properly documented  
✅ **Unresolved discussions** - All review comments must be addressed  

## Testing Your Configuration

After setting up branch protection:

1. **Create a test branch**:
   ```bash
   git checkout -b test/branch-protection
   echo "test" >> README.md
   git add README.md
   git commit -m "test: verify branch protection"
   git push origin test/branch-protection
   ```

2. **Create a pull request** targeting the `main` branch

3. **Verify the following**:
   - ✅ All status checks appear in the PR
   - ✅ Each check runs and completes
   - ✅ The "Merge" button is disabled until all checks pass
   - ✅ The "Merge" button is disabled until approval is given

4. **Try to push directly to main** (should fail):
   ```bash
   git checkout main
   git pull
   echo "test" >> README.md
   git add README.md
   git commit -m "test: this should fail"
   git push origin main
   ```
   
   Expected result: `[remote rejected] main -> main (protected branch hook declined)`

## Troubleshooting

### Status Checks Don't Appear

**Problem**: Required status checks are not visible in the dropdown.

**Solution**: 
- Status checks only appear after they've run at least once
- Create a test PR to trigger the workflows
- Wait for the PR validation workflow to complete
- Return to branch protection settings and add the checks

### Can't Merge Even When Checks Pass

**Problem**: Merge button is still disabled after all checks pass.

**Solution**:
- Verify all required status checks are actually passing (not just some)
- Check if "Require branches to be up to date before merging" is enabled
  - If yes, click "Update branch" to rebase on latest main
- Ensure conversation resolution is enabled and all comments are resolved
- Verify required approvals have been given

### Accidentally Locked Out

**Problem**: Admin is locked out and can't merge critical fixes.

**Solution**:
- Go to Settings > Branches > Edit the rule
- Temporarily uncheck "Do not allow bypassing the above settings"
- Make your critical merge
- Re-enable the setting afterwards

### PR Validation Workflow Not Running

**Problem**: The `pr-validation.yml` workflow doesn't trigger.

**Solution**:
- Verify the workflow file is on the base branch (main)
- Check that the PR targets the `main` branch
- Look at Actions tab to see if there are any workflow errors
- Ensure the workflow file has correct YAML syntax

## Maintenance

### When to Update Status Checks

Update the required status checks list when:
- You add new jobs to the PR validation workflow
- You rename existing jobs
- You remove jobs from validation

### Regular Reviews

Review branch protection rules:
- **Quarterly**: Ensure rules still match team needs
- **After major changes**: When CI/CD pipelines change
- **When team grows**: Adjust approval requirements

## Quick Reference

### Required Status Checks Checklist

Copy-paste these names into the status check search:

```
Lint (ESLint)
Format Check (Prettier)
Type Check
Build
Release Check (Dry Run)
PR Validation Complete
```

### Recommended Settings Summary

```yaml
Branch: main
✅ Require pull request before merging
  ✅ Require 1 approval
  ✅ Dismiss stale approvals
  ✅ Require review from Code Owners
✅ Require status checks to pass
  ✅ Require branches to be up to date
  ✅ All 6 status checks required
✅ Require conversation resolution
✅ Include administrators
✅ Require linear history
```

## Additional Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

If you encounter issues not covered in this guide:

1. Check the GitHub Actions logs for detailed error messages
2. Review the PR validation workflow file: `.github/workflows/pr-validation.yml`
3. Consult with repository administrators
4. Create an issue in the repository

---

**Last Updated**: 2025-12-29  
**Version**: 1.0.0
