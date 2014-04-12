Ink.createModule('App.Fortune.Shell', '1', ['App.Fortune', 'App.Fortune.Libs.Animation'], function(app, Animation) {
	var toggle;
	
    var Module = function() {
        var self=this;
        
        this.moduleName =  'App.Fortune.Shell';
        this.definedRoutes = app.definedRoutes;
        this.modalModule = app.modalModule;
        this.alertModule = app.alertModule;
        this.infoModule = app.infoModule;
        this.appTitle = app.appTitle;
    };

    Module.prototype.afterRender = function() {
        toggle=new Ink.UI.Toggle('#mainMenuTrigger');
    	app.signals.shellRendered.dispatch();
    };

    Module.prototype.handleBeforeModuleDestroy = function(element) {
    	var moduleEl=element.firstChild;

    	toggle._dismiss();
    	
    	ko.cleanNode(moduleEl); // Remove old module bindings
    	document.getElementById('tempContainer').appendChild(moduleEl);
    	element.style.display = 'none';

    	// Run the animation after the new new module is bound...
    	window.setTimeout(function() {
        	Animation(moduleEl)
        	.set('opacity', 0.5)
        	.translate(-500)
        	.duration('0.75s')
        	.then(function() {
            	element.style.display = 'block';
            	moduleEl.parentNode.removeChild(moduleEl);
        	})
    		.end();
    	}, 250);
    };

    return new Module();
});
