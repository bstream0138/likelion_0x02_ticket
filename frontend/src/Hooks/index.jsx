export const useGetMyNft = async () => {
  const getMyNft = async () => {
    try {
      if (!preEventContract) return;

      // 내가 가진 티켓 개수
      const balance = await preEventContract.methods.balanceOf(account).call();

      let temp = [];
      if (balance > 0) {
        setIsLoading(true);
        setIsEmpty(false);
        for (let i = 0; i < Number(balance); i++) {
          const tokenId = await preEventContract.methods
            .tokenOfOwnerByIndex(account, i)
            .call();
          const isCanceled = await preEventContract.methods
            .isCanceled(tokenId)
            .call();

          if (!isCanceled) {
            const metadataURI = await preEventContract.methods
              .tokenURI(Number(!isCanceled))
              .call();

            const response = await axios.get(metadataURI);
            // const purchase = purchasedList.find((p) => p.ID === tokenId);

            temp.push({ ...response.data, tokenId: Number(tokenId) });
            // console.log(response.data);
          }
        }

        setMetadataArray(temp);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getPurchased = async () => {
    const customerID = localStorage.getItem("customerID");
    if (!customerID) return;

    try {
      const response = await fetch(
        `http://localhost:3001/purchase_list?customerID=${customerID}`
      );
      if (response.ok) {
        const data = await response.json();
        setPurchasedList(data);
        console.log("getPurchased: ", data);
      } else {
        throw new Error("Failed to fetch purchase list");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {};
};
