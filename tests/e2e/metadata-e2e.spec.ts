import { test, expect } from '@playwright/test';

test.describe('Metadata Server App', () => {
  test('should load the app and display metadata list', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();

    const metadataLinks = page.locator('a[href*="metadata"]');
    const count = await metadataLinks.count();
    expect(count).toBeGreaterThan(0);

    await page.screenshot({ path: 'test-results/metadata-page.png' });
  });

  test('should display metadata properties when clicking on first medata id', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const firstMetadataLink = page.locator('a').first();
    const href = await firstMetadataLink.getAttribute('href');
    let metadataId = '';
    
    if (href) {
      const idMatch = href.match(/metadata\/([^\/]+)/);
      if (idMatch && idMatch[1]) {
        metadataId = idMatch[1];
      }
    }

    await firstMetadataLink.click();
    await page.waitForLoadState('networkidle');
    
    const currentUrl = page.url();
    if (metadataId) {
      expect(currentUrl).toContain(metadataId);
    }
    const expectedProperties = [
      { name: 'subject', value: metadataId },
      { name: 'url'},
      { name: 'name'},
      { name: 'ticker'},
      { name: 'decimals'},
      { name: 'policy'},
      { name: 'logo'},
      { name: 'description'}
    ];
    
    for (const property of expectedProperties) {
      const propertyLabel = page.locator(`text=${property.name}`);
      expect(await propertyLabel.isVisible()).toBeTruthy();
      
      if (property.value) {
        const propertyValue = page.locator(`text=${property.name}`).locator('..').locator(`text=${property.value}`);
        const isValueVisible = await propertyValue.isVisible();
        expect(isValueVisible).toBeTruthy();
      }
    }
    
    await page.screenshot({ path: 'test-results/metadata-detail.png' });
  });
}); 