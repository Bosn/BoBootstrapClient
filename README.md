# BoBootstrapClient

Bosn's bootstrap project for React + Redux + Material UI + TypeScript, this is the client-side repository, related server-side repository can be found [here](https://github.com/bosn/BoBootstrapServer)

### Architecture

* Language & Framework : TypeScript / React
* State management: Redux
* Async flow: Redux-saga
* Router: React-router
* API: Redux-api-middleware
* State cache: Reselect
* UI: Material UI
* Pack: Webpack 4 / Babel
* Charts: Recharts

### First Run

#### 0. NPM install

Make sure you have Node.js installed. [Node Offical](https://nodejs.org/)

```bash
npm i
```

#### 1. TypeScript compile

Make sure you install TypeScript compiler by running `sudo npm i -g TypeScript`

```bash
tsc
```

### 2. Build DLL files

For enhancing development experience, we one-time compile vendor libs to DLL file, this can save our build time when code changing. This step will be redo only if your depencencies changed. Names of packed packages would be found in `config/webpack.lib.config.js`.

```bash
npm run build:dll
```

### 5. Startup node server

Now you can run the development static web server with hot reload. Your web server will be served via `localhost:4000`, but you should use Nginx (In project BoBootstrapServer/conf/nginx.dev.conf) to proxy to your test domain.

```bash
npm run dev
```

### File Structure

| Directory   |  Comments |
|:----------:|:-------------|
| .vscode | VSCode IDE files |
| config | Webpack configuration files, base for shared config, `dev` for development, `lib` for DLL compilation, `pre` for pre-publishing server, `prod` for production, `test` for testing. |
| src | TypeScript source code |
| src/app/routes | Route files |
| src/app/state/ducks | Redux & type files |
| src/app/state/ducks/**/actions.ts | Redux action files |
| src/app/state/ducks/**/reducers.ts | Redux reducer files |
| src/app/state/ducks/**/sagas.ts | Redux-saga files for manipulating side effects |
| src/app/state/ducks/**/selectors.ts | Cached state selector |
| src/app/state/ducks/**/types.ts | TypeScript declaration definations |
| src/app/state/ducks/**/schemas.ts | Using `normalizr` to transform server data, for flexible data manipulating |
| src/app/state/ducks/**/funcs.ts | Utility functions in the module |
| src/app/state/sharedConsts | shared const files between server-side and client-side |
| src/app/state/store | Redux store configurations |
| src/app/types | TypeScript declaration files |
| src/app/utilities | Utility files in global |
| src/app/views | React components |
| src/app/views/components | Components for presentational layer, usually can be reused in different pages |
| src/app/views/layout | Layout files, placed menu, navigator, containers here |
| src/app/views/pages | Pages for router |
| src/entry.tsx | Main entry of app |
| src/index.html | React index.html template |
| test | Test case files |
| tsconfig.json | Configuration file for TypeScript compiler |
| tslint.json | Configuration file for TSLint |
