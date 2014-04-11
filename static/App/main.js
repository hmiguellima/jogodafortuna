/*
 * Application bootstrap
 * 
 * - Setup Ink lib paths
 * - Require app module 
 * 
 */
Ink.setPath('App', '/static/App/');
Ink.setPath('Ink', '/static/libs/Ink/');

Ink.requireModules(['App.Fortune'], function(app) {
    app.run();
});