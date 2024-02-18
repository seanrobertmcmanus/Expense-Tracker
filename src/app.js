// Vanilla JS SPA Expense Tracker App
// Author: Sean McManus
import { navigation, navBar } from "./navigation.js";

// Other Data Structures
const bankAccountType = [
  "Checking",
  "Savings",
  "Money Market",
  "Joint Account",
  "Credit Card",
];

// Navigation
function pageNavigation() {
  const { setNavCookie, getNavCookie } = navigation();

  const pages = {
    dashboard: {
      dom: document.getElementById("dashboard"),
      title: "Dashboard",
      button: document.getElementById("dashboard-button"),
    },
    trends: {
      dom: document.getElementById("trends"),
      title: "Trends",
      button: document.getElementById("trends-button"),
    },
    aai: {
      dom: document.getElementById("aai"),
      title: "Assets and Income",
      button: document.getElementById("aai-button"),
    },
    lae: {
      dom: document.getElementById("lae"),
      title: "Liabilities and Expenses",
      button: document.getElementById("lae-button"),
    },
    settings: {
      dom: document.getElementById("settings"),
      title: "Settings",
      button: document.getElementById("settings-button"),
    },
  };

  let activePage = pages[getNavCookie()]?.dom || pages.dashboard.dom;
  showPage(activePage.id);
  // Set a page
  function showPage(pageId) {
    // Hide all pages and remove active class from buttons
    Object.values(pages).forEach((page) => {
      page.dom.className = "hidden";
      page.button.className = "";
    });

    // Show active page
    activePage = pages[pageId].dom;
    setNavCookie(pageId);
    activePage.className = "page";
    // Add active class to button
    pages[pageId].button.className = "active";
  }

  // Navigation Event Listener
  Object.values(pages).forEach((page) => {
    page.button.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(page.dom.id);
    });
  });
}

// Start
// Load Navigation
pageNavigation();

// Load Page based on selected navigation
