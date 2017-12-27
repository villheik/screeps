var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.transfer && creep.carry.energy === 0) {
            creep.memory.transfer = false;
        }

        if (creep.carry.energy >= 50) {
            creep.memory.transfer = true;
        }
        
        if(!creep.memory.transfer) {
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
            
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            let closest = creep.pos.findClosestByPath(FIND_MY_CREEPS,{ filter: function(o) { if (o.memory.role !== 'harvester' && o.carry.energy !== o.carryCapacity) return o;}});
            if (creep.transfer(closest, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.memory.transfer = false;
            }
            else {
                creep.memory.transfer = true;
            }
        }
    }
};

module.exports = roleHarvester;