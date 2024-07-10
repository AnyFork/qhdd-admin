/**
 * 当前登录用户类型
 * @returns 
 */
export const useLoginType = () => {
    const loginUserType = useLocalStorage<loginType>("loginType", 1);
    return { loginUserType };
}