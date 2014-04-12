Ink.createModule('App.Fortune.Splash', '1', ['App.Fortune', 'Ink.Data.Binding_1'], function(app, ko) {
    var Module = function() {
        this.moduleName = 'App.Fortune.Splash';
    };

    Module.prototype.initialize = function(data) {
    	window.setTimeout(function() {
    		app.navigateTo('#home');
    	}, 3000);
    };

    return new Module();
});
