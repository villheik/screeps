var extensionBuilder = {
    run: function(room) {
        "use strict";
        if (Memory.roadsBuilt === true){
            var roads = Game.rooms[room].find(FIND_STRUCTURES, {
                filter: function(object){
                    if (object.structureType === STRUCTURE_ROAD &&
                        object.pos.getRangeTo(Game.rooms[room].find(FIND_STRUCTURES, {
                            filter: function(structure) {
                                if (structure.structureType === STRUCTURE_SPAWN) {
                                    return structure;

                                }
                            }
                        })[0]) < 3) {
                        return object;
                        }
                }});
                roads.forEach(function(road) {
                    var x = road.pos.x;
                    var y = road.pos.y;
                    if (Game.rooms[room].lookForAt(LOOK_STRUCTURES, x+1, y).length === 0 && Game.rooms[room].createConstructionSite(x+1, y, STRUCTURE_EXTENSION) === 0) {
                        console.log("Extension built");
                    }
                    if (Game.rooms[room].lookForAt(LOOK_STRUCTURES, x+1, y+1).length === 0 && Game.rooms[room].createConstructionSite(x+1, y+1, STRUCTURE_EXTENSION) === 0) {
                        console.log("Extension built");
                    }
                    if (Game.rooms[room].lookForAt(LOOK_STRUCTURES, x+1, y-1).length === 0 && Game.rooms[room].createConstructionSite(x+1, y-1, STRUCTURE_EXTENSION) === 0) {
                        console.log("Extension built");
                    }
                    if (Game.rooms[room].lookForAt(LOOK_STRUCTURES, x-1, y+1).length === 0  && Game.rooms[room].createConstructionSite(x-1, y+1, STRUCTURE_EXTENSION) === 0) {
                        console.log("Extension built");
                    }
                    if (Game.rooms[room].lookForAt(LOOK_STRUCTURES, x-1, y-1).length === 0  && Game.rooms[room].createConstructionSite(x-1, y-1, STRUCTURE_EXTENSION) === 0) {
                        console.log("Extension built");
                    }
                    if (Game.rooms[room].lookForAt(LOOK_STRUCTURES, x-1, y).length === 0  && Game.rooms[room].createConstructionSite(x-1, y, STRUCTURE_EXTENSION) === 0) {
                        console.log("Extension built");
                    }
                    if (Game.rooms[room].lookForAt(LOOK_STRUCTURES, x, y+1).length === 0  && Game.rooms[room].createConstructionSite(x, y+1, STRUCTURE_EXTENSION) === 0) {
                        console.log("Extension built");
                    }
                    if (Game.rooms[room].lookForAt(LOOK_STRUCTURES, x, y-1).length === 0  && Game.rooms[room].createConstructionSite(x, y-1, STRUCTURE_EXTENSION) === 0) {
                        console.log("Extension built");
                    }
                }, this);
        }
    }
}

module.exports = extensionBuilder;