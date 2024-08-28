//真正渲染到画布时会过滤掉display:'flex'，justifyContent:'center'，alignItems: 'center'这3个属性
const textTemplate = [
  {
    style: {
      width: "100px",
      height: "200px",
      top: "0px",
      left: "0px",
      backgroundImage: `url('/bg1.png')`,
      backgroundSize: "100% 100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    style: {
      width: "100px",
      height: "200px",
      top: "0px",
      left: "0px",
      backgroundImage: `url('/bg2.png')`,
      backgroundSize: "100% 100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    style: {
      width: "150px",
      height: "100px",
      top: "0px",
      left: "0px",
      backgroundImage: `url('/bg3.png')`,
      backgroundSize: "100% 100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    style: {
      width: "100px",
      height: "100px",
      top: "0px",
      left: "0px",
      backgroundImage: `url('/bg4.png')`,
      backgroundSize: "100% 100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    style: {
      width: "100px",
      height: "100px",
      top: "0px",
      left: "0px",
      backgroundImage: `url('/bg5.png')`,
      backgroundSize: "100% 100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    style: {
      width: "150px",
      height: "100px",
      top: "0px",
      left: "0px",
      backgroundImage: `url('/bg6.png')`,
      backgroundSize: "100% 100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
];

export default textTemplate;
