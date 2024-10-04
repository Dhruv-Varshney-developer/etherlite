/* eslint-disable no-undef */
export function parseEther(etherString) {
    // Split the string into whole and fractional parts
    const [whole, fraction] = etherString.split('.');
    
    // Calculate whole part in Wei
    let weiValue = BigInt(whole) * BigInt(10 ** 18);
    
    // If there's a fractional part, convert it to Wei as well
    if (fraction) {
        const fractionLength = fraction.length;
        const fractionWei = BigInt(fraction) * BigInt(10 ** (18 - fractionLength));
        weiValue += fractionWei;
    }
    
    return weiValue;
}

export function hexToUint8Array(hexString) {
    if (hexString.startsWith("0x")) {
      hexString = hexString.slice(2); // Remove "0x" prefix
    }
  
    const byteArray = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
    }
    return byteArray;
  }
// Example usage:
const weiValue = parseEther("1.5"); // Converts 1.5 Ether to Wei
console.log(weiValue.toString()); // Outputs: "1500000000000000000"