const fs = require('fs');
const assert = require('assert');

const generate = require('../src/generate');

// Poor man's snapshot testing
async function matchesExpected(name) {
    const input = `test/cases/${name}.yml`;
    const output = `test/cases/${name}.received.out`;

    await generate(input, output);

    const received = fs.readFileSync(output).toString();
    const expected = fs.readFileSync(`test/cases/${name}.expected.out`).toString();

    assert.strictEqual(received, expected);
}

describe("generating the minimum metadata", () => {
    it("should match expected", async () => {
        await matchesExpected("minimum");
    });
});
