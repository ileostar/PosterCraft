---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  // VPTeamPageSection
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/108746194?s=96&v=4',
    name: 'LeoStar',
    title: 'A not-so-serious front-end Coder',
    links: [
      { icon: 'github', link: 'https://github.com/ileostar' },
      { icon: 'x', link: 'https://twitter.com/030LeoStar' }
    ]
  },
   {
    avatar: 'https://avatars.githubusercontent.com/u/101611942?v=4',
    name: 'kkkang',
    title: 'Noob Coder',
    links: [
      { icon: 'github', link: 'https://github.com/kkkangKK' },
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Development Member
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />

  <!-- 其他成员 -->
  <!--
  <VPTeamPageSection>
    <template #title>Partners</template>
    <template #lead>Lorem ipsum...</template>
    <template #members>
      <VPTeamMembers :members="members" />
    </template>
  </VPTeamPageSection>
   -->
</VPTeamPage>
