var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": 220 },
                { "type": "sawblade", "x": 600, "y": 300 },
                { "type": "sawblade", "x": 800, "y": 320 },
                { "type": "reward", "x": 1900, "y": groundY - 100},
                { "type": "obstacle", "x": 999, "y": 320},
                { "type": "enemy", "x": 680, "y": groundY - 50},
                { "type": "enemy", "x": 750, "y": groundY - 20}, 
                { "type": "sawblade", "x": 1500, "y": groundY - 100},   
            ]
        };

             


        for (var i = 0; i < levelData.gameItems.length; i++){ 
            var firstGameItemObject = levelData.gameItems[i];
            var firstX = firstGameItemObject.x;
            var firstY = firstGameItemObject.y;
            var firstType = firstGameItemObject.type;
            if (firstType === "sawblade") {
                createSawBlade(firstX, firstY);
            }
            if (firstType === "reward") {
                createCollectible(firstX, firstY);
            }
            if (firstType === "obstacle") {
                createAmong(firstX, firstY);
            }
            if (firstType === "enemy") {
                createEnemy(firstX, firstY);
           }
           levelData.gameItems[i] += firstGameItemObject
        }


        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);  

            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25
            obstacleImage.y = -25
        }

        //createSawBlade(400, 220);
        //createSawBlade(600, 300);
        //createSawBlade(800, 320);


        function createAmong(x,y) {  //TODO 8       name the function
            hitZoneSize = 20;
            damageFromObstacle = 15;
            createAmongHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        
            createAmongHitZone.x = x;
            createAmongHitZone.y = y;
            game.addGameItem(createAmongHitZone);  

            obstacleImage = draw.bitmap('img/a.PNG');  
            createAmongHitZone.addChild(obstacleImage);
            obstacleImage.x = -30
            obstacleImage.y = -20
        };

        //createAmong(999, 320);


        function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('img/3.png');
            redSquare.x = -20;
            redSquare.y = -20;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10

            enemy.onPlayerCollision = function hitHalle() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-20);
                enemy.fadeOut();
            };

            enemy.onProjectileCollision = function hitEnemy() {
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.shrink();
                enemy.fadeOut();
            };
        };


        //createEnemy(680,groundY-50);
        //createEnemy(700,groundY-20);




        function createCollectible(x, y) {       
            var collectible = game.createGameItem('collectible',25);
            var reward = draw.bitmap('img/unnamed.png');
            reward.x = -25;
            reward.y = -25;
            collectible.addChild(reward);
            collectible.x = x;
            collectible.y = y;
            game.addGameItem(collectible);
            collectible.velocityX = -1;

            collectible.onPlayerCollision = function hitHalle() {
                console.log('You got a collectible');
                game.increaseScore(200);
                game.changeIntegrity(20);
                collectible.fadeOut();
            };

        };

        //createCollectible (900,groundY-100);

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
