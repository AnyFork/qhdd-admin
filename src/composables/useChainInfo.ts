/**
 * 连锁店信息
 * @returns 
 */
export const useChainInfo = () => {

    /**
     * 当前连锁店信息
     */
    const chainInfo = useLocalStorage<chain.chainInfo>("CURRENT-CHAIN-INFO", null, {
        serializer: {
            read: (v) => v ? JSON.parse(v) : null,
            write: (v) => JSON.stringify(v)
        }
    });

    /**
    * 当前连锁店信息来源
    */
    const chainInfoFrom = useLocalStorage<chain.chainFrom>("CURRENT-CHAIN-INFO-FROM", null);


    return { chainInfo, chainInfoFrom }
}