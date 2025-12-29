# Branch Protection Setup Guide

This guide explains how to set up branch protection rules for the main branch of your repository.

## Prerequisites

- Repository admin access
- GitHub account with appropriate permissions

## Setup Steps

### 1. Navigate to Branch Protection Settings

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Click on "Branches" in the left sidebar
4. Under "Branch protection rules", click "Add rule"

### 2. Configure Protection Rules

#### Branch Name Pattern

- Enter `main` as the branch name pattern

#### Protection Settings

Enable the following rules:

- **Require a pull request before merging**
  - Require approvals: 1
  - Dismiss stale pull request approvals when new commits are pushed
  - Require review from Code Owners (if applicable)
- **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Add status checks:
    - CI tests
    - Linting
    - Build verification
- **Require conversation resolution before merging**
- **Require signed commits** (optional but recommended)
- **Require linear history** (optional)
- **Include administrators** (applies rules to admins too)

### 3. Additional Recommended Settings

- **Restrict who can push to matching branches**: Limit to specific users/teams
- **Allow force pushes**: Disabled (recommended)
- **Allow deletions**: Disabled (recommended)

## Verification

After setting up branch protection:

1. Try to push directly to main (should be blocked)
2. Create a PR and verify that checks run
3. Verify that approval is required before merging

## Common Issues

### Issue: Can't push to main

**Solution**: This is expected. Create a feature branch and submit a PR instead.

### Issue: Status checks not appearing

**Solution**: Ensure your CI/CD workflow is properly configured and has run at least once.

### Issue: Need to bypass protection temporarily

**Solution**: If you're an admin, you can temporarily disable protection rules, but this is not recommended.

## Best Practices

1. Always work on feature branches
2. Keep pull requests small and focused
3. Ensure all tests pass before requesting review
4. Address review comments promptly
5. Keep your branch up to date with main

## Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)

## Support

If you encounter issues with branch protection setup, please:

1. Check the GitHub documentation
2. Review repository settings
3. Contact your repository administrator
4. Open an issue in the repository
