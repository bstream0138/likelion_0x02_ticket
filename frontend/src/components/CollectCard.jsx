const CollectCard = () => {
    return (
      <div className="w-[425px] min-h-screen bg-blue-200 mx-auto">
        <h1 className="px-2 py-2">My Collection</h1>
        <div className="pl-1 bg-red-100 grid grid-cols-2 gap-3 pt-10">
          <ul className="w-[200px] h-[250px] bg-green-100">picture</ul>
          <ul className="w-[200px] h-[250px] bg-green-100">picture</ul>
          <ul className="w-[200px] h-[250px] bg-green-100">picture</ul>
          <ul className="w-[200px] h-[250px] bg-green-100">picture</ul>
        </div>
      </div>
    );
  };
  
  export default CollectCard;