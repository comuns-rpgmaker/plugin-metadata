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

For instance, suppose we have the following YAML file (`plugin-metadata.yaml`):

```yaml
target: MZ
author: You
url: https://github.com/me/my-plugin
description: My plugin
help: |-
  My Plugin

  This is my plugin!
```

When we run this on the CLI (if it doesn't work, try `npm link`):

    mz-mtdt -i plugin-metadata.yaml

We get the following output:

```js
/*:
 * @target MZ
 * @author You
 * @url https://github.com/me/my-plugin
 * @description My plugin
 * @help My Plugin
 *
 * This is my plugin!
 */
```

## Schema

The JSON schema for the input files is available here: [plugin-metadata.json](https://raw.githubusercontent.com/comuns-rpgmaker/plugin-metadata/master/schema/plugin-metadata.json).

To use it with VS Code, see [this article](https://code.visualstudio.com/docs/languages/json#_json-schemas-and-settings).


