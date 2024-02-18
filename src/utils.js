// Cookie functions
function cookies() {
  // Set Cookie
  function setCookie(name, value, options = {}) {
    options = {
      path: "/", // Default to the root path
      ...options, // Overwrite with passed options
    };

    // Check if cookie expires, create expiration date UTC string
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    const encodedValue = encodeURIComponent(value);
    let cookie = `${name}=${encodedValue}`;
    // Add Options to Cookie
    for (const [key, value] of Object.entries(options)) {
      cookie += `; ${key}`;
      if (value !== true) {
        cookie += `=${value}`;
      }
    }
    // Set the cookie
    document.cookie = cookie;
  }

  // Get Cookie
  function getCookie(name) {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));
    if (cookie) {
      return decodeURIComponent(cookie.split("=")[1]);
    }
    return null;
  }

  // Delete Cookie
  function deleteCookie(name) {
    setCookie(name, "", {
      "max-age": -1,
    });
  }

  return { setCookie, getCookie, deleteCookie };
}

export { cookies };
