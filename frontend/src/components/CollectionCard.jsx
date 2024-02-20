const CollectionCard = () => {
  return (
    <div className="w-[425px] h-[90vh]  mx-auto overflow-y-scroll">
      <h1 className="px-2 py-2">My Collection</h1>
      <div className=" grid grid-cols-1 gap-3 pt-10 ">
        <ul className="w-[400px] h-[200px] bg-purple-100 mx-auto rounded-md">
          picture
        </ul>
        <ul className="w-[400px] h-[200px] bg-purple-100 mx-auto rounded-md">
          picture
        </ul>
        <ul className="w-[400px] h-[200px] bg-purple-100 mx-auto rounded-md">
          picture
        </ul>
        <ul className="w-[400px] h-[200px] bg-purple-100 mx-auto rounded-md">
          picture
        </ul>
      </div>
    </div>
  );
};

export default CollectionCard;
