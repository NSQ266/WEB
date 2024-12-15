document.getElementById("commentForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngừng gửi form nếu có lỗi

    let email = document.getElementById("email").value;
    let comment = document.getElementById("com").value;
    let rating = document.getElementById("rate").value;

    let errorMessages = [];

    // Kiểm tra trường Comment có bị bỏ trống không
    if (comment.trim() === "") {
        errorMessages.push("Comment không được bỏ trống.");
    }

    // Kiểm tra trường Rating có phải là một số hợp lệ từ 1 đến 5 không
    if (isNaN(rating) || rating < 1 || rating > 5) {
        errorMessages.push("Rating phải là một số và nằm trong khoảng từ 1 đến 5.");
    }

    // Kiểm tra Email có đúng định dạng không
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        errorMessages.push("Email không hợp lệ.");
    }

    // Hiển thị các lỗi nếu có
    let errorMessagesDiv = document.getElementById("errorMessages");
    errorMessagesDiv.innerHTML = ''; // Xóa các lỗi cũ

    if (errorMessages.length > 0) {
        errorMessages.forEach(function (message) {
            let p = document.createElement("p");
            p.textContent = message;
            p.classList.add("error-message"); // Gán class để dễ định dạng
            errorMessagesDiv.appendChild(p);
        });
    } else {
        // Nếu không có lỗi, thông báo thành công
        alert("Form đã được gửi thành công!");
        document.getElementById("commentForm").reset(); // Đặt lại form
    }
});
