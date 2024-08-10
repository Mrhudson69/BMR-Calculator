document.getElementById('bmr-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const weightValue = parseFloat(document.getElementById('weight-value').value);
    const weightUnit = document.getElementById('weight-unit').value;
    const heightValue = parseFloat(document.getElementById('height-value').value);
    const heightUnit = document.getElementById('height-unit').value;
    const age = parseInt(document.getElementById('age').value);
    const activityLevel = parseFloat(document.getElementById('activity-level').value);

    // Convert weight to kilograms if needed
    let weightInKg = weightUnit === 'kg' ? weightValue : weightValue * 0.453592;

    // Convert height to centimeters if needed
    let heightInCm;
    if (heightUnit === 'cm') {
        heightInCm = heightValue;
    } else if (heightUnit === 'ft') {
        heightInCm = heightValue * 30.48;
    } else { // heightUnit === 'in'
        heightInCm = heightValue * 2.54;
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
