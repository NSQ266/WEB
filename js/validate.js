// validate.js

// 1. Validate bỏ trống (Required)
function validateRequired(input, errorMessages) {
    if (input.trim() === "") {
        errorMessages.push(`${input.name || "Trường này"} không được bỏ trống.`);
    }
}

// 2. Validate số (Number)
function validateNumber(input, errorMessages) {
    if (isNaN(input) || input.trim() === "") {
        errorMessages.push(`${input.name || "Trường này"} phải là một số hợp lệ.`);
    }
}

// 3. Validate độ dài (Min/Max Length)
function validateLength(input, minLength, maxLength, errorMessages) {
    if (input.length < minLength || input.length > maxLength) {
        errorMessages.push(`${input.name || "Trường này"} phải có độ dài từ ${minLength} đến ${maxLength} ký tự.`);
    }
}

// 4. Validate Email
function validateEmail(input, errorMessages) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(input)) {
        errorMessages.push("Email không hợp lệ.");
    }
}

// 5. Validate URL
function validateURL(input, errorMessages) {
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}\/?$/;
    if (!urlRegex.test(input)) {
        errorMessages.push("URL không hợp lệ.");
    }
}

// 6. Validate số nằm trong khoảng (Range)
function validateRange(input, min, max, errorMessages) {
    if (input < min || input > max) {
        errorMessages.push(`${input.name || "Trường này"} phải nằm trong khoảng từ ${min} đến ${max}.`);
    }
}

// 7. Validate ký tự đặc biệt (No Special Characters)
function validateNoSpecialChars(input, errorMessages) {
    const specialCharRegex = /[^a-zA-Z0-9 ]/;
    if (specialCharRegex.test(input)) {
        errorMessages.push(`${input.name || "Trường này"} không được chứa ký tự đặc biệt.`);
    }
}

// 8. Validate ngày hợp lệ (Date)
function validateDate(input, errorMessages) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Format: YYYY-MM-DD
    if (!dateRegex.test(input)) {
        errorMessages.push("Ngày không hợp lệ. Định dạng phải là YYYY-MM-DD.");
    }
}

// 9. Validate mật khẩu (Password Strength)
function validatePassword(input, errorMessages) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).{8,}$/;
    if (!passwordRegex.test(input)) {
        errorMessages.push("Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.");
    }
}

// 10. Validate xác nhận mật khẩu (Confirm Password)
function validateConfirmPassword(password, confirmPassword, errorMessages) {
    if (password !== confirmPassword) {
        errorMessages.push("Mật khẩu xác nhận không khớp.");
    }
}

// Hàm hiển thị lỗi
function displayErrors(errorMessages) {
    let errorMessagesDiv = document.getElementById("errorMessages");
    if (!errorMessagesDiv) {
        errorMessagesDiv = document.createElement("div");
        errorMessagesDiv.id = "errorMessages";
        document.body.appendChild(errorMessagesDiv);
    }

    errorMessagesDiv.innerHTML = ''; // Xóa lỗi cũ

    errorMessages.forEach(function(message) {
        let p = document.createElement("p");
        p.textContent = message;
        p.style.color = "red";
        errorMessagesDiv.appendChild(p);
    });
}

// Hàm tổng hợp để validate toàn bộ form
function validateForm(event) {
    event.preventDefault(); // Ngừng gửi form nếu có lỗi

    let errorMessages = []; // Danh sách lỗi

    // Lấy giá trị các input
    let email = document.getElementById("email").value;
    let comment = document.getElementById("com").value;
    let rating = document.getElementById("rate").value;
    let password = document.getElementById("password")?.value || "";
    let confirmPassword = document.getElementById("confirmPassword")?.value || "";

    // Gọi các hàm validate
    validateRequired(email, errorMessages);
    validateRequired(comment, errorMessages);
    validateEmail(email, errorMessages);
    validateRange(rating, 1, 5, errorMessages);
    validatePassword(password, errorMessages);
    validateConfirmPassword(password, confirmPassword, errorMessages);

    // Hiển thị lỗi hoặc thông báo thành công
    if (errorMessages.length > 0) {
        displayErrors(errorMessages);
    } else {
        alert("Form đã được gửi thành công!");
        document.getElementById("commentForm").reset(); // Reset form
    }
}

// Gắn sự kiện submit vào form
document.getElementById("commentForm").addEventListener("submit", validateForm);
