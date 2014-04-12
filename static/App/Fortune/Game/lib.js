Ink.createModule('App.Fortune.Game', '1', ['App.Fortune', 'Ink.Data.Binding_1'], function(app, ko) {
	var width = 6;
	var height = 8;
	var modCount = 10;
	var snakeSprites = {0: 'snake-a', 1: 'snake-b', 2: 'snake-c', 3: 'snake-d', 4: 'snake-e'};
	var ladderSprites = {0: 'ladder-a', 1: 'ladder-b', 2: 'ladder-c', 3: 'ladder-e'};

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

        this.boardCells = ko.observableArray();
	};

    Module.prototype.initialize = function(data) {
        this.player('a');
        this.playerPos(0);
        
        this.randomizeBoard();
    };

    Module.prototype.snakeSprite = function() {
    	return snakeSprites[Math.floor(Math.random() * 4)];
    };
    
    Module.prototype.ladderSprite = function() {
    	return ladderSprites[Math.floor(Math.random() * 3)];
    };

    Module.prototype.randomizeBoard = function() {
    	var i, x, y;
    	var xPos, yPos, pos, pos2, tmp;
    	var modHeight;
    	var isSnake;
    	var boardSpace = [];
    	var isValid;
    	var iterCount = 0;
    	var shuffleBoard = [];
    	var boardCells = [];
    	var box;
    	
    	/*
    	 * Box types:
    	 *   N - Normal box
    	 *   L - Ladder box
    	 *   S - Snake box
    	 */
    	
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

    	for (i=0; i<width*height; i++) {
    		boardSpace[i] = 0;
        	x = i % width + 1;
        	y = Math.floor(i / width) + 1;
    		shuffleBoard[i] = {x: x, y: y}; 
    	}
    	
    	for (i=0; i<modCount; i++) {
    		isValid=false;
    		
    		isSnake = (Math.floor(Math.random() * 1000) % 2 == 0);

    		while (!isValid) {
        		iterCount++;

        		if (iterCount>width*height) {
        			window.setTimeout(this.randomizeBoard.bind(this), 0);
        			return;
        		}
        		
        		pos = Math.floor(Math.random()*shuffleBoard.length);
        		tmp = shuffleBoard.splice(pos, 1)[0];
        		
        		xPos = tmp.x;
        		yPos = tmp.y;
        		pos = (height-(yPos))*width+(xPos-1);
        		
        		if ( (isSnake && yPos == 1) || (!isSnake && yPos == height) || (xPos==1 && yPos==1) || (xPos==width && yPos==height)) {
        			continue;
        		}
        		
        		isValid = true;
        	
        		modHeight = Math.floor(Math.random() * (isSnake?yPos-1:height-yPos-1))+1;
        		
        		for (y=yPos; (isSnake?y>yPos-modHeight-1:y<yPos+modHeight+1); (isSnake?y--:y++)) {
        			if (boardSpace[y*width+xPos-1]==1) {
        				isValid=false;
        				break;
        			} else {
        				boardSpace[y*width+xPos-1]=1;
        			}
        		}
    		}
    		
    		if (isSnake) {
    	        boardCells[pos].snake = true;
    	        boardCells[pos].height = Math.floor(3.25*modHeight)+'em';
    	        boardCells[pos].action = this.doJump.bind(this, -width*modHeight);
    		} else {
    	        boardCells[pos].ladder = true;
    	        boardCells[pos].height = Math.floor(3.1*modHeight)+'em';
    	        boardCells[pos].action = this.doJump.bind(this, width*modHeight);
    		}
    	}
    	
    	this.boardCells(boardCells);
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

    	if (newPos==width*height-1) {
    		app.showConfirm('You have won !', 'Play again ?', function() {
    			self.initialize();
    		}, function() {
    			app.navigateTo('#home');
    		});
    		return;
    	}
    	
    	x = newPos % width + 1;
    	y = Math.floor(newPos / width) + 1;
    	
    	action=this.boardCells()[(height-y)*width+x-1].action;
    	
    	if (action) {
    		window.setTimeout(function() {
        		action();
        		self.cubeStoppedHandler(0);
    		}, 500);
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
