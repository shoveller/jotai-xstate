import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("원이 표시된다", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page.locator("circle")).toBeVisible();
});

test('클릭하면 색이 차례차례 바뀐다', async ({ page }) => {
  const circle = page.locator("circle");
  await expect(circle).toHaveAttribute("fill", "green");
  await circle.click();
  await expect(circle).toHaveAttribute("fill", "blue");
  await circle.click();
  await expect(circle).toHaveAttribute("fill", "yellow");
  await circle.click();
  await expect(circle).toHaveAttribute("fill", "green");
  await circle.click();
  await expect(circle).toHaveAttribute("fill", "blue");
  await circle.click();
  await expect(circle).toHaveAttribute("fill", "yellow");
})
