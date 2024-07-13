"use client";

function Index(props: any) {
  return (
    <div className="hero bg-base-200 h-full">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* <img
        src="/num.jpg"
        className="max-w-sm rounded-lg shadow-2xl"
      /> */}
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">可视化海报编辑器</h1>
          <p className="py-6">
            欢迎来到我们的可视化海报编辑器网站！这里，创意与效率并肩，让设计触手可及。无需专业背景，只需简单拖拽，海量模板与素材任你挑选，轻松实现个性化海报创作。无论是商务宣传、活动邀请还是社交媒体分享，我们助你一站式搞定，让每一张海报都成为你的精彩名片！
          </p>
          <button className="btn bg-red-500 text-white hover:text-black">开始设计</button>
        </div>
      </div>
    </div>
  );
}

export default Index;
