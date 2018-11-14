# Accounts-drupal

This is an accounts package for Meteor 1.2 to 1.8, using Drupal or pure Symfony
backend sessions transparently:

- The Meteor app is configured to use a specific backend server for sessions
- Any user with a session on the backend server is automatically logged in on
  Meteor, without any UI-level intervention
- Switching from anonymous to authenticated (and vice-versa) on the backend
  server automatically refreshes the status on connected Meteor applications
- Changes in the backend user account fields and roles reflects in real-time on
  connected Meteor applications.
- No dependency on [Drupal DDP] nor any intervening `ddp.js` Node server.


## Requirements

- Meteor 1.2.x to 1.8.x
- For the backend site: either Drupal 8.0.x to 8.6.x or Symfony 3.4.x or 4.x.
- Either:
  - The Drupal [meteor module] from FGM's Github, not to be confused with the
    existing [meteor sandbox] from drupal.org.
  - Equivalent support in a Symfony backend. Such existing code is currently
    only available as proprietary. The issue for an Open Source version is
    https://github.com/fgm/meteor/issues/8
- The cookie domain for the Meteor application *must* be the same or a subdomain
  of the backend site. This is a consequence of [cookie scope]. Using the same
  domain on different IP ports works, as long as the backend cookies settings:
  - do not include the port number (included by default in Symfony)
  - do not marked the cookie as HTTP only (marked by default in Symfony)

- If the Template package is present, Blaze helpers will be available, but that
  package is not a requirement.

[cookie scope]: https://en.wikipedia.org/wiki/HTTP_cookie#Domain_and_Path
[meteor module]: https://github.com/FGM/meteor
[meteor sandbox]: https://www.drupal.org/sandbox/rgarand/2020935
[Drupal DDP]: https://www.drupal.org/sandbox/bfodeke/2354859


### Updaters note after package version 0.2.6

If you disabled update buffering on the client using code like the fragment
below to support Meteor 1.3.3 and later with earlier versions of this package
which relied on `arunoda:streams` or the `fgm:streams` fork, this is no longer
needed:

    Meteor.startup(function () {
      Meteor.connection._bufferedWritesInterval = 0;
    });

The package now uses `rocketchat:streamer` instead, so you *should* remove this
line to take advantage of the buffered writes present since Meteor 1.3.3.

<!--
# Running a demo
# Configuring the package
## Drupal configuration
## Meteor configuration
# Logging in and out
-->

# Running tests

The package can be tested once added to an application. Note that the
`test-packages` command needs a `--settings` argument like a normal application
launch. This can be the example settings file from the package.

    cd <your application>
    meteor add accounts-drupal

    # Run the package test suite. Assuming the package has been installed
    # locally, you can use its example.settings.json, otherwise use yours.
    meteor test-packages fgm:accounts-drupal --settings packages/accounts-drupal/example.settings.json

    # Open your browser at http://localhost:3000 to observe the test results.

Remember not to have a running instance of the application already using port
3000 to avoid IP binding conflicts.
