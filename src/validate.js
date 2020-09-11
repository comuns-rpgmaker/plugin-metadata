const fs = require('fs');
const path = require('path')

const YAML = require('yaml');
const Ajv = require('ajv');

const schema = require('../schema/plugin-metadata.json');

const ajv = new Ajv({ allErrors: true });
const validateSchema = ajv.compile(schema);

function isYAML(file)
{
    return ['.yaml', '.yml'].includes(path.extname(file));
}

async function loadMetadata(file)
{
    const content = fs.readFileSync(file).toString();
    if (isYAML(file)) return YAML.parse(content);
    else return JSON.parse(content);
}

module.exports = async function validate(file)
{
    const metadata = await loadMetadata(file);

    if (validateSchema(metadata)) return metadata;
    else throw ajv.errorsText(validateSchema.errors);
};
