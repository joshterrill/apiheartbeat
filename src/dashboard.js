const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen()

const grid = new contrib.grid({rows: 12, cols:12, screen: screen})

const table =  grid.set(1, 1, 10, 10, contrib.table, {
  keys: true,
  fg: 'green',
  label: 'Active Processes',
  columnSpacing: 1,
  columnWidth: [24, 10, 10],
});

const commands = ['grep', 'node', 'java', 'timer', '~/ls -l', 'netns', 'watchdog', 'gulp', 'tar -xvf', 'awk', 'npm install']

//set dummy data for table
function generateTable() {
  const data = []

  for (let i=0; i<30; i++) {
    const row = []
    row.push(commands[Math.round(Math.random()*(commands.length-1))])
    row.push(Math.round(Math.random()*5))
    row.push(Math.round(Math.random()*100))

    data.push(row)
  }

  table.setData({headers: ['Process', 'Cpu (%)', 'Memory'], data: data})
}

generateTable()
table.focus()
setInterval(generateTable, 3000)


screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.on('resize', function() {
  table.emit('attach');
});

screen.render()