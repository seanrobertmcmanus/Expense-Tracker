// Income handling
function income() {
  let currentIncomes = [];
  let incomeCategories = [];

  // Load From Local Storage
  function loadIncomes() {
    // Load from Local Storage
    currentIncomes = JSON.parse(localStorage.getItem("currentIncomes")) || [];
    incomeCategories =
      JSON.parse(localStorage.getItem("incomeCategories")) || [];
  }

  // Save Income to Local Storage
  function saveIncome(incomes) {
    currentIncomes = incomes;
    // Save to Local Storage
    localStorage.setItem("currentIncomes", JSON.stringify(currentIncomes));
  }

  // Save Income Category to Local Storage
  function saveIncomeCategory(categories) {
    incomeCategories = categories;
    // Save to Local Storage
    localStorage.setItem("incomeCategories", JSON.stringify(incomeCategories));
  }

  // Add Income (full new income object)

  // Remove Income

  // Add Income Entry (entry to existing income object)

  // Remove Income Entry

  // Add Income Category

  // Remove Income Category

  // Trends and Analysis
  // Get Total Income (All Time)
  function getTotalIncome(value = "all") {
    let total = 0;
    currentIncomes.forEach((income) => {
      income.amounts.forEach((entry) => {
        if (value === "all" || entry.category === value) {
          total += entry.value;
        }
      });
    });
    return total;
  }

  // Get Total Income (Current Month)
  function getCurrentMonthIncome(value = "all") {
    let total = 0;
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    currentIncomes.forEach((income) => {
      income.amounts.forEach((entry) => {
        let entryDate = new Date(entry.date);
        if (
          entryDate.getMonth() === month &&
          entryDate.getFullYear() === year
        ) {
          if (value === "all" || entry.category === value) {
            total += entry.value;
          }
        }
      });
    });
    return total;
  }

  // Get Total Income Trend Data for the last 12 months
  function getIncomeTrendData() {
    let dataSet = {};
    // Get Start Date
    let date = new Date();

    date.setMonth(date.getMonth() - 12);
    console.log(date);
    // Get data from each income
    currentIncomes.forEach((income) => {
      // Get data for each entry
      income.amounts.forEach((entry) => {
        // Check if entry is within the last 12 months
        if (new Date(entry.date) > date) {
          // Tally Total income.value for that month
          let key = entry.date;
          if (dataSet[key]) {
            dataSet[key] += entry.value;
          } else {
            dataSet[key] = entry.value;
          }
        }
      });
    });

    return dataSet;
  }

  // Get current incomes
  function getCurrentIncomes() {
    return currentIncomes;
  }
  // Get income categories
  function getIncomeCategories() {
    return incomeCategories;
  }

  return {
    loadIncomes,
    saveIncome,
    saveIncomeCategory,
    getCurrentIncomes,
    getIncomeCategories,
    getIncomeTrendData,
    getTotalIncome,
    getCurrentMonthIncome,
  };
}

export { income };
