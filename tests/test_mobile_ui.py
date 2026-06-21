from playwright.sync_api import sync_playwright
import time

def test_mobile_ui():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        
        # Create a mobile context (e.g., iPhone 13 Mini size)
        context = browser.new_context(
            viewport={'width': 375, 'height': 812},
            is_mobile=True,
            has_touch=True
        )
        page = context.new_page()
        
        print("Navigating to local server...")
        try:
            page.goto('http://localhost:3002', timeout=30000)
            
            # Wait for the app to load tools
            page.wait_for_load_state('networkidle')
            time.sleep(2) # Extra time for tools to render
            
            # Take a screenshot to verify layout visually
            screenshot_path = 'c:/Users/guyak/.gemini/antigravity/brain/0a90ae3d-145c-420b-a867-944b936eb92f/mobile_view.png'
            page.screenshot(path=screenshot_path, full_page=False)
            print(f"Captured mobile viewport screenshot: {screenshot_path}")
            
            # Find all ToolCards
            articles = page.locator('article')
            count = articles.count()
            print(f"Found {count} ToolCards on the page.")
            
            if count > 0:
                # Pick the first article to check styles
                first_article = articles.nth(0)
                box = first_article.bounding_box()
                print(f"First card dimensions: width={box['width']}, height={box['height']}")
                
                if box['height'] < 200:
                    print("SUCCESS: Card height is compact (< 200px), indicating the list view is active.")
                else:
                    print("WARNING: Card height seems tall. Is the mobile layout applied correctly?")
                    
                # Check the heart button size
                # The heart button has group/fav class
                heart_button = first_article.locator('button.group\\/fav').first
                if heart_button:
                    btn_box = heart_button.bounding_box()
                    print(f"Heart button dimensions: width={btn_box['width']}, height={btn_box['height']}")
                    if btn_box['width'] >= 44 and btn_box['height'] >= 44:
                        print("SUCCESS: Touch target size is >= 44x44px.")
                    else:
                        print("WARNING: Touch target size is too small!")
        except Exception as e:
            print(f"Error during test: {e}")
        finally:
            browser.close()

if __name__ == '__main__':
    test_mobile_ui()
