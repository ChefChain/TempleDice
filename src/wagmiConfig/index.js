import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from "@reown/appkit/networks"

export const projectId = process.env.NODE_ENV || "3i838383";


if (!projectId) {
    throw new Error('Project ID is not defined')
  }
  
  export const networks = [mainnet, arbitrum]
  
  //Set up the Wagmi Adapter (Config)
  export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
      storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks
  })
  
  export const config = wagmiAdapter.wagmiConfig