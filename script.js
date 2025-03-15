// Kiểm tra chế độ hệ thống và trạng thái đã lưu
const themeToggle = document.getElementById('theme-toggle');
const themeTooltip = document.getElementById('theme-tooltip');
const body = document.body;

// Trạng thái chế độ: "system", "light", hoặc "dark"
let currentMode = localStorage.getItem('mode') || 'system';
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
        effectiveTheme = getSystemTheme();
        themeTooltip.setAttribute('title', 'Hệ thống');
    } else {
        effectiveTheme = mode;
        themeTooltip.setAttribute('title', mode === 'light' ? 'Sáng' : 'Tối');
    }

    body.setAttribute('data-theme', effectiveTheme);
    themeToggle.checked = effectiveTheme === 'dark';
    themeToggle.setAttribute('value', effectiveTheme);

    localStorage.setItem('mode', mode);
    localStorage.setItem('effectiveTheme', effectiveTheme);
}

// Khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        if (isSystemMode) {
            applyTheme('system');
        }
    });
});

// Hàm chuyển đổi chế độ khi người dùng click
function toggleTheme() {
    if (isSystemMode) {
        const systemTheme = getSystemTheme();
        applyTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else if (currentMode === 'light') {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
}

// Hàm tìm kiếm
function searchContent() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    if (searchTerm) {
        console.log(`Đang tìm kiếm: ${searchTerm}`);
    }
}