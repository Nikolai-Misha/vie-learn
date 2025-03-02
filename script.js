// Kiểm tra chế độ hệ thống và trạng thái đã lưu
const themeToggle = document.getElementById('theme-toggle');
const themeTooltip = document.getElementById('theme-tooltip');
const switchSlider = document.querySelector('.switch');
const body = document.body;

// Trạng thái chế độ: "system", "light", hoặc "dark"
let currentMode = localStorage.getItem('mode') || 'system'; // "system" là mặc định
let isSystemMode = currentMode === 'system';

// Hàm kiểm tra trạng thái giao diện hệ thống
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Hàm áp dụng chế độ
function applyTheme(mode) {
    currentMode = mode;
    isSystemMode = mode === 'system';

    let effectiveTheme;

    if (isSystemMode) {
        effectiveTheme = getSystemTheme(); // Lấy trạng thái từ hệ thống
        themeTooltip.setAttribute('title', 'Hệ thống');
    } else {
        effectiveTheme = mode; // Sử dụng chế độ được chọn thủ công
        themeTooltip.setAttribute('title', mode === 'light' ? 'Sáng' : 'Tối');
    }

    // Áp dụng giao diện
    body.setAttribute('data-theme', effectiveTheme);

    // Đồng bộ trạng thái nút gạt
    themeToggle.checked = effectiveTheme === 'dark';
    themeToggle.setAttribute('value', effectiveTheme);

    // Lưu trạng thái vào localStorage
    localStorage.setItem('mode', mode);
}

// Khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo với trạng thái đã lưu hoặc mặc định là "System"
    applyTheme(currentMode);

    // Lắng nghe thay đổi từ hệ thống
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        if (isSystemMode) {
            applyTheme('system'); // Cập nhật trạng thái khi hệ thống thay đổi
        }
    });
});

// Hàm chuyển đổi chế độ khi người dùng click
function toggleTheme() {
    if (isSystemMode) {
        // Khi đang ở "System", lần click đầu tiên sẽ chuyển sang chế độ ngược với hệ thống
        const systemTheme = getSystemTheme();
        applyTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else if (currentMode === 'light') {
        applyTheme('dark'); // Từ "Light" sang "Dark"
    } else {
        applyTheme('light'); // Từ "Dark" sang "Light"
    }
}

// Hàm tìm kiếm
function searchContent() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    if (searchTerm) {
        console.log(`Đang tìm kiếm: ${searchTerm}`);
        // Ở đây bạn có thể thêm logic để lọc nội dung thực tế
    }
}
