interface DocsConfig {
  [index: string]: unknown;
  appearance: "dark";
}

export const docsConfig: DocsConfig = {
  title: "PosterCraft",
  description: "可视化海报编辑器",
  lang: "zh-CN",
  lastUpdated: true,
  appearance: "dark",
  outline: [2, 3],
  ignoreDeadLinks: true,
};
