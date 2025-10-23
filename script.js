// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Quadratic Equation Solver
    const quadraticForm = document.getElementById('quadraticForm');
    const resetQuadraticBtn = document.getElementById('resetQuadratic');
    
    // Grading System
    const gradingForm = document.getElementById('gradingForm');
    const resetGradingBtn = document.getElementById('resetGrading');
    
    // Event Listeners for Quadratic Solver
    quadraticForm.addEventListener('submit', solveQuadraticEquation);
    resetQuadraticBtn.addEventListener('click', resetQuadraticForm);
    
    // Event Listeners for Grading System
    gradingForm.addEventListener('submit', convertScoreToGrade);
    resetGradingBtn.addEventListener('click', resetGradingForm);
});

// Function to solve quadratic equation
function solveQuadraticEquation(e) {
    e.preventDefault();
    
    // Get input values
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    
    // Clear previous errors
    clearErrors(['aError', 'bError', 'cError']);
    
    // Validate inputs
    let isValid = true;
    
    if (isNaN(a)) {
        showError('aError', 'Please enter a valid number for coefficient a');
        isValid = false;
    } else if (a === 0) {
        showError('aError', 'Coefficient a cannot be zero');
        isValid = false;
    }
    
    if (isNaN(b)) {
        showError('bError', 'Please enter a valid number for coefficient b');
        isValid = false;
    }
    
    if (isNaN(c)) {
        showError('cError', 'Please enter a valid number for coefficient c');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Calculate discriminant
    const discriminant = b * b - 4 * a * c;
    
    // Determine nature of roots and calculate solutions
    let resultHTML = '<h3>Equation: ' + formatCoefficient(a) + 'x² ' + formatCoefficient(b, true) + 'x ' + formatCoefficient(c, true) + ' = 0</h3>';
    resultHTML += '<p><strong>Discriminant (D)</strong> = ' + discriminant.toFixed(2) + '</p>';
    
    if (discriminant > 0) {
        // Two distinct real roots
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        resultHTML += '<p><strong>Nature of roots:</strong> Two distinct real roots</p>';
        resultHTML += '<p><strong>Root 1:</strong> x = ' + root1.toFixed(4) + '</p>';
        resultHTML += '<p><strong>Root 2:</strong> x = ' + root2.toFixed(4) + '</p>';
    } else if (discriminant === 0) {
        // One real repeated root
        const root = -b / (2 * a);
        resultHTML += '<p><strong>Nature of roots:</strong> One real repeated root</p>';
        resultHTML += '<p><strong>Root:</strong> x = ' + root.toFixed(4) + '</p>';
    } else {
        // Two complex conjugate roots
        const realPart = -b / (2 * a);
        const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
        resultHTML += '<p><strong>Nature of roots:</strong> Two complex conjugate roots</p>';
        resultHTML += '<p><strong>Root 1:</strong> x = ' + realPart.toFixed(4);
        resultHTML += '<p><strong>Root 2:</strong> x = ' + realPart.toFixed(4);
    }
    
    document.getElementById('quadraticResults').innerHTML = resultHTML;
}

// Function to convert score to grade
function convertScoreToGrade(e) {
    e.preventDefault();
    
    // Get input value
    const score = parseInt(document.getElementById('score').value);
    
    // Clear previous error
    clearErrors(['scoreError']);
    
    // Validate input
    if (isNaN(score)) {
        showError('scoreError', 'Please enter a valid number');
        return;
    }
    
    if (score < 0 || score > 100) {
        showError('scoreError', 'Score must be between 0 and 100');
        return;
    }
    
    // Determine grade
    let grade, gradeClass;
    
    if (score >= 85) {
        grade = 'A+';
        gradeClass = 'grade-Aplus';
    } else if (score >= 75) {
        grade = 'A';
        gradeClass = 'grade-A';
    } else if (score >= 65) {
        grade = 'B+';
        gradeClass = 'grade-Bplus';
    } else if (score >= 60) {
        grade = 'B';
        gradeClass = 'grade-B';
    } else if (score >= 55) {
        grade = 'C+';
        gradeClass = 'grade-Cplus';
    } else if (score >= 50) {
        grade = 'C';
        gradeClass = 'grade-C';
    } else {
        grade = 'D';
        gradeClass = 'grade-D';
    }
    
    // Display result
    const resultHTML = '<h3>Grade Conversion Result</h3><p>Score <strong>' + score + '</strong> → Grade <span class="' + gradeClass + '"><strong>' + grade + '</strong></span></p>';
    
    document.getElementById('gradingResults').innerHTML = resultHTML;
}

// Function to reset quadratic form
function resetQuadraticForm() {
    document.getElementById('quadraticForm').reset();
    document.getElementById('quadraticResults').innerHTML = '';
    clearErrors(['aError', 'bError', 'cError']);
}

// Function to reset grading form
function resetGradingForm() {
    document.getElementById('gradingForm').reset();
    document.getElementById('gradingResults').innerHTML = '';
    clearErrors(['scoreError']);
}

// Helper function to show error messages
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Helper function to clear error messages
function clearErrors(elementIds) {
    elementIds.forEach(function(id) {
        document.getElementById(id).textContent = '';
    });
}

// Helper function to format coefficients for display
function formatCoefficient(value, withSign) {
    if (withSign === undefined) withSign = false;
    
    if (value === 0) return '';
    
    let formatted = '';
    if (withSign) {
        formatted += value >= 0 ? '+' : '';
    }
    
    // Handle special cases for 1 and -1
    if (value === 1 && withSign) {
        formatted += '+';
    } else if (value === 1) {
        // Do nothing, just show empty for coefficient 1
    } else if (value === -1) {
        formatted += '-';
    } else {
        formatted += value;
    }
    
    return formatted;
}

// Test function for quadratic solver (can be used for debugging)
function testQuadraticSolver() {
    console.log("Testing Quadratic Solver...");
    
    // Test case 1: Two real roots (x² - 5x + 6 = 0)
    const a1 = 1, b1 = -5, c1 = 6;
    const discriminant1 = b1 * b1 - 4 * a1 * c1;
    console.log("Test 1 - Discriminant: " + discriminant1);
    
    // Test case 2: One real root (x² - 4x + 4 = 0)
    const a2 = 1, b2 = -4, c2 = 4;
    const discriminant2 = b2 * b2 - 4 * a2 * c2;
    console.log("Test 2 - Discriminant: " + discriminant2);
    
    // Test case 3: Complex roots (x² + 2x + 5 = 0)
    const a3 = 1, b3 = 2, c3 = 5;
    const discriminant3 = b3 * b3 - 4 * a3 * c3;
    console.log("Test 3 - Discriminant: " + discriminant3);
}

// Test function for grading system (can be used for debugging)
function testGradingSystem() {
    console.log("Testing Grading System...");
    
    // Test edge cases
    const testScores = [0, 49, 50, 54, 55, 59, 60, 64, 65, 74, 75, 84, 85, 100];
    
    testScores.forEach(function(score) {
        let grade;
        if (score >= 85) grade = 'A+';
        else if (score >= 75) grade = 'A';
        else if (score >= 65) grade = 'B+';
        else if (score >= 60) grade = 'B';
        else if (score >= 55) grade = 'C+';
        else if (score >= 50) grade = 'C';
        else grade = 'D';
        
        console.log("Score: " + score + " → Grade: " + grade);
    });
}

// Uncomment the lines below to run tests
// testQuadraticSolver();
// testGradingSystem();