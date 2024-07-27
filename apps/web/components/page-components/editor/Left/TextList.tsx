import {UseElementStore} from "@/store/element"
import { ElementData } from "@/types/ElementType";
import { v4 as uuidv4 } from 'uuid';

function TextList() {

    const {setCurrentElement,addElement} = UseElementStore();

    const handleClick = (event:any) => {
        console.log(event.target.innerHTML);
        console.log(event.target.style.cssText);
        const targetStyle = event.target.style.cssText;
        const styleObject = parseStyleStringToObject(targetStyle);
        console.log(styleObject);
        const id=uuidv4();
        const element: ElementData = {
            props:styleObject,
            id: id,
            type:'text',
            text:event.target.innerHTML
        }
        console.log(element);
        addElement(element);
        setCurrentElement(id);
      };

      // 将kebab-case转换为camelCase的函数
      const kebabCaseToCamelCase=(str: string): string=> {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }

    // 将CSS样式字符串转换为对象
const parseStyleStringToObject=(cssText: string): {[key: string]: any}=> {
    const styles = cssText.split(';');
    const styleObject: {[key: string]: any} = {};
  
    styles.forEach(style => {
      if (style.trim()) {
        // 忽略空字符串或仅包含空格的字符串
        const [key, value] = style.trim().split(':');
        //转成驼峰css
        const camelCaseKey = kebabCaseToCamelCase(key.trim());
        // 可能需要额外的处理来去除值两端的空格或引号等
        styleObject[camelCaseKey] = value.trim().replace(/"/g, '').replace(/'/g, '');
      }
    });
  
    return styleObject;
  }
      
    // const handleClick = (event, index) => {
    //     console.log(`子元素 ${index + 1} 被点击了`);
    //   };


    return (
      <div className="flex justify-center items-center flex-col">
         <div  onClick={(e) => handleClick(e)} style={{width:'120px',height:'50px',display:'flex', justifyContent:'center',alignItems: 'center', fontSize:24}}>你好1</div> 
         <div  onClick={(e) => handleClick(e)} style={{width:'120px',height:'50px',display:'flex', justifyContent:'center',alignItems: 'center',fontSize:16}}>你好2</div> 
         <div  onClick={(e) => handleClick(e)} style={{width:'120px',height:'50px',display:'flex', justifyContent:'center',alignItems: 'center',fontSize:24,background:'blue',color:'rgb(255,255,255)'}}>你好3</div>

       

      </div>
    );
  }
  
  export default TextList;