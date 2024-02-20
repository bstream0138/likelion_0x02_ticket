const CollectionCard = () => {
  return (
    <div className="w-[425px] h-[90vh]  mx-auto">
      <div className="w-[425px] text-center text-3xl mt-2">MY COLLECTION</div>
      <div className="flex flex-col gap-3 pt-10 ">
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
