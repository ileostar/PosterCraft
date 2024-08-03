import { useState } from "react";

function EventProps() {
  const [fontFamily, setFontFamily] = useState<string>("");

  return (
    <div className="py-1 px-6 ">
      

      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontFamily"
          className="block mb-1 w-1/3"
        >
          点击：
        </label>
        <select
          id="fontFamily"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="select select-bordered w-2/3"
        >
          <option
            disabled
            selected
          >
            Who shot first?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>

    </div>
  );
}

export default EventProps;
