//真正渲染到画布时会过滤掉display:'flex'，justifyContent:'center'，alignItems: 'center'这3个属性
export const textTemplate=[
    {
        style:{width:'120px',height:'50px',textAlign:'center',lineHeight:'50px',display:'flex', fontFamily:'SimSun', justifyContent:'center',alignItems: 'center', fontSize:24},
        text:'你好'
    },
    {
        style:{width:'120px',height:'50px',textAlign:'center',lineHeight:'50px',display:'flex', justifyContent:'center',alignItems: 'center',fontSize:16},
        text:'你好'
    },
    {
        style:{width:'120px',height:'50px',textAlign:'center',lineHeight:'50px',display:'flex', justifyContent:'center',alignItems: 'center',fontSize:24,backgroundColor:'blue',color:'rgb(255,255,255)'},
        text:'你好'
    }
]