/**
 * @file
 *   Server-side non-object code
 */

Log.info('Server boot');

// Server is package-global, but not exported.
server = new DrupalServer(
  Accounts,
  Meteor,
  Log,
  stream,
  new DrupalConfiguration(DrupalBase.SERVICE_NAME, Meteor.settings, ServiceConfiguration)
);

// Store configuration in database.
server.configuration.persist();

// Declare automatic publications.
server.registerAutopublish();

// Register the package as an accounts service.
server.register();
