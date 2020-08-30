# Plugin Metadata

Plugin metadata validation and generation tool.

## Getting started

First of all, be sure you have Node installed.

You can install this tool globally with:

    npm install -g @comuns-rpgmaker/plugin-metadata


## Usage

```
Options:
  --version     Shows the version                                [boolean]
  --input, -i   Input metadata file                               [string]
  --output, -o  Output file (default: stdout)                     [string]
  --help, -h    Shows help                                       [boolean]
```

The CLI receives an input file (if none is given, `./plugin-metadata.json` is
assumed) and an output file (if none is given, `stdout` is assumed).

The input file must follow the schema specified in
[`./schema/plugin-metadata.json`](./schema/plugin-metadata.json). It accepts
both JSON and YAML files.


## Schema

The JSON schema for the input files is available here: [plugin-metadata.json](https://raw.githubusercontent.com/comuns-rpgmaker/plugin-metadata/master/schema/plugin-metadata.json).

To use it with VS Code, see [this article](https://code.visualstudio.com/docs/languages/json#_json-schemas-and-settings).
