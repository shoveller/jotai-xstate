import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("원이 표시된다", async ({ page }) => {
  const circle = page.locator("circle").first();
  // Expect a title "to contain" a substring.
  await expect(circle).toBeVisible();
});

test('클릭하면 색이 차례차례 바뀐다', async ({ page }) => {
  const circle = page.locator("circle").first();
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

test('첫번째 원을 클릭해도 다른 원의 색이 바뀌지 않는다', async ({ page }) => {
  const circle1 = page.locator("circle").first();
  const circle2 = page.locator("circle").nth(1)
  await expect(circle1).toHaveAttribute("fill", "green");
  await expect(circle2).toHaveAttribute("fill", "green");
  await circle1.click();
  await expect(circle1).toHaveAttribute("fill", "blue");
  await expect(circle2).toHaveAttribute("fill", "green");
  await circle1.click();
  await expect(circle1).toHaveAttribute("fill", "yellow");
  await expect(circle2).toHaveAttribute("fill", "green");
  await circle1.click();
  await expect(circle1).toHaveAttribute("fill", "green");
  await expect(circle2).toHaveAttribute("fill", "green");
  await circle1.click();
  await expect(circle1).toHaveAttribute("fill", "blue");
  await expect(circle2).toHaveAttribute("fill", "green");
  await circle1.click();
  await expect(circle1).toHaveAttribute("fill", "yellow");
  await expect(circle2).toHaveAttribute("fill", "green");
})
