# Release Setup Guide

## Using Personal Access Token (Alternative)

If you continue having permission issues with the default GITHUB_TOKEN, you can use a Personal Access Token:

1. Create a Personal Access Token:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with these permissions:
     - `repo` (full repository access)
     - `write:packages` (if publishing packages)

2. Add the token as a repository secret:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add new secret named `RELEASE_TOKEN`

3. Update the workflow to use the PAT:
   ```yaml
   - name: Release Please
     id: release
     uses: googleapis/release-please-action@v4
     with:
       token: ${{ secrets.RELEASE_TOKEN }}  # Use PAT instead of GITHUB_TOKEN
       config-file: .release-please-config.json
       manifest-file: .release-please-manifest.json
   ```

## Required Labels

Release-please will create these labels automatically:
- `autorelease: pending` - For pending releases
- `autorelease: tagged` - For tagged releases

You can also pre-create them manually in your repository settings.
