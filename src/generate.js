const path = require('path');
const fs = require('fs');

const validate = require('./validate');

function localized(str, language) {
    return str[language] || str.default || str;
}

function transformNumber(param) {
    const result = [];

    if (param.min) result.push(`@min ${param.min}`);
    if (param.max) result.push(`@max ${param.max}`);
    if (param.decimals) result.push(`@decimals ${param.decimals}`);

    return result;
}

function transformFile(param) {
    if (param.dir) [`@dir ${param.dir}`, ...transformRequire(param)];
    else return [];
}

function transformRequire(param) {
    if (param.require) return [`@require 1`];
    else return [];
}

function transformBoolean(param, language) {
    const result = [];
    if (param.on) result.push(`@on ${localized(param.on, language)}`);
    if (param.off) result.push(`@off ${localized(param.off, language)}`);
    return result;
}

function transformSelect(param, language) {
    return param.options.reduce((result, option) => {
        result.push(`@option ${localized(option.text, language)}`);
        if (option.value) result.push(`@value ${option.value}`);
        return result;
    }, []);
}

function additionalOptions(param, language) {
    switch (param.type) {
        case 'number': return transformNumber(param);
        case 'file': return transformFile(param);
        case 'animation': return transformRequire(param);
        case 'boolean': return transformBoolean(param, language);
        case 'select': return transformSelect(param, language);
        case 'combo': return transformSelect(param, language);
        default: return [];
    }
}

function unitType(type, struct) {
    if (struct) return `struct<${type}>`;
    else return type;
}

function resolveType(param) {
    if (param.type === 'array') {
        const items = param.struct || param.items;
        return `${unitType(items, param.struct)}[]`;
    } else {
        return unitType(param.struct || param.type, param.struct);
    }
}

function transformParam(param, { command, parent, language }) {
    let result = [`@${command ? 'arg' : 'param'} ${param.name}`];

    if (parent) result.push(`@parent ${parent}`);

    const type = resolveType(param);
    if (type) result.push(`@type ${type}`);

    result.push(
        `@text ${localized(param.text, language)}`,
        `@desc ${localized(param.description, language)}`
    );

    if (param.default !== undefined) result.push(`@default ${param.default}`);

    if (param.children) {
        param.children.forEach(child => {
            result.push('');
            result.push(...transformParam(child, {
                language,
                parent: param.name
            }))
        });
    }

    return result;
}

function transformCommand(command, language) {
    const result = [
        `@command ${command.name}`,
        `@text ${localized(command.text, language)}`,
        `@desc ${localized(command.description, language)}`
    ];

    if (command.args) {
        command.args.forEach(arg => {
            result.push(...transformParam(arg, { command: true, language }));
        });
    }

    return result;
}

function transformStructs(structs, language) {
    if (!structs) return null;

    return structs.map((struct) => {
        const tags = [];
        struct.params.forEach(param => {
            tags.push('');
            tags.push(...transformParam(param, { language }));
        });

        return { name: struct.name, tags };
    });
}

function transform(metadata, language) {
    let result = [
        `@target ${metadata.target}`,
        `@author ${metadata.author}`
    ];

    if (metadata.url) result.push(`@url ${metadata.url}`);

    result.push(
        `@plugindesc ${localized(metadata.description, language)}`,
        `@help ${localized(metadata.help, language)}`
    );

    if (metadata.base) {
        metadata.base.forEach(plugin => result.push(`@base ${plugin}`));
    }

    if (metadata.before) {
        metadata.before.forEach(plugin => result.push(`@before ${plugin}`));
    }

    if (metadata.after) {
        metadata.after.forEach(plugin => result.push(`@after ${plugin}`));
    }

    if (metadata.params) {
        metadata.params.forEach(param => {
            result.push('');
            result.push(...transformParam(param, { language }));
        });
    }

    if (metadata.commands) {
        metadata.commands.forEach(param => {
            result.push('');
            result.push(...transformCommand(param, language));
        });
    }

    return {
        main: result,
        structs: transformStructs(metadata.structs, language)
    };
}

function formatMain(tags, language) {
    const lines = tags.join('\n').trimRight().split('\n');
    return `/*:${language}\n * ${lines.join('\n * ')}\n */\n`
}

function formatStructs(tags, language) {
    if (!tags) return '';

    return tags.reduce((acc, { name, tags: structTags }) => {
        const lines = structTags.join('\n').trimRight().split('\n');
        return acc
            + `/*~struct~${name}:${language}\n * ${lines.join('\n * ')}\n */\n`;
    }, '');
}

module.exports = async function generate(file, output) {
    const metadata = await validate(file);

    let result = '';
    const languages = ['', ...(metadata.languages || [])] ;

    languages.forEach(language => {
        const tags = transform(metadata, language);

        result += formatMain(tags.main, language)
            + formatStructs(tags.structs, language);
    });

    result = result.replace(/(?<=[^\r])\n/g, '\r\n');

    if (output) {
        fs.mkdirSync(path.dirname(output), { recursive: true });
        fs.writeFileSync(output, result);
        return 'OK';
    } else {
        return result;
    }
};
