const fs = require('fs');
const { promisify } = require('util');
const assert = require('assert');
const generate = require('../src/generate');

describe("generate", () => {
    describe("generating the minimum metadata", () => {
        it("should match expected", async () => {
            await matchesExpected("minimum");
        });
    });

    describe("generating a minimal multi-language metadata", () => {
        it("should match expected", async () => {
            await matchesExpected("multi-language");
        });
    });

    describe("generating a metadata with structs", () => {
        it("should match expected", async () => {
            await matchesExpected("structs");
        });
    });

    describe("generating a metadata with plugin commands", () => {
        it("should match expected", async () => {
            await matchesExpected("plugin-commands");
        });
    });

    describe("generating a metadata with nested parameters", () => {
        it("should match expected", async () => {
            await matchesExpected("nested");
        });
    });
});

// Poor man's snapshot testing
async function matchesExpected(name) {
    const input = `test/cases/${name}.yml`;
    const output = `test/cases/${name}.out.js`;

    const received = await generate(input);
    const expected = await promisify(fs.readFile)(output).then(it => it.toString());
    assert.strictEqual(received, expected);
}
