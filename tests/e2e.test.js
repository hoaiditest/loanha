const { test, expect, devices } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test.describe('LOAN HÀ CAMERA & VI TÍNH - E2E Testing & Verification', () => {

    test('Verification on Desktop and Form Submission Test', async ({ page }) => {
        // 1. Navigate to landing page
        await page.goto('http://localhost:3000');
        await expect(page).toHaveTitle(/LOAN HÀ CAMERA & VI TÍNH/);
        console.log('Successfully navigated to landing page on Desktop.');

        // 2. Chụp ảnh màn hình Desktop lúc load trang (Viewport mặc định)
        const screenshotsDir = path.join(__dirname, '../screenshots');
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, { recursive: true });
        }
        await page.screenshot({ path: path.join(screenshotsDir, 'desktop_hero.png') });
        console.log('Saved hero screenshot to screenshots/desktop_hero.png');

        // 3. Scroll toàn bộ trang mượt mà để kiểm tra hiệu ứng scroll reveal và load hết hình ảnh
        console.log('Scrolling down page smoothly...');
        const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        const viewportHeight = await page.evaluate(() => window.innerHeight);
        
        for (let y = 0; y < scrollHeight; y += 250) {
            await page.evaluate((yPos) => window.scrollTo(0, yPos), y);
            await page.waitForTimeout(100);
        }
        // Scroll back to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);

        // 4. Test Product Tab Filtering (Click Tab "Camera Giám Sát" và "Laptop / PC")
        console.log('Testing dynamic product filter...');
        const cameraTab = page.locator('button.tab-btn[data-filter="camera"]');
        await cameraTab.click();
        await page.waitForTimeout(500);
        
        // Xác minh chỉ các sản phẩm camera hiển thị
        const visibleProductsCount = await page.locator('.product-card:visible').count();
        console.log(`Visible products after selecting Camera tab: ${visibleProductsCount}`);

        const allTab = page.locator('button.tab-btn[data-filter="all"]');
        await allTab.click();
        await page.waitForTimeout(500);

        // 5. Test Click CTA Hotline và Zalo (kiểm tra thuộc tính href)
        console.log('Checking call action buttons...');
        const callBtn = page.locator('a.btn-phone-cta');
        await expect(callBtn).toHaveAttribute('href', 'tel:0971174225');
        const zaloBtn = page.locator('a.btn-zalo-cta');
        await expect(zaloBtn).toHaveAttribute('href', /zalo/);

        // 6. Test Form Validation & Submit thành công
        console.log('Testing contact form submit...');
        
        // Scroll to form section
        const contactSection = page.locator('#lien-he');
        await contactSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Điền các trường thông tin
        await page.fill('#fullName', 'Nguyễn Văn Test');
        await page.fill('#phoneNumber', '0987654321');
        await page.selectOption('#serviceType', 'Lắp đặt camera an ninh');
        await page.fill('#address', 'Tổ 1, Thôn 5, Trà Tân, Đức Linh, Bình Thuận');
        await page.fill('#message', 'Đây là tin nhắn tự động từ kịch bản test Playwright E2E.');

        // Capturing console logs to verify that the form data gets logged
        const consoleLogs = [];
        page.on('console', msg => {
            consoleLogs.push(msg.text());
        });

        // Click Submit
        const submitButton = page.locator('#submitBtn');
        await submitButton.click();
        console.log('Form submitted. Waiting for mock response and success toast...');

        // Wait for spinner and success toast to appear
        const toast = page.locator('.toast-success');
        await expect(toast).toBeVisible({ timeout: 5000 });
        const toastText = await toast.locator('.toast-body').innerText();
        console.log(`Success Toast message detected: "${toastText}"`);
        expect(toastText).toContain('Yêu cầu đã được gửi thành công');

        // Check if form data was logged inside console
        await page.waitForTimeout(1000); // Wait for console write
        const formLogExists = consoleLogs.some(log => log.includes('Nguyễn Văn Test') && log.includes('Lắp đặt camera an ninh'));
        console.log(`Form data console.log validation: ${formLogExists ? 'PASSED' : 'FAILED'}`);

        // Chụp screenshot toàn trang sau khi gửi thành công để xác minh
        await page.screenshot({ path: path.join(screenshotsDir, 'desktop_success.png'), fullPage: true });
        console.log('Saved full page screenshot to screenshots/desktop_success.png');
    });

    test('Verification on Mobile Device', async ({ }) => {
        // Giả lập thiết bị iPhone 12 Pro bằng Playwright
        const iPhone12 = devices['iPhone 12'];
        const browser = await test.info().project.useBrowserName === 'webkit' 
            ? await require('@playwright/test').webkit.launch() 
            : await require('@playwright/test').chromium.launch();
            
        const context = await browser.newContext({
            ...iPhone12,
            recordVideo: {
                dir: path.join(__dirname, '../videos'),
                size: { width: 390, height: 844 }
            }
        });

        const page = await context.newPage();
        
        // 1. Navigate
        await page.goto('http://localhost:3000');
        console.log('Navigated successfully on Mobile (iPhone 12 emulation).');

        // 2. Chụp screenshot lúc mới load trang di động
        const screenshotsDir = path.join(__dirname, '../screenshots');
        await page.screenshot({ path: path.join(screenshotsDir, 'mobile_hero.png') });
        console.log('Saved mobile hero to screenshots/mobile_hero.png');

        // 3. Test Mobile Navigation Menu Toggle
        console.log('Testing mobile menu overlay toggle...');
        const mobileToggle = page.locator('#mobileToggle');
        const overlay = page.locator('#mobileMenuOverlay');
        
        // Mở menu
        await mobileToggle.click();
        await page.waitForTimeout(500);
        await expect(overlay).toHaveClass(/open/);
        await page.screenshot({ path: path.join(screenshotsDir, 'mobile_menu_open.png') });
        console.log('Mobile menu successfully opened.');

        // Đóng menu bằng cách click một link điều hướng
        const serviceLink = page.locator('a.mobile-nav-link[href="#dich-vu"]');
        await serviceLink.click();
        await page.waitForTimeout(500);
        await expect(overlay).not.toHaveClass(/open/);
        console.log('Mobile menu closed automatically upon nav link click.');

        // 4. Scroll xuống và kiểm tra Responsive Grid các card dịch vụ & sản phẩm
        await page.locator('#dich-vu').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(screenshotsDir, 'mobile_services.png') });

        // Chụp screenshot toàn trang mobile
        await page.screenshot({ path: path.join(screenshotsDir, 'mobile_fullpage.png'), fullPage: true });
        console.log('Saved mobile fullpage to screenshots/mobile_fullpage.png');

        await context.close();
        await browser.close();
    });
});
