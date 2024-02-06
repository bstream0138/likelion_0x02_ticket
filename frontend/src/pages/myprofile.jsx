import { useState } from "react";

const MyProfile = () => {
  const [isSelect, setIsSelect] = useState("A");

  return (
    <div className="w-[425px] min-h-screen bg-blue-200 mx-auto">
      <div className="bg-yellow-200 flex items-center justify-center py-3">
        My profile
      </div>
      <ul className="grid grid-cols-2 justify-items-center py-3">
        <button onClick={() => setIsSelect("A")}>purchased</button>
        <button onClick={() => setIsSelect("B")}>FAQ</button>
      </ul>
      {isSelect === "A" && (
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      )}
      {isSelect === "B" && (
        <ul>
          <li>4</li>
          <li>5</li>
          <li>6</li>
        </ul>
      )}
    </div>
  );
};

export default MyProfile;