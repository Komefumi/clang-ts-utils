# Clang TS Utils

```bash
npm install clang-ts-utils
```

These are functions/utilities meant to make life easier

In the project's src note the for-all and for-node files. Exports from for-all can be used in all environments, while for-node is solely for node.js

In future, for-browser may be added

```javascript
const { toPascalCase, getPathForNeededFilesIfInDir, findUpwards } = require("clang-ts-utils");

console.log(toPascalCase("seki-des"));
console.log(__dirname);
getPathForNeededFilesIfInDir(__dirname, "lol").then((paths) => {
  console.log(paths);
});

findUpwards(__dirname, ".github-password").then((paths) => {
  console.log(paths);
});
```
