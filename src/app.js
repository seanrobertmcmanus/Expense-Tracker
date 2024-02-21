// Vanilla JS SPA Expense Tracker App
// Author: Sean McManus
import { navigation, navBar } from "./navigation.js";
import { income } from "./income.js";

const {
  loadIncomes,
  saveIncome,
  saveIncomeCategory,
  getCurrentIncomes,
  getIncomeCategories,
  getIncomeTrendData,
  getTotalIncome,
  getCurrentMonthIncome,
} = income();

// Navigation
function pageNavigation() {
  const { setNavCookie, getNavCookie } = navigation();

  // Create Page Handlers
  const incomeHandler = incomePageHandler();

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
    income: {
      dom: document.getElementById("income"),
      title: "Assets and Income",
      button: document.getElementById("income-button"),
      createPageHandler: incomeHandler.createPageHandler,
      destroyPageHandler: incomeHandler.destroyPageHandler,
    },
    expenses: {
      dom: document.getElementById("expenses"),
      title: "Liabilities and Expenses",
      button: document.getElementById("expenses-button"),
    },
    settings: {
      dom: document.getElementById("settings"),
      title: "Settings",
      button: document.getElementById("settings-button"),
    },
  };

  let activePage = pages[getNavCookie()]?.dom || pages.dashboard.dom;
  let previousPage = null;
  showPage(activePage.id);

  // Set a page
  function showPage(pageId) {
    // Destroy Previous Page
    if (previousPage && previousPage.destroyPageHandler) {
      previousPage.destroyPageHandler();
    }
    // Set Active Page
    previousPage = pages[pageId];

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

    // Load Page Data
    if (pages[pageId].createPageHandler) {
      pages[pageId].createPageHandler();
    }
  }

  // Navigation Event Listener
  Object.values(pages).forEach((page) => {
    page.button.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(page.dom.id);
    });
  });
}

// Setup
function setup() {
  // Load Test Data
  async function loadTestData() {
    let data = await fetch("assets/data/exampleData.json");
    data = await data.json();
    // Load and save data
    // Income
    saveIncome(data.Incomes);
    saveIncomeCategory(data.incomeCategories);
    // Expenses
  }
  loadIncomes();
  // Load Navigation
  pageNavigation();
  // Load test data if selected
  loadTestData();
}

// Page Handlers

// Income Page Handler
function incomePageHandler() {
  // DOM Elements
  const incomeTrendChartDOM = document.getElementById("income-trend-chart");
  const totalIncomeValueDOM = document.getElementById("overview-total-income");
  const monthlyIncomeValueDOM = document.getElementById(
    "overview-monthly-income"
  );

  // Rendered Values
  let incomeTrendChart;
  let totalIncomeCountUp;
  let monthlyIncomeCountUp;
  // Load Page Data
  let incomeTrendData = getIncomeTrendData();
  let totalIncome = getTotalIncome();
  let currentMonthIncome = getCurrentMonthIncome();

  // Page Functions
  // Create Page
  function createPageHandler() {
    console.log("Create Income Page");
    // Get Data
    incomeTrendData = getIncomeTrendData();
    totalIncome = getTotalIncome();
    currentMonthIncome = getCurrentMonthIncome();
    // Render Data
    totalIncomeCountUp = new CountUp(totalIncomeValueDOM, 0, totalIncome);
    monthlyIncomeCountUp = new CountUp(
      monthlyIncomeValueDOM,
      0,
      currentMonthIncome
    );
    // Render Chart
    incomeTrendChart = new Chart(incomeTrendChartDOM, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Income",
            showLabel: false,
            data: incomeTrendData,
            fill: true,
            // light red
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            // very dark red
            borderColor: "rgba(0, 255, 0, 1)",
            tension: 0.3,
            radius: 0,
          },
        ],
      },

      options: {
        tooltips: {
          mode: "index",
          intersect: true,
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          y: {
            min: 0,
            max: 1000 + Math.max(...Object.values(incomeTrendData)),
            grid: {
              display: false,
            },
          },
        },
        responsive: true,
      },
    });
    // Render CountUp
    totalIncomeCountUp.start();
    monthlyIncomeCountUp.start();
  }

  function destroyPageHandler() {
    console.log("Destroy Income Page");
    if (incomeTrendChart) incomeTrendChart.destroy();
  }

  return { createPageHandler, destroyPageHandler };
}

document.addEventListener("DOMContentLoaded", setup);
