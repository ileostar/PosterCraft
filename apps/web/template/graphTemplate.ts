//真正渲染到画布时会过滤掉display:'flex'，justifyContent:'center'，alignItems: 'center'这3个属性
const graphTemplate = [
  //矩形
  {
    style: {
      width: "120px",
      height: "50px",
      top: "0px",
      left: "0px",
      backgroundColor: "#d0021b",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  //圆形
  {
    style: {
      width: "120px",
      height: "120px",
      top: "0px",
      left: "0px",
      backgroundColor: "#4a90e2",
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  //正方形
  {
    style: {
      width: "120px",
      height: "120px",
      top: "0px",
      left: "0px",
      backgroundColor: "#f5a623",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  //三角形
  {
    style: {
      width: "120px",
      height: "120px",
      top: "0px",
      left: "0px",
      backgroundColor: "#417505",
      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  //六边形
  {
    style: {
      width: "120px",
      height: "120px",
      top: "0px",
      left: "0px",
      backgroundColor: "#9013fe",
      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  //五边形
  {
    style: {
      width: "120px",
      height: "120px",
      top: "0px",
      left: "0px",
      backgroundColor: "#9b9b9b",
      clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  //五角形
  {
    style: {
      width: "120px",
      height: "120px",
      top: "0px",
      left: "0px",
      backgroundColor: "#50e3c2",
      clipPath: "polygon( 50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
   //梯形
   {
    style: {
      width: "120px",
      height: "120px",
      top: "0px",
      left: "0px",
      backgroundColor: "#bd10e0",
      clipPath: 'polygon(75% 0%, 25% 0%,0% 100%, 100% 100%)',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  //菱形
  {
    style: {
      width: "120px",
      height: "120px",
      top: "0px",
      left: "0px",
      backgroundColor: "#8b572a",
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  //平行四边形
  {
    style: {
      width: "120px",
      height: "120px",
      top: "0px",
      left: "0px",
      backgroundColor: "#000000",
      clipPath: 'polygon(0% 0%, 50% 0%, 100% 100%, 50% 100%)',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
];

export default graphTemplate;
