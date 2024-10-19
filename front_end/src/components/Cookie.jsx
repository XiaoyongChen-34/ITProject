import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CookieContext } from "../pages/Home";

// Convert text to ArrayBuffer
const textToArrayBuffer = (text) => {
  const encoder = new TextEncoder();
  return encoder.encode(text);
};

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

// Set a Cookie
export const setCookie = (cName, cValue, expDays) => {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000); // Set cookie expiration date
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${cName}=${cValue}; ${expires}; path=/`; // Store the cookie
};

// Get the value of a Cookie
export const getCookie = (cName) => {
  const name = cName + "=";
  const decodedCookie = decodeURIComponent(document.cookie); // Decode the cookie string
  const cookieArray = decodedCookie.split(";"); // Split the cookies by semicolon
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length); // Return the cookie value if found
    }
  }
  return ""; // Return empty string if the cookie is not found
};

export const handleNickname = () => {
  // 检查用户是否接受了 cookie
  const cookieAccepted = getCookie("cookieAccepted");

  // 如果用户还没有接受 Cookie，允许他们继续，不要求输入昵称
  if (!cookieAccepted || cookieAccepted === "false") {
    return null; // 不需要昵称，返回 null
  }

  // 如果 cookie 已被接受，检查是否已存在 nickname
  let nickname = getCookie("nickname");

  if (!nickname) {
    // 提示用户输入昵称
    nickname = window.prompt("Please enter your nickname:");

    if (nickname) {
      setCookie("nickname", nickname, 180); // 存储180天
    } else {
      alert("Nickname is required to proceed!");
      return null; // 如果用户没有输入昵称，返回 null
    }
  }

  return nickname; // 返回昵称
};

// Get the user's public IP address
const getPublicIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json"); // Fetch the public IP address
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch public IP:", error); // Log the error if IP fetching fails
    return null;
  }
};

// Handle logic for storing the hashed IP address in the cookie
export const storeHashedIP = async () => {
  const ipAddress = await getPublicIP(); // Get the user's public IP address
  if (!ipAddress) {
    console.error("Unable to get public IP address");
    return;
  }

  console.log("IP Address:", ipAddress); // Print the IP address to the console
  const hashedIP = await hashIP(ipAddress); // Hash the IP address
  let ipArray = JSON.parse(getCookie("ipArray") || "[]"); // Read existing IP hash array from cookie

  // Check if the current hashed IP already exists in the array
  if (!ipArray.includes(hashedIP)) {
    if (ipArray.length >= 100) {
      // If the array exceeds 100 elements, perform FIFO: remove the first element
      ipArray.shift();
    }
    ipArray.push(hashedIP); // Add the new hashed IP to the array
  }

  // Save the updated array back to the cookie
  setCookie("ipArray", JSON.stringify(ipArray), 180); // Expiration set to 180 days
};

// React component for Cookie consent modal
function Cookie() {
  const {showCookie, setShowCookie} = useContext(CookieContext); // State for showing or hiding the modal

  const handleClose = () => setShowCookie(false); // Close the modal

  const handleAcceptCookie = () => {
    setCookie("cookieAccepted", true, 180); // User accepts cookies, store consent in cookie
    setCookie("nickname", "", 180);
    handleClose(); // Close the modal
  };

  const handleDeclineCookie = () => {
    setCookie("cookieAccepted", false, 2); // User declines cookies, store refusal for 2 days
    setCookie("nickname", "Anonymous", 180);
    handleClose(); // Close the modal
  };

  useEffect(() => {
    // Check if the user has already accepted cookies
    if (!getCookie("cookieAccepted")) {
      setShowCookie(true); // If not accepted, show the modal
    }
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <Modal show={showCookie}>
      <Modal.Header>
        <Modal.Title>Cookie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        The website uses cookies to ensure you get the best experience on our
        website.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeclineCookie}>
          Decline
        </Button>
        <Button variant="primary" onClick={handleAcceptCookie}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Cookie;
