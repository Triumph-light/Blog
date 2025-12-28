import { link } from "fs";

export const blogConfigs = [
  {
    text: "Blog",
    items: [
      { text: "首页", link: "/Blog/index" },
      { text: "eslint-config", link: "/Blog/eslint-config" },
    ],
  },
];

export const vueConfigs = [
  {
    text: "Vue源码",
    items: [
      {
        text: "SSR渲染",
        items: [
          {
            text: "前置",
            link: "/vue/ssr/pre",
          },
          {
            text: "介绍",
            link: "/vue/ssr/index",
          },
          {
            text: "水合过程",
            link: "/vue/ssr/hydration",
          },
        ],
      },
    ],
  },
];
