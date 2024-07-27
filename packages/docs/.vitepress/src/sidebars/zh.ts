// import { getFirstLevelFiles } from '../utils'

// const directoryPath = './zh/directives'
// const subdirectories = getFirstLevelFiles(directoryPath).map((dirs: string) => {
//   return {
//     text: dirs.slice(0, -3),
//     link: `/zh/directives/${dirs.slice(0, -3)}`,
//   }
// })

export const sidebar = {
  '/zh/': [
    {
      text: '项目介绍',
      items: [
        { text: '简介', link: '/zh/introduce/introduce' },
        { text: '快速使用', link: '/zh/introduce/use' },
        { text: '技术栈介绍', link: '/zh/introduce/technology' },
      ],
    },
    {
      text: '开发历程',
      items: [
        { text: '问题1', link: '/zh/problem/problem-1'},
        { text: '问题2', link: '/zh/problem/problem-2' },
        { text: '问题3', link: '/zh/problem/problem-3' },
      ],
    },
  ],
  '/zh/about/': [
    {
      text: '交流',
      items: [
        { text: '交流群', link: '/zh/about/communication' },
      ],
    },
    {
      text: '关于',
      items: [
        { text: '开发团队', link: '/zh/about/team' },
      ],
    },
  ],
}
