// DOM Elements
const employeeForm = document.getElementById('employee-form');
const employeeTbody = document.getElementById('employee-tbody');
const messageDiv = document.getElementById('message');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const employeeIdInput = document.getElementById('employee-id');

// Form fields
const firstNameInput = document.getElementById('first_name');
const lastNameInput = document.getElementById('last_name');
const emailInput = document.getElementById('email');
const departmentInput = document.getElementById('department');
const positionInput = document.getElementById('position');
const salaryInput = document.getElementById('salary');

let isEditing = false;

// Load employees on page load
document.addEventListener('DOMContentLoaded', loadEmployees);

// Form submit handler
employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const employeeData = {
        first_name: firstNameInput.value.trim(),
        last_name: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        department: departmentInput.value.trim() || null,
        position: positionInput.value.trim() || null,
        salary: salaryInput.value ? parseFloat(salaryInput.value) : null
    };

    if (isEditing) {
        await updateEmployee(employeeIdInput.value, employeeData);
    } else {
        await createEmployee(employeeData);
    }
});

// Cancel button handler
cancelBtn.addEventListener('click', resetForm);

// Load all employees
async function loadEmployees() {
    try {
        const response = await fetch('/api/employees');
        const employees = await response.json();
        
        if (employees.length === 0) {
            employeeTbody.innerHTML = '<tr><td colspan="8" class="loading">No employees found. Add your first employee!</td></tr>';
            return;
        }
        
        employeeTbody.innerHTML = employees.map(employee => `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.first_name}</td>
                <td>${employee.last_name}</td>
                <td>${employee.email}</td>
                <td>${employee.department || '-'}</td>
                <td>${employee.position || '-'}</td>
                <td>${employee.salary ? '$' + parseFloat(employee.salary).toFixed(2) : '-'}</td>
                <td class="actions">
                    <button class="btn btn-edit" onclick="editEmployee(${employee.id})">Edit</button>
                    <button class="btn btn-delete" onclick="deleteEmployee(${employee.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showMessage('Error loading employees: ' + error.message, 'error');
        employeeTbody.innerHTML = '<tr><td colspan="8" class="loading">Error loading employees</td></tr>';
    }
}

// Create new employee
async function createEmployee(data) {
    try {
        const response = await fetch('/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage('Employee added successfully!', 'success');
            resetForm();
            loadEmployees();
        } else {
            showMessage('Error: ' + result.error, 'error');
        }
    } catch (error) {
        showMessage('Error creating employee: ' + error.message, 'error');
    }
}

// Update employee
async function updateEmployee(id, data) {
    try {
        const response = await fetch(`/api/employees/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage('Employee updated successfully!', 'success');
            resetForm();
            loadEmployees();
        } else {
            showMessage('Error: ' + result.error, 'error');
        }
    } catch (error) {
        showMessage('Error updating employee: ' + error.message, 'error');
    }
}

// Edit employee
async function editEmployee(id) {
    try {
        const response = await fetch(`/api/employees/${id}`);
        const employee = await response.json();
        
        if (response.ok) {
            isEditing = true;
            employeeIdInput.value = employee.id;
            firstNameInput.value = employee.first_name;
            lastNameInput.value = employee.last_name;
            emailInput.value = employee.email;
            departmentInput.value = employee.department || '';
            positionInput.value = employee.position || '';
            salaryInput.value = employee.salary || '';
            
            formTitle.textContent = 'Edit Employee';
            submitBtn.textContent = 'Update Employee';
            cancelBtn.style.display = 'inline-block';
            
            // Scroll to form
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        showMessage('Error loading employee: ' + error.message, 'error');
    }
}

// Delete employee
async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/employees/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage('Employee deleted successfully!', 'success');
            loadEmployees();
        } else {
            showMessage('Error: ' + result.error, 'error');
        }
    } catch (error) {
        showMessage('Error deleting employee: ' + error.message, 'error');
    }
}

// Reset form
function resetForm() {
    isEditing = false;
    employeeForm.reset();
    employeeIdInput.value = '';
    formTitle.textContent = 'Add New Employee';
    submitBtn.textContent = 'Add Employee';
    cancelBtn.style.display = 'none';
}

// Show message
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type} show`;
    
    setTimeout(() => {
        messageDiv.className = 'message';
    }, 5000);
}

// Make functions global for onclick handlers
window.editEmployee = editEmployee;
window.deleteEmployee = deleteEmployee;
