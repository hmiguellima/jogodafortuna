/*
 * Application bootstrap
 * 
 * - Setup Ink lib paths
 * - Require app module 
 * 
 */
Ink.setPath('App', 'App/');
Ink.setPath('Ink', 'libs/Ink/');

Ink.requireModules(['App.Fortune'], function(app) {
    app.run();
});