# PomoCat

Cross platform pomodoro app built with Typescript, GraphQL, and React Native.

## Repo Structure
This repository is setup using [Lerna](https://github.com/lerna/lerna), a tool to make managing monorepos easier.

Inside the `packages` folder are various packages that are used by PomoCat, such as the mobile app, backend, and shared files (such as GraphQL definitions).

## Tooling
The GraphQL code generator is used throughout the application to reduce the amount of handwritten boilerplate.

To generate MongoDB objects, Apollo React hooks, and other code, run `lerna run generate` in the root, or navigate to the `Shared` package and run `yarn generate`. This will create typescript files in the Backend and mobile repos.


