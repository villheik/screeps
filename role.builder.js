var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                var roadToRepair = creep.room.find(FIND_STRUCTURES, {
                    filter: function(object) {
                        return object.structureType === STRUCTURE_ROAD && (object.hits > object.hitsMax / 3);
                    }
                });
                if (roadToRepair.length) {
                    roadToRepair.sort((a, b) => a.hits - b.hits);
                    if (creep.repair(roadToRepair[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(roadToRepair[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else {
                    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var source = null;
            if (sources.length > 1) {
                
                if (creep.memory.energyTarget % 2 === 0){
                    source = sources[0];
                }
                else {
                    source = sources[1];
                }
            }
            else {
                source = sources[0];
            }
            
            if(creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;