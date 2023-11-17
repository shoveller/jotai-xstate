import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("원이 표시된다", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page.locator("circle")).toBeVisible();
});

test('클릭하면 색이 바뀐다', async ({ page }) => {
  await page.locator("circle").click();
  await expect(page.locator("circle")).toHaveAttribute("fill", "red");
})
