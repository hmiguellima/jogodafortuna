/**
 * @module App.Fortune
 * @desc This is the application main app module (inherits from Ink.App)
 * @version 1
 */    

Ink.createModule('App.Fortune', '1', ['Ink.App_1', 'Ink.Data.Binding_1', 'Ink.Plugin.Signals_1', 'Ink.Data.Grid_1', 'Ink.Data.AutoComplete_1'], function(App, ko, Signal) {
    
    // App constructor (only data initialization logic)
    var Module = function() {
        App.call(this, 'splash', 'splash'); // Call the base initialization logic (set default route, undefined route)

        this.appTitle = 'Fortune Game';
    };
    
    Module.prototype = new App();
    Module.constructor = Module;

    /*
     * Define routing maps
     * 
     */
    Module.prototype.listVisibleRoutes = function() {
        return [
          {isActive: ko.observable(true), caption: 'Home', hash: 'home', module: 'App.Fortune.Home', arguments: {}}
          /*
          {isActive: ko.observable(true), caption: 'Incomplete', hash: 'incomplete', module: 'App.Tasks.Home', arguments: {filter: 'incomplete'}},
          {isActive: ko.observable(true), caption: 'Completed', hash: 'completed', module: 'App.Tasks.Home', arguments: {filter: 'complete'}}
          */
        ];
    };

    Module.prototype.listInvisibleRoutes = function() {
        return [
          {hash: 'splash', module: 'App.Fortune.Splash'},
          {hash: 'game', module: 'App.Fortune.Game'}
          /*
          {hash: 'edit\\?id=:id', module: 'App.Tasks.EditTask'}
          */
        ];
    };
    

    /*
     * UI signals setup
     * 
     */
    Module.prototype.addCustomSignals = function() {
    	/*
    	this.signals.taskAdded = new Signal();
    	this.signals.taskUpdated = new Signal();
    	*/
    };

    /*
     * Application startup logic
     * 
     */
    Module.prototype.ready = function() {
        /// Do your custom initialization stuff here, and then call start();
        this.start();
    };
    
    return new Module();
});
