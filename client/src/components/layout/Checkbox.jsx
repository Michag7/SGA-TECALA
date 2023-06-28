import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="hidden"
      />
      <label
        className="flex items-center justify-center w-6 h-6 border border-gray-400 rounded cursor-pointer"
        htmlFor="checkbox"
        onClick={handleCheckboxChange}
      >
        {isChecked ? (
          <AiOutlineCheck className="text-green-500" />
        ) : (
          <AiOutlineClose className="text-red-500" />
        )}
      </label>
    </div>
  );
};

export default Checkbox;
