var roadBuilder = {
    run: function() {

        for (var spawn in Game.spawns) {
            Memory.roomName = Game.spawns[spawn].pos.roomName;
            Memory.controllerGoal = { pos: Game.rooms[Memory.roomName].controller.pos, range : 1 };
            //Surround spawns with roads
            if (Game.rooms[Memory.roomName].createConstructionSite(Game.spawns[spawn].pos.x+1, Game.spawns[spawn].pos.y, STRUCTURE_ROAD) !== ERR_INVALID_TARGET);
            if (Game.rooms[Memory.roomName].createConstructionSite(Game.spawns[spawn].pos.x+1, Game.spawns[spawn].pos.y+1, STRUCTURE_ROAD) !== ERR_INVALID_TARGET);
            if (Game.rooms[Memory.roomName].createConstructionSite(Game.spawns[spawn].pos.x+1, Game.spawns[spawn].pos.y-1, STRUCTURE_ROAD) !== ERR_INVALID_TARGET);
            if (Game.rooms[Memory.roomName].createConstructionSite(Game.spawns[spawn].pos.x, Game.spawns[spawn].pos.y+1, STRUCTURE_ROAD) !== ERR_INVALID_TARGET);
            if (Game.rooms[Memory.roomName].createConstructionSite(Game.spawns[spawn].pos.x, Game.spawns[spawn].pos.y-1, STRUCTURE_ROAD) !== ERR_INVALID_TARGET);
            if (Game.rooms[Memory.roomName].createConstructionSite(Game.spawns[spawn].pos.x-1, Game.spawns[spawn].pos.y, STRUCTURE_ROAD) !== ERR_INVALID_TARGET);
            if (Game.rooms[Memory.roomName].createConstructionSite(Game.spawns[spawn].pos.x-1, Game.spawns[spawn].pos.y+1, STRUCTURE_ROAD) !== ERR_INVALID_TARGET);
            if (Game.rooms[Memory.roomName].createConstructionSite(Game.spawns[spawn].pos.x-1, Game.spawns[spawn].pos.y-1, STRUCTURE_ROAD) !== ERR_INVALID_TARGET);
            
            
            let sources = _.map(Game.rooms[Memory.roomName].find(FIND_SOURCES), function(source) {
                return { pos: source.pos, range: 1 };
              });
            
            sources.forEach( function (sources) {                
                var pathToSource = PathFinder.search(Game.spawns[spawn].pos, sources);
                pathToSource.path.forEach ( function (coord) {
                    if (Game.rooms[Memory.roomName].createConstructionSite(coord.x, coord.y, STRUCTURE_ROAD) !== ERR_INVALID_TARGET);
                });
                
                let pathToController = PathFinder.search(sources.pos, Memory.controllerGoal);
                
                pathToController.path.forEach (function (coord) {
                    if (Game.rooms[Memory.roomName].createConstructionSite(coord.x, coord.y, STRUCTURE_ROAD) !== ERR_INVALID_TARGET);
                });
            });

            let pathToController = PathFinder.search(Game.spawns[spawn].pos,
                { pos: Game.rooms[Memory.roomName].controller.pos, range : 1 });
            pathToController.path.forEach (function (coord) {
               if (Game.rooms[Memory.roomName].createConstructionSite(coord.x, coord.y, STRUCTURE_ROAD) !== ERR_INVALID_TARGET);
            });
        }
    }
}

module.exports = roadBuilder;