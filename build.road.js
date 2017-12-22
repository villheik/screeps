var roadBuilder = {
    run: function() {

        for (var spawn in Game.spawns) {
            var roomName = Game.spawns[spawn].pos.roomName;
            var sources = Game.rooms[roomName].find(FIND_SOURCES);
            
            sources.forEach( function (source) {
                var pathToSource = PathFinder.search(Game.spawns[spawn].pos, source.pos);
                pathToSource.path.forEach ( function (coord) {
                    Game.rooms[roomName].createConstructionSite(coord.x, coord.y, STRUCTURE_ROAD);
                });
                
                var pathToController = PathFinder.search(Game.spawns[spawn].pos, Game.rooms[roomName].controller.pos);
                pathToController.path.forEach (function (coord) {
                   Game.rooms[roomName].createConstructionSite(coord.x, coord.y, STRUCTURE_ROAD);
                });
            });

        }
    }
}

module.exports = roadBuilder;