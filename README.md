# bf-employee-hr-portal

## Description
MERNA Full Stack Employee/HR website portal for managing the new employee onboarding process

## Github Workflow Guideline

1. Clone the Repository: Each team member should first clone the repository to their local machine. This can be done using the following Git command:

    `git clone [repository-url]`

2. Navigate to the project directory:

    `cd [project-directory]`

3. Switch to the Dev Branch: After cloning, team members should switch to the dev branch. They can do this by running:

    `git checkout dev`

4. Update the Local Dev Branch: Ensure that the local dev branch is up-to-date with the remote dev branch by pulling the latest changes:

    `git pull origin dev`

5. Create a Personal Feature Branch: Each team member should create a new branch off the dev branch for their specific feature or task. This can be done with:

    `git checkout -b feature/[feature-name]`
Replace [feature-name] with a meaningful name for the feature or task.

6. Work on the Feature: Team members can now start working on their tasks in their personal feature branches. They can make changes, commit them, and push these commits to their feature branch in the remote repository. For example:

    `git add .`

    `git commit -m "Add feature XYZ"`

    `git push origin feature/[feature-name]`

7. Keep the Feature Branch Updated: Regularly, team members should merge changes from the dev branch into their feature branch to keep it updated. This helps in reducing merge conflicts later. They can do this by:

    - Switching to their feature branch:

        `git checkout feature/[feature-name]`
    - Merging the dev branch:
        
        `git merge dev`

8. Code Reviews and Pull Requests: Once a feature is completed, team members should push their final changes to their feature branch and then open a pull request (PR) in GitHub to merge their feature branch into the dev branch. This PR should be reviewed by the team lead for code quality, functionality, and adherence to project standards. Please ensure that team members are filling out the description field on their PRs to describe what they accomplished with this PR.

9. Merge to Dev Branch: After the PR is approved, it can be merged into the dev branch. It's typically a good practice to use GitHub's interface to do this to maintain a record of the merge and any associated code reviews or discussions.

10. Regularly Update the Dev Branch: As features get merged into the dev branch, team members should regularly update their local dev branch and their feature branches with the latest changes.

11. Merging to Main Branch: Once the team'is ready to release or deploy some features, team lead will merge the dev branch into the main branch.


## Setting Up ESLint
We are using ESLint to enforce code quality and style guidelines. Please follow the steps below to set up ESLint in your local development environment.

### Install dependencies:
- server

    `cd server`

    `npm install`
- employee-client-react

    `cd employee-client-react`

    `npm install`

This will install ESLint and the necessary plugins as defined in package.json. for each folder.


## Configuring Visual Studio Code
### Install ESLint Extension
1. Open VS Code.
2. Go to Extensions (you can use the shortcut Ctrl+Shift+X).
3. Search for "ESLint" and install the extension provided by Dirk Baeumer.
### Update VS Code Settings:
1. To ensure that your VS Code editor follows the ESLint rules defined in .eslintrc.cjs, update your editor's settings: Go to File > Preferences > Settings (Ctrl+, on Windows/Linux, Cmd+, on macOS).
2. Search for eslint.
3. Make sure the following settings are configured:
```js
{
  "eslint.alwaysShowStatus": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
  ]
}
```

### Restart VS Code
After updating the settings, restart VS Code to ensure that the changes take effect.

