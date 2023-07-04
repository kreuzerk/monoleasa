const libName = 'baz';
const libPath = `libs/${libName}`;
const artifactName = libName;
module.exports = {
  name: libName,
  pkgRoot: `dist/${libPath}`,
  tagFormat: artifactName + '-v${version}',
  commitPaths: [`${libPath}/*`],
  assets: [`${libPath}/README.md`, `${libPath}/CHANGELOG.md`],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `${libPath}/CHANGELOG.md`,
      },
    ],
    '@semantic-release/npm',
    ["@semantic-release/exec", {
      prepareCmd: 'VERSION=${nextRelease.version} npm run bump-version:' + libName + ' && PACKAGE_NAME=@kreuzerk/baz VERSION=${nextRelease.version} npm run update-deps',
    }],
    [
      '@semantic-release/git',
      {
        assets: [`${libPath}/package.json`, `${libPath}/CHANGELOG.md`],
        message:
          `chore(release): ${artifactName}` +
          '-v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
