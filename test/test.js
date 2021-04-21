const fs = require('fs');
const { promisify } = require('util');

const assert = require('assert');

const generate = require('../src/generate');

// Poor man's snapshot testing
async function matchesExpected(name) {
    const input = `test/cases/${name}.yml`;
    const output = `test/cases/${name}.out.js`;

    const received = await generate(input);
    const expected = await promisify(fs.readFile)(output).then(it => it.toString());
    assert.strictEqual(received, expected);
}

describe("generating the minimum metadata", () => {
    it("should match expected", async () => {
        await matchesExpected("minimum");
    });
});
