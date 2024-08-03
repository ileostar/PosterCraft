import { useState } from "react";

function SizeProps() {
  const [textarea, setTextarea] = useState<string>("");
  const [fontSize, setFontSize] = useState<string>("");
  const [fontFamily, setFontFamily] = useState<string>("");
  const [fontStyle, setFontStyle] = useState<string>("");
  const [lineHeight, setLineHeight] = useState<string>("");

  return (
    <div className="py-1 px-6 ">
     
      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontSize"
          className="block mb-1 w-1/3"
        >
          高度：
        </label>
        <input
          type="text"
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontSize"
          className="block mb-1 w-1/3"
        >
          高度：
        </label>
        <input
          type="text"
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontSize"
          className="block mb-1 w-1/3"
        >
          宽度：
        </label>
        <input
          type="text"
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontSize"
          className="block mb-1 w-1/3"
        >
          上边距：
        </label>
        <input
          type="text"
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontSize"
          className="block mb-1 w-1/3"
        >
          下边距：
        </label>
        <input
          type="text"
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontSize"
          className="block mb-1 w-1/3"
        >
          左边距：
        </label>
        <input
          type="text"
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontSize"
          className="block mb-1 w-1/3"
        >
          右边距：
        </label>
        <input
          type="text"
          id="fontSize"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          placeholder="Font size"
          className="input input-bordered w-2/3"
        />
      </div>

      
    </div>
  );
}

export default SizeProps;
