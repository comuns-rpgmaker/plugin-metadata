const yargs = require('yargs');
const generate = require('./src/generate');

const argv = yargs
    .option('input', {
        alias: 'i',
        description: 'Input metadata file',
        type: 'string',
    })
    .option('output', {
        alias: 'o',
        description: 'Output file (default: stdout)',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

generate(argv.input || './plugin-metadata.json', argv.output)
    .then(console.info)
    .catch(console.error);
