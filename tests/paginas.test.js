const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

const paginas = fs.readdirSync(".").filter((f) => f.endsWith(".html"));

for (const pagina of paginas) {
  test(`${pagina} tiene <title>`, () => {
    const html = fs.readFileSync(pagina, "utf8");
    assert.match(html, /<title>.+<\/title>/);
  });

  test(`${pagina} tiene lang en <html>`, () => {
    const html = fs.readFileSync(pagina, "utf8");
    assert.match(html, /<html[^>]*lang="/);
  });

  test(`todas las imágenes de ${pagina} tienen alt`, () => {
    const html = fs.readFileSync(pagina, "utf8");
    const imgs = html.match(/<img[^>]*>/g) || [];
    for (const img of imgs) {
      assert.match(img, /alt="/, `Falta alt en ${img}`);
    }
  });
}
