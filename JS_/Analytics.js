
// Question 2 - Coffee Shop Order Analytics

const orders = [
  { id: 1, customer: "Rami", items: ["latte", "croissant"], total: 7.5 },
  { id: 2, customer: "Lea", items: ["espresso"], total: 3.0 },
  { id: 3, customer: "Rami", items: ["latte", "muffin"], total: 8.0 },
  { id: 4, customer: "Karim", items: ["mocha", "croissant"], total: 9.0 },
  { id: 5, customer: "Lea", items: ["latte"], total: 4.5 },
  { id: 6, customer: "Nour", items: ["espresso", "latte", "muffin"], total: 10.5 },
];
const mondayCustomers = ["Rami", "Lea", "Karim", "Nour"];
const tuesdayCustomers = ["Lea", "Nour", "Tony", "Rami", "Lea"];

// Part A - Arrays and array methods


// Returns the sum of all order totals using reduce (the sum starts at 0).
function getTotalRevenue(orders) {
  return orders.reduce((sum, order) => sum + order.total, 0);
}

// Returns a new array with the orders whose total is greater than or equal to min.
function getBigOrders(orders, min) {
  return orders.filter((order) => order.total >= min);
}

// Returns one summary string per order, e.g. "#1 Rami - 2 item(s) - $7.50".
function getOrderSummaries(orders) {
  return orders.map(
    (order) =>
      `#${order.id} ${order.customer} - ${order.items.length} item(s) - $${order.total.toFixed(2)}`
  );
}

// Returns a copy of orders sorted from highest to lowest total (the original stays untouched).
function getSortedByTotal(orders) {
  return [...orders].sort((a, b) => b.total - a.total);
}

// Returns the ids of all orders that contain the given item.
function findOrdersByItem(orders, item) {
  return orders
    .filter((order) => order.items.includes(item))
    .map((order) => order.id);
}

// Part B - Objects as counters

// Returns an object counting how many times each item was ordered.
function countItems(orders) {
  const counts = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });
  });
  return counts;
}

// Returns the most ordered item using the counts from countItems (null if there are no items).
function getMostPopularItem(orders) {
  const counts = countItems(orders);
  let bestItem = null;
  let bestCount = 0;
  for (const [item, count] of Object.entries(counts)) {
    if (count > bestCount) {
      bestItem = item;
      bestCount = count;
    }
  }
  return bestItem;
}

// Returns an object with the total amount spent by each customer.
function getSpendingPerCustomer(orders) {
  return orders.reduce((spending, order) => {
    spending[order.customer] = (spending[order.customer] || 0) + order.total;
    return spending;
  }, {});
}

// Part C - Working with Set

// Returns an array of unique customer names (the Set removes duplicates automatically).
function getUniqueCustomers(orders) {
  return [...new Set(orders.map((order) => order.customer))];
}

// Returns every distinct item ordered: flatMap merges all item lists, the Set removes repeats.
function getAllItems(orders) {
  return [...new Set(orders.flatMap((order) => order.items))];
}

// Returns the customers found in both sets (intersection).
function bothDays(setA, setB) {
  return [...setA].filter((name) => setB.has(name));
}

// Returns the customers found in setA but not in setB (difference).
function onlyFirstDay(setA, setB) {
  return [...setA].filter((name) => !setB.has(name));
}

// Returns everyone found in either set, without duplicates (union).
function allCustomers(setA, setB) {
  return [...new Set([...setA, ...setB])];
}

const mondaySet = new Set(mondayCustomers);
const tuesdaySet = new Set(tuesdayCustomers);

// Test helper


// Compares a result with the expected value and prints PASS or FAIL.
function check(label, actual, expected) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${passed ? "PASS" : "FAIL"} - ${label}`);
}


// Results


console.log("Part A");
console.log("Total revenue:", getTotalRevenue(orders));
console.log("Big orders (total >= 8):", getBigOrders(orders, 8));
console.log("Order summaries:", getOrderSummaries(orders));
console.log("Sorted by total (high to low):", getSortedByTotal(orders));
console.log("Orders containing muffin:", findOrdersByItem(orders, "muffin"));

console.log("\n Part B");
console.log("Item counts:", countItems(orders));
console.log("Most popular item:", getMostPopularItem(orders));
console.log("Spending per customer:", getSpendingPerCustomer(orders));

console.log("\nPart C");
console.log("Unique customers:", getUniqueCustomers(orders));
console.log("All distinct items:", getAllItems(orders));
console.log("Came on both days:", bothDays(mondaySet, tuesdaySet));
console.log("Came only on Monday:", onlyFirstDay(mondaySet, tuesdaySet));
console.log("All customers (either day):", allCustomers(mondaySet, tuesdaySet));

// tuesdayCustomers has 5 entries, but "Lea" appears twice.
// A Set only stores unique values, so the second "Lea" is ignored -> size is 4, not 5.
console.log("Distinct Tuesday customers:", tuesdaySet.size);


// Given test cases


console.log("\n Given test cases");
check("getTotalRevenue = 42.5", getTotalRevenue(orders), 42.5);
check("getBigOrders(8) ids = [3, 4, 6]", getBigOrders(orders, 8).map((o) => o.id), [3, 4, 6]);
check("getOrderSummaries first line", getOrderSummaries(orders)[0], "#1 Rami - 2 item(s) - $7.50");
check("getSortedByTotal ids = [6, 4, 3, 1, 5, 2]", getSortedByTotal(orders).map((o) => o.id), [6, 4, 3, 1, 5, 2]);
check("findOrdersByItem('muffin') = [3, 6]", findOrdersByItem(orders, "muffin"), [3, 6]);
check("countItems", countItems(orders), { latte: 4, croissant: 2, espresso: 2, muffin: 2, mocha: 1 });
check("getMostPopularItem = 'latte'", getMostPopularItem(orders), "latte");
check("getSpendingPerCustomer", getSpendingPerCustomer(orders), { Rami: 15.5, Lea: 7.5, Karim: 9, Nour: 10.5 });
check("getUniqueCustomers", getUniqueCustomers(orders), ["Rami", "Lea", "Karim", "Nour"]);
check("getAllItems", getAllItems(orders), ["latte", "croissant", "espresso", "muffin", "mocha"]);
check("bothDays", bothDays(mondaySet, tuesdaySet), ["Rami", "Lea", "Nour"]);
check("onlyFirstDay", onlyFirstDay(mondaySet, tuesdaySet), ["Karim"]);
check("allCustomers", allCustomers(mondaySet, tuesdaySet), ["Rami", "Lea", "Karim", "Nour", "Tony"]);
check("Tuesday Set size = 4", tuesdaySet.size, 4);

// Our own extra tests

console.log("\nExtra tests");
check("getTotalRevenue([]) = 0", getTotalRevenue([]), 0);
check("getBigOrders(10) ids = [6]", getBigOrders(orders, 10).map((o) => o.id), [6]);
check("findOrdersByItem('latte') = [1, 3, 5, 6]", findOrdersByItem(orders, "latte"), [1, 3, 5, 6]);
check("findOrdersByItem('tea') = []", findOrdersByItem(orders, "tea"), []);
check("getMostPopularItem([]) = null", getMostPopularItem([]), null);
check("Only Tuesday (reversed difference) = ['Tony']", onlyFirstDay(tuesdaySet, mondaySet), ["Tony"]);
check("Original orders array not modified", orders.map((o) => o.id), [1, 2, 3, 4, 5, 6]);