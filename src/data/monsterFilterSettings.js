const maxLevel = 36;
const combat_roles = [
    'Brute',      'Artillery',
    'Skirmisher', 'No Role',
    'Soldier',    'Leader',
    'Controller', 'Lurker'
  ]
const group_roles = [ 'Elite', 'Minion', 'Standard', 'Solo', 'Conjured' ];
const monster_sizes = [ 'Medium', 'Small', 'Tiny', 'Large', 'Huge', 'Gargantuan' ];
const races = [
    'Elf',          'Fey',         'Humanoid',     'Beast',       'Natural',
    'Human',        'Reptile',     'Plant',        'Animate',     'Undead',
    'Elemental',    'Magical',     'Half-elf',     'Aquatic',     'Mount',
    'Aberrant',     'Air',         'Earth',        'Dwarf',       'Dragon',
    'Cold',         'Goblin',      'Swarm',        'Orc',         'Fire',
    'Water',        'Blind',       'Ooze',         'Halfling',    'Kobold',
    'Demon',        'Construct',   'Shapechanger', 'Shadow',      'Spider',
    'Eladrin',      'Shifter',     'Homunculus',   'Dragonborn',  'Drow',
    'Genasi',       'Tiefling',    'Gnome',        'Half-orc',    'Familiar',
    'Immortal',     'Lizardfolk',  'Devil',        'Wight',       'Gnoll',
    'Modron',       'Living',      'Hobgoblin',    'Bladeling',   'Ghoul',
    'Barghest',     'Shadar-kai',  'Wereboar',     'Giant',       'Troglodyte',
    'Doppelganger', 'Orog',        'Duergar',      'Minotaur',    'Bugbear',
    'Yuan-ti',     'Angel',        'Vampire',      'Ogre',        'God',
    'Goliath',      'Satyr',       'Changeling',   'Shulassakar', 'Troll',
    'Inspired',     'Dryad',       'Sphinx',       'Ghost',       'Werewolf',
    'Deva',         'Thunder',     'Shunned',      'Treant',      'Sahuagin',
    'Warforged',    'Magebred',    'Hydra',        'Githyanki',   'Githzerai',
    'Lightning',    'Shade',       'Slaad',        'Quori',       'Mimic',
    'Grimlock',     'Roc',         'Girallon',     'Rakshasa',    'Primordial',
    'Exalted',      'Hag',         'Raavasta',     'Swordwing',   'Phane',
    'Sorrowsworn', 'Marilith',    
  ];

  export {maxLevel,combat_roles,group_roles,races,monster_sizes}