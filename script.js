document.getElementById('bmr-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const weightValue = parseFloat(document.getElementById('weight-value').value);
    const weightUnit = document.getElementById('weight-unit').value;
    let heightValue = document.getElementById('height-value').value;
    const heightUnit = document.getElementById('height-unit').value;
    const age = parseInt(document.getElementById('age').value);
    const activityLevel = parseFloat(document.getElementById('activity-level').value);

    // Log inputs to check if they are valid
    console.log('Weight:', weightValue, 'Unit:', weightUnit);
    console.log('Height:', heightValue, 'Unit:', heightUnit);
    console.log('Age:', age);
    console.log('Activity Level:', activityLevel);

    // Check if any input is NaN or invalid
    if (isNaN(weightValue) || isNaN(parseFloat(heightValue)) || isNaN(age) || isNaN(activityLevel)) {
        alert('Please enter valid numeric values for all inputs.');
        return;
    }

    // Convert weight to kilograms if needed
    let weightInKg = weightUnit === 'kg' ? weightValue : weightValue * 0.453592;

    // Convert height to centimeters if needed
    let heightInCm;
    if (heightUnit === 'cm') {
        heightInCm = parseFloat(heightValue);
    } else if (heightUnit === 'ft') {
        // Split the height by the decimal point to separate feet and inches
        let [feet, inches] = heightValue.split('.');
        feet = parseFloat(feet) || 0;
        inches = parseFloat(inches) || 0;

        // Convert the feet to centimeters and inches to centimeters
        heightInCm = (feet * 30.48) + (inches * 2.54);
    } else { // heightUnit === 'in'
        heightInCm = parseFloat(heightValue) * 2.54;
    }

    // BMR calculation using the Mifflin-St Jeor Equation
    const bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5; // for men
    const totalBmr = bmr * activityLevel;

    const resultDiv = document.getElementById('result');
    resultDiv.style.opacity = 0;
    resultDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultDiv.innerHTML = `Your BMR is approximately ${totalBmr.toFixed(2)} calories/day.`;
        resultDiv.style.opacity = 1;
        resultDiv.style.transform = 'translateY(0)';
    }, 300);
});
