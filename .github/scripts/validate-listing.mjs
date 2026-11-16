import assert from "node:assert/strict";
import { readFile, realpath } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";

const root = await realpath(process.argv[2]);
const manifest = JSON.parse(
  await readFile(resolve(root, ".claude-plugin/plugin.json"), "utf8"),
);
const mcp = JSON.parse(await readFile(resolve(root, ".mcp.json"), "utf8"));

// These are directory listing fields, even though older scanners warn about them.
// https://code.claude.com/docs/en/plugins/manifest-reference#directory-listing-fields
for (const key of [
  "documentationUrl",
  "supportUrl",
  "privacyPolicyUrl",
  "termsOfServiceUrl",
]) {
  assert.equal(
    typeof manifest[key],
    "string",
    `${key} is required for the listing`,
  );
  const url = new URL(manifest[key]);
  assert.equal(url.protocol, "https:", `${key} must use HTTPS`);
  assert.equal(url.origin, "https://custodo.ai", `${key} must link to Custodo`);
  assert.equal(
    url.username + url.password,
    "",
    `${key} must not contain credentials`,
  );

  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  assert.equal(response.status, 200, `${key}: HTTP ${response.status}`);
  assert.equal(
    new URL(response.url).origin,
    url.origin,
    `${key} redirects outside Custodo`,
  );
  assert.match(
    response.headers.get("content-type") ?? "",
    /text\/html/i,
    `${key}: expected HTML`,
  );
  const html = await response.text();
  assert.doesNotMatch(
    html,
    /\{\{DA_COMPILARE/i,
    `${key} contains an unfinished legal field`,
  );
  if (url.hash) {
    const anchor = decodeURIComponent(url.hash.slice(1));
    assert(
      html.includes(`id="${anchor}"`) || html.includes(`id='${anchor}'`),
      `${key}: missing anchor ${url.hash}`,
    );
  }
  console.log(`OK ${key}: ${url.href}`);
}

assert.equal(
  typeof manifest.icon,
  "string",
  "The directory listing needs an icon",
);
assert(
  manifest.icon.startsWith("./"),
  "The icon must be relative to the plugin root",
);
const iconPath = await realpath(resolve(root, manifest.icon));
const iconRelative = relative(root, iconPath);
assert(
  iconRelative !== ".." &&
    !iconRelative.startsWith("../") &&
    !isAbsolute(iconRelative),
  "The icon must stay inside the plugin package",
);
const icon = await readFile(iconPath);
assert(icon.length >= 24, "The logo is missing its PNG header");
assert(
  icon.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  "The logo must be PNG",
);
assert.equal(
  icon.toString("ascii", 12, 16),
  "IHDR",
  "The PNG needs an IHDR chunk",
);
assert.equal(icon.readUInt32BE(16), 512, "The logo must be 512 pixels wide");
assert.equal(icon.readUInt32BE(20), 512, "The logo must be 512 pixels high");
assert(icon.length <= 1024 * 1024, "The logo must be at most 1 MiB");
console.log("OK icon: packaged 512×512 PNG");

assert.deepEqual(
  mcp,
  {
    mcpServers: {
      custodo: { type: "http", url: "https://api.custodo.ai/mcp" },
    },
  },
  "Keep the full, remote Custodo connector without embedded credentials or local commands",
);
console.log("OK MCP: full remote Custodo catalogue");
