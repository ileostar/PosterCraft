import { UseElementStore } from "@/store/element";
import { ElementDataType } from "@/types/element-type";
import graphTemplate from "@/utils/template/graphTemplate";
import { v4 as uuidv4 } from "uuid";

function GraphList() {
  const { setCurrentElement, addElement, setIsElement } = UseElementStore();

  const handleClick = (event: any) => {
    console.log(event.target.innerHTML);
    console.log(event.target.style.cssText);
    const targetStyle = event.target.style.cssText;
    const styleObject = parseStyleStringToObject(targetStyle);
    console.log(styleObject);
    const id = uuidv4();
    const element: ElementDataType = {
      props: styleObject,
      id: id,
      type: "graph",
      isHidden: false,
      isLocked: false,
      layerName: "图层",
    };
    addElement(element);
    setCurrentElement(id);
    setIsElement(true);
  };

  // 将kebab-case转换为camelCase的函数
  const kebabCaseToCamelCase = (str: string): string => {
    return str.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  };

  //过滤掉flex布局属性
  const filterFlexStyle = (str: string): string | null => {
    if (str.includes("alignItems") || str.includes("justifyContent") || str.includes("display")) {
      return null;
    } else {
      return str;
    }
  };

  // 将CSS样式字符串转换为对象
  const parseStyleStringToObject = (cssText: string): { [key: string]: any } => {
    const styles = cssText.split(";");
    const styleObject: { [key: string]: any } = {};

    styles.forEach((style) => {
      if (style.trim()) {
        // 忽略空字符串或仅包含空格的字符串
        const [key, value] = style.trim().split(":");
        //转成驼峰css
        const camelCaseKey = kebabCaseToCamelCase(key.trim());
        // 过滤掉flex布局属性
        const filterKey = filterFlexStyle(camelCaseKey);
        // 可能需要额外的处理来去除值两端的空格或引号等
        if (filterKey) {
          styleObject[filterKey] = value.trim().replace(/"/g, "").replace(/'/g, "");
        }
      }
    });

    return styleObject;
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {graphTemplate.map((item: any) => (
        <button
          key={item.id}
          onClick={(e) => handleClick(e)}
          style={item.style}
          className="mb-3"
        ></button>
      ))}
    </div>
  );
}

export default GraphList;