import { expect } from '@playwright/test';

import { loadFixture } from '../../playwright/paths';
import { test } from '../../playwright/test';

test.describe('Request param editor', () => {
  test.beforeEach(async ({ app, page }) => {
    const text = await loadFixture('simple.yaml');
    await app.evaluate(async ({ clipboard }, text) => clipboard.writeText(text), text);
    await page.getByLabel('Import').click();
    await page.locator('[data-test-id="import-from-clipboard"]').click();
    await page.getByRole('button', { name: 'Scan' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Import' }).click();
    await page.getByLabel('simple').click();
  });

  test('Should add params by clicking Add button', async ({ page }) => {
    await page.getByText('example http').click();
    await page.getByRole('tab', { name: 'Headers' }).click();

    const kvTable = page.getByRole('listbox');
    const headerRow = kvTable.getByRole('option');
    await expect.soft(headerRow).toHaveCount(3);

    await page.getByRole('button', { name: 'Add', exact: true }).click();
    const newHeaderRow = kvTable.getByRole('option');
    await expect.soft(newHeaderRow).toHaveCount(4);
  });

  test('Should delete params by double clicking Delete button', async ({ page }) => {
    await page.getByText('example http').click();
    await page.getByRole('tab', { name: 'Headers' }).click();

    const kvTable = page.getByRole('listbox');
    // Add a row first.
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    const headerRow = kvTable.getByRole('option');
    await expect.soft(headerRow).toHaveCount(4);
    // Double click to delete.
    await page.getByRole('button', { name: 'Delete all', exact: true }).dblclick();
    const newHeaderRow = kvTable.getByRole('option');
    await expect.soft(newHeaderRow).toHaveCount(3);
  });

  test('Should not delete params by single clicking Delete button', async ({ page }) => {
    await page.getByText('example http').click();
    await page.getByRole('tab', { name: 'Headers' }).click();

    const kvTable = page.getByRole('listbox');
    // Add a row first.
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    const headerRow = kvTable.getByRole('option');
    await expect.soft(headerRow).toHaveCount(4);
    // single click will not delete the row.
    await page.getByRole('button', { name: 'Delete all', exact: true }).click();
    const newHeaderRow = kvTable.getByRole('option');
    await expect.soft(newHeaderRow).toHaveCount(4);
  });

  test('Should show description by clicking Description button', async ({ page }) => {
    await page.getByText('example http').click();
    await page.getByRole('tab', { name: 'Headers' }).click();

    const kvTable = page.getByRole('listbox');
    // Click the Description button.
    await page.getByRole('button', { name: 'Description' }).click();
    const firstRow = kvTable.getByRole('option').first().locator('.CodeMirror');
    const placeholder = firstRow.locator('.CodeMirror-placeholder');
    await expect.soft(placeholder).toHaveText('description');
  });
});
