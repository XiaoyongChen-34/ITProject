import hashlib
import socket
import struct

def ip_to_integer(ip_address):
    """
    Converts an IP address (IPv4 or IPv6) to an integer.
    """
    try:
        # Try to convert IPv4 address
        packed_ip = socket.inet_aton(ip_address)
        return struct.unpack("!L", packed_ip)[0]
    except socket.error:
        # Fallback to converting IPv6 address
        packed_ip = socket.inet_pton(socket.AF_INET6, ip_address)
        high, low = struct.unpack("!QQ", packed_ip)
        return (high << 64) | low

def hash_ip_to_10_digit(ip_address):
    """
    Hash an IP address to a 10-digit number.
    """
    # Convert IP address to an integer
    ip_integer = ip_to_integer(ip_address)
    
    # Create a SHA-256 hash of the integer
    hash_object = hashlib.sha256(str(ip_integer).encode())
    hex_dig = hash_object.hexdigest()
    
    # Convert the first part of the hash to a large integer
    large_int = int(hex_dig[:15], 16)
    
    # Map it to a 10-digit number
    ten_digit_number = large_int % 10**10
    
    return f"{ten_digit_number:010}"

# Example usage
ip = "192.168.1.1"
hashed_ip = hash_ip_to_10_digit(ip)
print(f"Hashed IP address: {hashed_ip}")