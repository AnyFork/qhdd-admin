import qs from 'qs'
import { printerListApi, addPrinterApi, updatePrinterApi, removePrinterApi } from '../api'
/**
 * 打印机列表
 * @returns 
 */
export const printerList = async (params: Record<string, any>) => await storeAxios.get(`${printerListApi}?${qs.stringify(params)}`)

/**
 * 新增打印机
 * @returns 
 */
export const addPrinter = async (params: Partial<store.printer>) => await storeAxios.post(addPrinterApi, params)

/**
 * 修改打印机
 * @returns
 */
export const updatePrinter = async (params: Partial<store.printer>) => await storeAxios.post(updatePrinterApi, params)

/**
 * 删除打印机
 * @returns
 */
export const removePrinter = async (id: number) => await storeAxios.get(`${removePrinterApi}?${qs.stringify({ id })}`)

