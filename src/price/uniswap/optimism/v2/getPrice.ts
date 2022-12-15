import { config as dotEnvConfig } from "dotenv";
import { BigNumber, ethers } from "ethers";
dotEnvConfig();
import * as UniswapV2Router from "../../../../abis/IUniswapV2Router02.json";
import { getBigNumber } from "../../../../utils";

const optimismProvider = new ethers.providers.JsonRpcProvider(
  process.env.ALCHEMY_OPTIMISM_RPC_URL
);

/**
 *
 * @param tokenIn address of token to convert from
 * @param tokenOut address of token to convert to
 * @param amountIn amount of token to convert from
 * @param routerAddress router address
 * @returns
 */
export const getPriceOnUniV2 = async (
  tokenIn: string,
  tokenOut: string,
  amountIn: BigNumber,
  routerAddress: string
): Promise<BigNumber> => {
  const V2Router = new ethers.Contract(
    routerAddress,
    UniswapV2Router.abi,
    maticProvider
  );
  const amountsOut = await V2Router.getAmountsOut(amountIn, [
    tokenIn,
    tokenOut,
  ]);
  if (!amountsOut || amountsOut.length !== 2) {
    return getBigNumber(0);
  }
  return amountsOut[1];
};
