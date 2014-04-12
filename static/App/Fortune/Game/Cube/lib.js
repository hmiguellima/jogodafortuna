Ink.createModule('App.Fortune.Game.Cube', '1', ['App.Fortune', 'Ink.Data.Binding_1', 'App.Fortune.Libs.Animation'], function(app, ko, Animation) {
    var Module = function(data) {
    	var self=this;
    	
        this.moduleName = 'App.Fortune.Game.Cube';
        
        this.face=ko.observable(1);
        
        this.aVisible = ko.computed(function() {
        	return (self.face()==1);
        });
        
        this.bVisible = ko.computed(function() {
        	return (self.face()==2);
        });

        this.cVisible = ko.computed(function() {
        	return (self.face()==3);
        });
        
        this.dVisible = ko.computed(function() {
        	return (self.face()==4);
        });

        this.eVisible = ko.computed(function() {
        	return (self.face()==5);
        });

        this.fVisible = ko.computed(function() {
        	return (self.face()==6);
        });
        
        this.cubeReadyHandler = data.cubeReady;
        this.cubeStoppedHandler = data.cubeStopped;
        
        this.animated = false;
    };
    
    Module.prototype.afterRender = function() {
    	this.cubeReadyHandler(this.beginAnimation.bind(this), this.cancelAnimation.bind(this));
    };

    Module.prototype.animate = function() {
    	var self = this;
    	
		Animation(document.getElementById('dice'))
	  		.y(-10)
	  		.duration('0.1s')
	  		.then()
	  			.y(10)
	  			.duration('0.1s')
		  		.then(function() {
		  			if (self.animated) {
		  				window.setTimeout(function() {
		  					self.changeNumber();
		  					self.animate();
		  				});
		  			} else {
		  				self.cubeStoppedHandler(self.face());		  				
		  			}
		  		})
		  		.pop()
	  		.end();
    };
    
    Module.prototype.beginAnimation = function() {
    	var self=this;

    	this.animated = true;
    	
    	window.setTimeout(function() {
    		self.animate();
    	}, 0);
    };

    Module.prototype.cancelAnimation = function() {
    	this.animated = false;
    };
    
    Module.prototype.changeNumber = function() {
    	var oldFace=this.face();
    	var newFace=oldFace
    	
    	while (newFace==oldFace) {
        	newFace=Math.floor((Math.random()*6)+1);
    	}
    	
    	this.face(newFace);
    };
    
    return Module;
});
