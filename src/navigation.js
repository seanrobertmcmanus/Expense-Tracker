// Expense Tracking App Navigation Handling
import { cookies } from "./utils.js";

// Page Handling
function navigation() {
  const { setCookie, getCookie } = cookies();

  // Set the currentPage cookie
  function setNavCookie(currentPage) {
    setCookie("currentPage", currentPage, { maxAge: 300 }); // 5 minutes
  }

  function getNavCookie() {
    return getCookie("currentPage");
  }

  return { setNavCookie, getNavCookie };
}

// Navigation Bar Handling
function navBar() {

}

export { navigation, navBar };
