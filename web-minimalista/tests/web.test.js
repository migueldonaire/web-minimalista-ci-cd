const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("index.html existe", () => {
  assert.ok(fs.existsSync("index.html"));
});

test("index.html tiene un título", () => {
  const html = fs.readFileSync("index.html", "utf8");
  assert.match(html, /<title>.+<\/title>/);
});
