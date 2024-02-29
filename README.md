# bf-employee-hr-portal

## Description

MERNA Full Stack Employee/HR website portal for managing the new employee onboarding process

## Github Workflow Guideline

1.  Clone the Repository: Each team member should first clone the repository to their local machine. This can be done using the following Git command:

    `git clone [repository-url]`

2.  Navigate to the project directory:

    `cd [project-directory]`

3.  Switch to the Dev Branch: After cloning, team members should switch to the dev branch. They can do this by running:

    `git checkout dev`

4.  Update the Local Dev Branch: Ensure that the local dev branch is up-to-date with the remote dev branch by pulling the latest changes:

    `git pull origin dev`

5.  Create a Personal Feature Branch: Each team member should create a new branch off the dev branch for their specific feature or task. This can be done with:

        `git checkout -b feature/[feature-name]`

    Replace [feature-name] with a meaningful name for the feature or task.

6.  Work on the Feature: Team members can now start working on their tasks in their personal feature branches. They can make changes, commit them, and push these commits to their feature branch in the remote repository. For example:

    `git add .`

    `git commit -m "Add feature XYZ"`

    `git push origin feature/[feature-name]`

7.  **Pull Requests**

    Once your feature is compeleted and unit tests have been performed and documented, a Pull Request should be generated on Github. Before generating a new PR, ensure that your current feature branch's head is up to date with the remote dev branch's head to
    avoid merging older code or running into merge conflicts. The Rebasing Strategy is most commonly used.

    - Checkout your local dev branch

      `git checkout dev`

    - Perform a "git pull" to ensure your local dev branch is synced with the remote dev branch

      `git pull origin dev`

    - Checkout your feature branch

      `git checkout feature/[feature-name]`

    - Perform a "git rebase" to rebase the head of your current feature branch to align with your now updated local dev branch

      `git rebase dev`

    - Commit and push, then your local feature branch and remote feature branch are up to date with the remote dev branch.

      `git commit`

      `git push origin feature/[feature-name]`

8.  Code Reviews and Pull Requests: Once a feature is completed, team members should push their final changes to their feature branch and then open a pull request (PR) in GitHub to merge their feature branch into the dev branch. This PR should be reviewed by the team lead for code quality, functionality, and adherence to project standards. Please ensure that team members are filling out the description field on their PRs to describe what they accomplished with this PR.

9.  Merge to Dev Branch: After the PR is approved, it can be merged into the dev branch. It's typically a good practice to use GitHub's interface to do this to maintain a record of the merge and any associated code reviews or discussions.

10. Regularly Update the Dev Branch: As features get merged into the dev branch, team members should regularly update their local dev branch and their feature branches with the latest changes.

11. Merging to Main Branch: Once the team'is ready to release or deploy some features, team lead will merge the dev branch into the main branch.

## Setting Up ESLint in React Folder and Express Server Folder, and Prettier for Angular Folder

### React and Express

We are using ESLint to enforce code quality and style guidelines. Please follow the steps below to set up ESLint in your local development environment.

### Install dependencies:

- server

  `cd server`

  `npm install`

- employee-client-react

  `cd employee-client-react`

  `npm install`

This will install ESLint and the necessary plugins as defined in package.json. for each folder.

### We use Prettier for the Angular folder

- hr-client-angular

      `cd hr-client-angular`

      `npm install`

  This will install Prettier and the necessary plugins as defined in package.json. for each folder.

## Configuring Visual Studio Code To Ensure A Consistent Code Formatting Style

### Install ESLint Extension And Setup settings.json for VS Code

1. Open VS Code.
2. Open Extensions Side Menu, search ESlint and install ESLint
3. Open Command Palette...(macOS: Cmd + Shift + p)
4. Search for "Preferences Open User Settings (JSON)", click on the "Preferences Open User Settings (JSON)" icon. This will open the settings.json file.
5. **Make sure the following settings are removed or comment out**, to avoid language-specific formatters, so that vscode will prioritize the .vscode/settings.json under each project folder:

```js
{
  //   "editor.codeActionsOnSave": {
  //     "source.fixAll.eslint": "explicit"
  //   },
  //   "eslint.validate": ["javascript", "javascriptreact"],
  //   "[javascript, javascriptreact]": {
  //     "editor.defaultFormatter": "esbenp.prettier-vscode"
  //   },
  //   "[typescript]": {
  //     "editor.defaultFormatter": "esbenp.prettier-vscode"
  //   },
  //   "editor.defaultFormatter": "esbenp.prettier-vscode",
}
```

### Install Prettier Extension
Install the Prettier extension for VS Code and to enable the "Format on Save" feature

### Restart VS Code

After updating the settings, you might need to restart VS Code to ensure that the changes take effect.

### Prettier for Angular

You can run this follow script to tells Prettier to format all TypeScript, HTML, CSS, and SCSS files in your src directory. Adjust the file patterns as needed for your project.

`npm run format`

This command will format all files in your project according to the rules defined in .prettierrc
