//MyNftCard에서 표를 클릭하였을때 표와 표의정보 표시
const NftModal = ({ isModalOpen }) => {
  return (
    <div
      className="bg-opacity-40 bg-black w-full h-full top-0 left-0 fixed z-20"
      onClick={isModalOpen}
    >
      <div
        className="w-[400px] h-[300px] bg-blue-100 fixed top-1/2 -translate-y-[200px] left-1/2 -translate-x-1/2 rounded-md"
        onClick={isModalOpen}
      >
        {/*이미지넣기 400 200 나머지 100에는 공연정보*/}
      </div>
    </div>
  );
};

export default NftModal;
