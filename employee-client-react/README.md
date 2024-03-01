# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Naming

## Components

### File Names:

Use PascalCase for React component filenames. For example, UserProfile.jsx.

### Component Names:

The name of the component should match the filename. For instance, UserProfile component in UserProfile.jsx.

### Folder Structure:

If a component has multiple supporting files (like styles, tests), group them in a folder with the component's name. For example,

- UserProfile/UserProfile.jsx
- UserProfile/UserProfile.test.jsx
- UserProfile/UserProfile.css

## Pages (for projects using React Router or similar):

- Use PascalCase for page component filenames, like HomePage.jsx or AboutUs.jsx.
- Keep page components in a separate directory, typically named pages or views.

## Interceptors (for API calls, logging, etc.):

- Use camelCase for interceptor file names, like apiInterceptor.js.
- Group related interceptors in a specific folder, such as interceptors.

## Redux Store Files:

- Actions: Use camelCase for action file names. For grouped actions, use a folder with a relevant name, like userActions.js in a user folder.
- Reducers: Follow camelCase naming. For combined reducers, use a relevant folder structure, like userReducer.js in a user folder.
- Constants: Use UPPER_SNAKE_CASE for constant values, typically stored in files like actionTypes.js or constants.js.
- Selectors: Use camelCase and name them descriptively, like getUserData.js or isLoading.js.

## Hooks:

- Use camelCase and prefix custom hooks with use, like useFetch.js or useFormValidation.js.

## Utilities and Helpers:

- Name utility files in camelCase and describe their purpose, such as formatDate.js or calculateTotal.js.

## Styles:

- When using CSS modules, name the style files similarly to their component counterparts, like UserProfile.module.css.
- For global styles, use descriptive names like globalStyles.css or theme.css.

## Tests:

- Name test files with the .test or .spec suffix, matching the name of the component or function they test, such as UserProfile.test.jsx or apiUtils.spec.js.
