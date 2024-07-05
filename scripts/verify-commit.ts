import { readFileSync } from "node:fs";
import path from "node:path";

import pico from "picocolors";

const msgPath = path.resolve(".git/COMMIT_EDITMSG");
const msg = readFileSync(msgPath, "utf-8").trim();

const commitRE =
  /^(revert: )?(✨|🐛|📝|dx|💄|♻️|⚡️|🧪|🔧|👷|🚀|🏷️|🚧|🔖|💩|🚑|🔒️|🔐|⬆️|⬇️|➕|➖|🧱|📦|🚨|🔍|✏️|💥|🙈|🧐|🗑️|💚|📌|🍱|🥅|📱|🍻)(\(.+\))? .{1,50}/;

if (!commitRE.test(msg)) {
  console.error(
    `
  ${pico.white(pico.bgRed(" ERROR "))} ${pico.red(`invalid commit message format.`)}\n\n` +
      pico.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
      ) +
      `    ${pico.green(`✨(api) add 'comments' option`)}\n` +
      `    ${pico.green(`🐛(client): handle events on blur (close #28)`)}\n\n` +
      pico.red(
        `We refer to the vue3 scheme.\n` +
          `See https://github.com/vuejs/core/blob/main/.github/commit-convention.md for more details.\n`,
      ),
  );
  process.exit(1);
}
