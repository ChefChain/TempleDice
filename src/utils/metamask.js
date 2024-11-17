//
import { etherlinkTestnet } from "viem/chains";
let provider;
let signer;

export async function connectMetaMask() {
  console.log('connectMetaMask() called', window.ethereum);
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      provider = new etherlinkTestnet.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();

      const address = await signer.getAddress();
      console.log('Connected wallet:', address);
      return address;
    } catch (error) {
      console.error('MetaMask connection failed:', error);
      return null;
    }
  } else {
    console.error('MetaMask not detected!');
    return null;
  }
}

export function getProvider() {
  return provider;
}

export function getSigner() {
  return signer;
}

export async function deposit(recipientAddress, amountInEth) {
  if (!signer) {
    console.error('MetaMask is not connected!');
    return;
  }

  try {
    const tx = await signer.sendTransaction({
      to: recipientAddress,
      value: etherlinkTestnet.utils.parseEther(amountInEth),
    });

    console.log('Transaction Hash:', tx.hash);
    await tx.wait();
    console.log('Deposit successful!');
    return tx.hash;
  } catch (error) {
    console.error('Deposit failed:', error);
    return null;
  }
}

export async function withdraw(contractAddress, abi, amountInEth) {
  if (!signer) {
    console.error('MetaMask is not connected!');
    return;
  }

  const contract = new etherlinkTestnet.Contract(contractAddress, abi, signer);

  try {
    const tx = await contract.withdraw(await signer.getAddress(), etherlinkTestnet.utils.parseEther(amountInEth));

    console.log('Transaction Hash:', tx.hash);
    await tx.wait();
    console.log('Withdrawal successful!');
    return tx.hash;
  } catch (error) {
    console.error('Withdrawal failed:', error);
    return null;
  }
}
