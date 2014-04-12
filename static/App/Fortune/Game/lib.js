Ink.createModule('App.Fortune.Game', '1', ['App.Fortune', 'Ink.Data.Binding_1'], function(app, ko) {
	var width = 6;
	var height = 8;

	var Module = function() {
    	var self=this;
    	
        this.moduleName = 'App.Fortune.Game';
        
        this.player = ko.observable('a');
        this.playerIcon = ko.computed(function() {
        	return '/static/content/assets/player-'+self.player()+'.png';
        });
        
        this.playerPos = ko.observable(0);
        
        this.playerX = ko.computed(function() {
        	return '' + ((self.playerPos() % width)*3.5) + 'em';
        });
        
        this.playerY = ko.computed(function() {
        	return '' + ((Math.floor(self.playerPos() / width))*3) + 'em';
        });
        
        this.cancelAnim = undefined;
        this.startAnim = undefined;
    };

    Module.prototype.initialize = function(data) {
    	var self=this;
    	var i, x, y;
    	var box;
    	var boardCells = [];
    	
    	/*
    	 * Box types:
    	 *   N - Normal box
    	 *   L - Ladder box
    	 *   S - Snake box
    	 */
    	
        this.player('a');
        this.playerPos(0);
        
        for (y=height-1; y>=0; y--) {
        	for (x=0; x<width; x++) {
            	box = {
	        	    number: y*width+x+1,
	        	    ladder: false,
	        	    snake: false
                };
            	
            	boardCells.push(box); 
        	}
        }
        
        boardCells[34].ladder = true;
        boardCells[34].height = '9.3em';
        boardCells[34].action = this.doJump.bind(this, width);
        
        boardCells[14].snake = true;
        boardCells[14].height = '6.5em';
        boardCells[14].action = this.doJump.bind(this, -width);
        
        this.boardCells = ko.observableArray(boardCells);
    };

    Module.prototype.doJump = function(length) {
    	this.playerPos(this.playerPos()+length);
    };
    
    Module.prototype.finalize = function() {
    	if (this.cancelAnim) {
    		this.cancelAnim();
    	}
    };
    
    Module.prototype.cubeReadyHandler = function(startAnim, cancelAnim) {
    	this.startAnim = startAnim;
    	this.cancelAnim = cancelAnim;
    };

    Module.prototype.cubeStoppedHandler = function(pos) {
    	var self=this;
    	var newPos=this.playerPos()+pos;
    	var x;
    	var y;
    	var action;
    	
    	if (newPos>width*height-1) {
    		newPos=(width*height-1)*2-newPos;
    	}

    	this.playerPos(newPos);

    	x = newPos % width;
    	y = Math.floor(newPos / width);
    	action=this.boardCells[(height-y)*width+(width-x)];
    	
    	console.log('x:'+x+', y:'+y+', pos:'+((height-y)*width+(width-x)));
    	
    	if (action) {
    		action();
    		newPos = this.playerPos();
    	}
    	
    	if (newPos==width*height-1) {
    		app.showConfirm('You have won !', 'Play again ?', function() {
    			self.initialize();
    		}, function() {
    			app.navigateTo('#home');
    		});
    	}
    };
    
    Module.prototype.drawDice = function() {
    	var self=this;
    	
    	this.startAnim();
    	window.setTimeout(function() {
    		self.cancelAnim();
    	}, 800);
    };

    return new Module();
});
