var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


module.exports.loop = function () {
    if (Memory.roadsBuilt === false) {
        var roadBuilder = require('build.road');
        roadBuilder.run();
        Memory.roadsBuilt = true;
    }
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var extensionBuilder = require('build.extension');
    extensionBuilder.run(Memory.roomName);
    var harvesters  = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    var upgraders   = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    var builders    = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    var testIfCanSpawn = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE], 
        'Worker1', { dryRun: true });
    if (testIfCanSpawn === 0) {
        if(harvesters.length < 2) {
            let newName = "Harvester" + Memory.harvesterIter++;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvester', energyTarget: Memory.harvesterIter}});
        }

        else if(upgraders.length < 4) {
            let newName = "Upgrader" + Memory.namesIter++;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                {memory: {role: 'upgrader', energyTarget: Memory.namesIter}});
        }

        else if(builders.length < 3) {
            let newName = "Builder" + Memory.namesIter++;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                {memory: {role: 'builder', energyTarget: Memory.namesIter}});
        }

    }
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(let name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
    }

    
}