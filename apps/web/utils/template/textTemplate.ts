//真正渲染到画布时会过滤掉display:'flex'，justifyContent:'center'，alignItems: 'center'这3个属性
const textTemplate = [
  {
    style: {
      width: "120px",
      height: "50px",
      borderStyle: "none",
      textAlign: "center",
      lineHeight: "50px",
      display: "flex",
      fontFamily: "SimSun",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 24,
    },
    text: "你好",
  },
  {
    style: {
      width: "120px",
      height: "50px",
      borderStyle: "none",
      textAlign: "center",
      lineHeight: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 16,
    },
    text: "我们一起",
  },
  {
    style: {
      width: "120px",
      height: "50px",
      top: "50px",
      left: "50px",
      borderStyle: "none",
      textAlign: "center",
      lineHeight: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 24,
      backgroundColor: "blue",
      color: "rgb(255,255,255)",
    },
    text: "你好",
  },
  {
    style: {
      width: "120px",
      height: "50px",
      borderStyle: "none",
      textAlign: "center",
      lineHeight: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 24,
      backgroundColor: "red",
      color: "rgb(255,255,255)",
    },
    text: "liuliudashun",
  },
];

export default textTemplate;