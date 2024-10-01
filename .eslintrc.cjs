module.exports = {
  extends: ["next/core-web-vitals"],
  root: true,
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
}