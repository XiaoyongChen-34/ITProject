// Use the SubtleCrypto API to perform SHA-256 hashing
export const hashIP = async (ip) => {
    const buffer = textToArrayBuffer(ip); // Convert IP address to ArrayBuffer
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer); // Perform SHA-256 hashing
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert the hash buffer to an array of bytes
  
    // Convert the hash value to a hexadecimal string
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

// Convert text to ArrayBuffer
const textToArrayBuffer = (text) => {
  const encoder = new TextEncoder();
  return encoder.encode(text);
};