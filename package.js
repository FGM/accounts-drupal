/**
 * @file
 *   Package description file for accounts-drupal.
 */

// Dependencies.
const coreDependencies = [
  'accounts-base',
  'check',
  'ecmascript',
  'http',
  'logging',
  'mongo',
  'random',
  'service-configuration',
  'tracker',
  'underscore',
  'webapp'
];

Package.describe({
  name: 'fgm:accounts-drupal',
  version: '0.4.3',
  summary: 'A Meteor 1.8 accounts system using cookie-based login on a Drupal 8 or Symfony server.',
  git: 'https://github.com/fgm/accounts-drupal',
  documentation: 'README.md'
});

Package.onUse(api => {
  api.versionsFrom('1.8');

  api.use(coreDependencies);
  api.use(['templating@1.3.2'], { weak: true });

  api.use('rocketchat:streamer@1.0.2');

  // Do NOT use "client" and "server" directory names to avoid losing the 1.8 bundler.
  api.mainModule('cl/clientMain.js', 'client');
  api.mainModule('sv/serverMain.js', 'server');
});

Package.onTest(api => {
  api.use(coreDependencies);

  // jQuery is needed for the meteortesting:mocha UI.
  api.use(['jquery']);

  api.use('fgm:accounts-drupal');
  api.use(['meteortesting:mocha']);

  api.addFiles('sv/DrupalConfiguration.js', 'server');
  api.addFiles('sv/serverTests.js', 'server');

  api.mainModule('cl/tests.js', 'client');
  api.mainModule('sv/tests.js', 'server');
});
