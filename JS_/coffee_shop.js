// Calculate the final price of a coffee order
function calculatePrice(size, quantity, isMember, hour) {

    let price;
    let SubTotal;

    // Validation
    if (size !== 'large' && size !== 'medium' && size !== 'small') {
        return "Invalid size";
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        return "Invalid quantity";
    }

    if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
        return "Invalid hour";
    }

    
    switch (size) {
        case 'large':
            price = 4.5;
            break;

        case 'medium':
            price = 3.5;
            break;

        case 'small':
            price = 2.5;
            break;
    }

  
    SubTotal = price * quantity;

    // Bulk discount of 10%
    if (quantity >= 5) {
        SubTotal = SubTotal - ((SubTotal * 10) / 100);
    }

    // Member discount of 5%
    if (isMember === true) {
        SubTotal = SubTotal - ((SubTotal * 5) / 100);
    }

    // Happy hour discount
    if (hour >= 15 && hour <= 17) {
        SubTotal -= 1;
    }

    // Prevent negative totals
    if (SubTotal < 0) {
        return 0;
    } else {
        return Math.round(SubTotal * 100) / 100;
    }
}

console.log(calculatePrice("large", 2, false, 10));
console.log(calculatePrice("medium", 5, true, 16));
console.log(calculatePrice("small", 4, true, 9));
console.log(calculatePrice("small", 1, false, 15));
console.log(calculatePrice("xl", 1, false, 9));