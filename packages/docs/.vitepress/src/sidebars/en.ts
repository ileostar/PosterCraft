// import { getFirstLevelFiles } from '../utils'

// const directoryPath = './en/directives'
// const subdirectories = getFirstLevelFiles(directoryPath).map((dirs: string) => {
//   return {
//     text: dirs.slice(0, -3),
//     link: `/en/directives/${dirs.slice(0, -3)}`,
//   }
// })

export const sidebar = {
  "/en/": [
    {
      text: "Project Introduce",
      items: [
        { text: "brief introduction", link: "/zh/introduce/introduce" },
        { text: "quick action", link: "/zh/introduce/use" },
        { text: "technology stack", link: "/zh/introduce/technology" },
      ],
    },
    {
      text: "Development Problem",
      items: [
        { text: "problem1", link: "/zh/problem/problem-1" },
        { text: "problem2", link: "/zh/problem/problem-2" },
        { text: "problem3", link: "/zh/problem/problem-3" },
      ],
    },
  ],
  "/en/about/": [
    {
      text: "Communication",
      items: [{ text: "Communication group", link: "/en/about/communication" }],
    },
    {
      text: "Concerning",
      items: [{ text: "Development Team", link: "/en/about/team" }],
    },
  ],
};
