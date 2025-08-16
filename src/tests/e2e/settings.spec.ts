import { test, expect } from '@playwright/test'

test.describe('Settings Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.goto('/')
    
    // Mock successful login
    await page.route('**/api/auth/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: 'test-user-123',
            name: 'Test User',
            email: 'test@example.com'
          },
          accessToken: 'mock-jwt-token'
        })
      })
    })
    
    // Mock settings API
    await page.route('**/api/user/settings/**', (route) => {
      const url = route.request().url()
      const method = route.request().method()
      
      if (method === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        })
      } else if (method === 'POST' || method === 'PUT') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'setting-123',
            userId: 'test-user-123',
            category: 'profile',
            settingKey: 'test',
            settingValue: {},
            dataType: 'json'
          })
        })
      } else {
        route.fulfill({ status: 200 })
      }
    })
    
    // Navigate to dashboard
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
  })

  test('opens settings modal from navigation', async ({ page }) => {
    // Click on Settings in navigation
    await page.click('text=Settings')
    
    // Verify settings modal opens
    await expect(page.locator('text=Settings')).toBeVisible()
    await expect(page.locator('text=Manage your account settings and preferences')).toBeVisible()
  })

  test('displays all settings tabs', async ({ page }) => {
    await page.click('text=Settings')
    
    // Verify all tabs are present
    await expect(page.locator('text=Account')).toBeVisible()
    await expect(page.locator('text=Preferences')).toBeVisible()
    await expect(page.locator('text=Notifications')).toBeVisible()
    await expect(page.locator('text=Privacy & Data')).toBeVisible()
    await expect(page.locator('text=Advanced')).toBeVisible()
  })

  test('switches between settings tabs', async ({ page }) => {
    await page.click('text=Settings')
    
    // Start on Account tab (default)
    await expect(page.locator('text=Personal Information')).toBeVisible()
    
    // Switch to Preferences tab
    await page.click('text=Preferences')
    await expect(page.locator('text=Trip Planning Preferences')).toBeVisible()
    
    // Switch to Notifications tab
    await page.click('text=Notifications')
    await expect(page.locator('text=Trip Planning Notifications')).toBeVisible()
    
    // Switch to Privacy & Data tab
    await page.click('text=Privacy & Data')
    await expect(page.locator('text=Profile Visibility')).toBeVisible()
    
    // Switch to Advanced tab
    await page.click('text=Advanced')
    await expect(page.locator('text=API Access')).toBeVisible()
  })

  test('updates profile information', async ({ page }) => {
    await page.click('text=Settings')
    
    // Should be on Account tab by default
    const nameInput = page.locator('input[placeholder="Enter your full name"]')
    await nameInput.fill('John Doe')
    
    // Verify auto-save functionality (wait for API call)
    await page.waitForResponse((response) => 
      response.url().includes('/api/user/settings') && response.request().method() === 'POST'
    )
  })

  test('adds emergency contact', async ({ page }) => {
    // Mock emergency contacts API
    await page.route('**/api/user/emergency-contacts/**', (route) => {
      const method = route.request().method()
      
      if (method === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        })
      } else if (method === 'POST') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'contact-123',
            name: 'Emergency Contact',
            relationship: 'Friend',
            phone: '+1234567890',
            email: 'contact@example.com'
          })
        })
      }
    })
    
    await page.click('text=Settings')
    
    // Fill out emergency contact form
    await page.fill('input[placeholder="Full name"]', 'Emergency Contact')
    await page.fill('input[placeholder="Relationship (e.g., Mother, Friend)"]', 'Friend')
    await page.fill('input[placeholder="Phone number"]', '+1234567890')
    await page.fill('input[placeholder="Email address"]', 'contact@example.com')
    
    // Add contact
    await page.click('text=Add Contact')
    
    // Verify API call was made
    await page.waitForResponse((response) => 
      response.url().includes('/api/user/emergency-contacts') && response.request().method() === 'POST'
    )
  })

  test('toggles notification preferences', async ({ page }) => {
    await page.click('text=Settings')
    await page.click('text=Notifications')
    
    // Find and toggle a notification preference
    const toggle = page.locator('input[type="checkbox"]').first()
    await toggle.click()
    
    // Verify auto-save functionality
    await page.waitForResponse((response) => 
      response.url().includes('/api/user/settings') && response.request().method() === 'POST'
    )
  })

  test('updates travel preferences', async ({ page }) => {
    await page.click('text=Settings')
    await page.click('text=Preferences')
    
    // Select a travel preference
    await page.click('text=Weekend (2-3 days)')
    
    // Verify auto-save functionality
    await page.waitForResponse((response) => 
      response.url().includes('/api/user/settings') && response.request().method() === 'POST'
    )
  })

  test('manages privacy settings', async ({ page }) => {
    await page.click('text=Settings')
    await page.click('text=Privacy & Data')
    
    // Toggle a privacy setting
    const privacyToggle = page.locator('input[type="checkbox"]').first()
    await privacyToggle.click()
    
    // Verify auto-save functionality
    await page.waitForResponse((response) => 
      response.url().includes('/api/user/settings') && response.request().method() === 'POST'
    )
  })

  test('closes settings modal', async ({ page }) => {
    await page.click('text=Settings')
    
    // Verify modal is open
    await expect(page.locator('text=Settings')).toBeVisible()
    
    // Close modal by clicking outside or close button
    await page.keyboard.press('Escape')
    
    // Verify modal is closed
    await expect(page.locator('text=Manage your account settings and preferences')).not.toBeVisible()
  })

  test('handles API errors gracefully', async ({ page }) => {
    // Mock API error
    await page.route('**/api/user/settings/**', (route) => {
      if (route.request().method() === 'POST') {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal Server Error' })
        })
      } else {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        })
      }
    })
    
    await page.click('text=Settings')
    
    // Try to update a setting
    const nameInput = page.locator('input[placeholder="Enter your full name"]')
    await nameInput.fill('Test Error')
    
    // Verify error message appears
    await expect(page.locator('text=Failed to save changes. Please try again.')).toBeVisible()
  })

  test('displays loading states appropriately', async ({ page }) => {
    // Mock delayed API response
    await page.route('**/api/user/settings/**', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      })
    })
    
    await page.click('text=Settings')
    
    // Verify loading state is shown
    await expect(page.locator('text=Loading')).toBeVisible()
    
    // Wait for loading to complete
    await page.waitForLoadState('networkidle')
    await expect(page.locator('text=Loading')).not.toBeVisible()
  })

  test('maintains form state when switching tabs', async ({ page }) => {
    await page.click('text=Settings')
    
    // Fill out form on Account tab
    const nameInput = page.locator('input[placeholder="Enter your full name"]')
    await nameInput.fill('Test User')
    
    // Switch to different tab
    await page.click('text=Preferences')
    
    // Switch back to Account tab
    await page.click('text=Account')
    
    // Verify form state is maintained
    await expect(nameInput).toHaveValue('Test User')
  })

  test('validates required fields', async ({ page }) => {
    await page.click('text=Settings')
    
    // Try to add emergency contact without required fields
    await page.click('text=Add Contact')
    
    // Should show validation messages or prevent submission
    // This depends on implementation - adjust based on actual validation
    await expect(page.locator('input[placeholder="Full name"]')).toBeFocused()
  })

  test('supports keyboard navigation', async ({ page }) => {
    await page.click('text=Settings')
    
    // Use Tab to navigate through form fields
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Verify focus moves appropriately
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBe('INPUT')
  })

  test('responsive design on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.click('text=Settings')
    
    // Verify settings modal adapts to mobile layout
    await expect(page.locator('text=Settings')).toBeVisible()
    
    // Check that tabs are still accessible
    await expect(page.locator('text=Account')).toBeVisible()
    await expect(page.locator('text=Preferences')).toBeVisible()
  })
})