/**
 * 商户端店铺信息
 * @returns 
 */
export const useStoreInfo = () => {

    /**
     * 当前店铺信息
     */
    const storeInfo = useLocalStorage<store.storeData>("CURRENT-STORE-INFO", null, {
        serializer: {
            read: (v) => v ? JSON.parse(v) : null,
            write: (v) => JSON.stringify(v)
        }
    });

    /**
    * 当前店铺信息来源
    */
    const storeInfoFrom = useLocalStorage<store.storeFrom>("CURRENT-STORE-INFO-FROM", null);


    return { storeInfo, storeInfoFrom }
}