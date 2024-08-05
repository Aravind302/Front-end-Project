let totalCost = 0;
let courseNames = [];
let courseFees = [];
let studentDetails = [];

function storevalue(courseName, courseFee, skillGroupName) {
    // Get the student details
    const studentName = document.getElementById('studentName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const studentEmail = document.getElementById('studentEmail').value;

    // Validate student details
    if (studentName === '' || phoneNumber === '' || studentEmail === '') {
        alert('Please fill out all student details.');
        return;
    }

    // Check if the student has already enrolled in a course
    const studentExists = studentDetails.some(student => 
        student.name === studentName && 
        student.phone === phoneNumber && 
        student.email === studentEmail
    );

    if (studentExists) {
        alert('You have already selected a course.');
        return;
    }

    // Get the soft skills option if selected
    const softSkills = document.querySelector(`input[name="${skillGroupName}"]:checked`);
    let softSkillsCost = 0;

    if (softSkills) {
        softSkillsCost = parseInt(softSkills.value);
    }

    // Calculate total cost for the selected course
    const totalCourseCost = courseFee + softSkillsCost;

    // Update total cost
    totalCost += totalCourseCost;

    // Store course name and fee
    courseNames.push(courseName);
    courseFees.push(totalCourseCost);

    // Store student details
    studentDetails.push({ name: studentName, phone: phoneNumber, email: studentEmail, courseName: courseName });

    alert(`${courseName} added successfully. Total Cost: Rs. ${totalCost}`);

    // Clear the radio button selection
    if (softSkills) {
        softSkills.checked = false;
    }

    // Clear student details inputs
    document.getElementById('studentName').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('studentEmail').value = '';
}

function addnew() {
    const container = document.getElementById('container');
    if (!container.classList.contains('active')) {
        let courseStructure = '<h3>Course Structure Details</h3>';
        for (let i = 0; i < courseNames.length; i++) {
            courseStructure += `<strong>${courseNames[i]}: Rs. ${courseFees[i]}</strong><br><br>`;
        }
        courseStructure += `<strong>Total Cost: Rs. ${totalCost}</strong><br><br>`;
        
        courseStructure += '<h3>Student Details</h3>';
        for (let i = 0; i < studentDetails.length; i++) {
            courseStructure += `Name: ${studentDetails[i].name}, Phone: ${studentDetails[i].phone}, Email: ${studentDetails[i].email}, Course: ${studentDetails[i].courseName}<br>`;
        }

        container.innerHTML = courseStructure;
        container.classList.add('active');
    } else {
        container.classList.remove('active');
        container.innerHTML = '';
    }
}
