# Learner.html - Feature Documentation & Testing Guide

This document provides a comprehensive list of all features implemented in `learner.html`. Use this as a reference for testing and validating functionality after updates.

---

## 1. Data Management

### 1.1 Google Sheets Integration
- **Description**: Loads content from two separate Google Sheets tabs
- **Sheets**:
  - Videos tab (gid=1037605170)
  - Notes tab (gid=1066334219)
- **Method**: JSONP-based loading with `loadDataWithJSONP()`
- **Testing**: Verify data loads correctly from both sheets on page load

### 1.2 Data Caching
- **Description**: Caches loaded data to avoid redundant API calls
- **Storage**: In-memory cache object `cachedData` with `videos` and `notes` properties
- **Testing**:
  - Switch between tabs and verify no duplicate loading
  - Check console for cache hit messages

### 1.3 Column Mapping
- **Description**: Dynamically maps sheet columns to post properties
- **Videos Columns**: Video Title, Video URL, Added At, Published At, Summary, Read
- **Notes Columns**: Note (content), Added At, Archived, Star, ID
- **Testing**: Verify all data fields display correctly from sheets

---

## 2. User Interface Components

### 2.1 Fixed Header
- **Description**: Fixed header bar at top with title and settings icon
- **Features**:
  - Shows "Learner" by default
  - Updates to show current post title when scrolling
  - Settings icon (gear) that opens hamburger menu
  - Hides settings icon when showing post title
- **Testing**:
  - Scroll down and verify title changes to current post
  - Click title to scroll back to that post
  - Verify settings icon visibility toggles correctly

### 2.2 Bottom Tab Navigation
- **Description**: Fixed bottom navigation with Videos and Notes tabs
- **Features**:
  - Auto-hides when scrolling down
  - Shows when scrolling up or near top
  - Tap active tab to scroll to top
  - Active tab visual indicator (border and highlight)
- **Testing**:
  - Scroll to verify hide/show behavior
  - Switch between tabs
  - Tap active tab to scroll to top
  - Verify tab state persists

### 2.3 Hamburger Menu Sidebar
- **Description**: Side panel with settings and controls
- **Menu Items**:
  - Dark Mode toggle
  - Font Size controls (80%-150%)
  - Playback Speed controls (1.0x, 1.25x, 1.5x, 2.0x)
  - Sync button
  - TTS API Key configuration
- **Testing**:
  - Open/close menu with button and overlay
  - Test each setting persists across page reloads
  - Verify all controls work correctly

### 2.4 Search Bar
- **Description**: Real-time search filtering for posts
- **Features**:
  - Searches both title and content
  - Case-insensitive matching
  - Works independently for each tab
  - Clear search when switching tabs
- **Testing**:
  - Enter search terms and verify filtering
  - Test with various search terms
  - Switch tabs and verify search resets

### 2.5 Collapse All Button
- **Description**: Toggle button to collapse/expand all posts
- **Features**:
  - Icon changes based on state (up/down arrow)
  - Works on current tab only
  - Tooltip shows "Collapse All" or "Expand All"
- **Testing**:
  - Click to collapse all posts
  - Click again to expand all posts
  - Verify icon and tooltip update correctly

---

## 3. Post Display & Content

### 3.1 Post Cards
- **Description**: Individual blog post containers
- **Components**:
  - Sticky header with title, date, listen button
  - Collapsible content area
  - YouTube embed (if video URL exists)
  - Bottom action button (Mark as read/Archive)
- **States**:
  - Normal (expanded)
  - Collapsed
  - Read/Archived (dimmed opacity)
- **Testing**:
  - Verify all post components render correctly
  - Test expand/collapse by clicking header
  - Verify read/archived posts start collapsed

### 3.2 Markdown Rendering
- **Description**: Converts markdown to HTML using marked.js
- **Supported Elements**:
  - Headings (H1-H6) with custom styling
  - Lists (ordered and unordered) with custom bullets
  - Tables with borders and styling
  - Code blocks and inline code
  - Blockquotes
  - Links
  - Horizontal rules
- **Testing**:
  - Create posts with various markdown elements
  - Verify proper rendering and styling
  - Test both light and dark mode appearance

### 3.3 YouTube Video Embeds
- **Description**: Embeds YouTube videos with 16:9 aspect ratio
- **Features**:
  - Extracts video ID from multiple URL formats
  - Responsive iframe embed
  - Lazy loading for performance
  - Fallback to thumbnail + link if embed fails
  - Error handling for blocked embeds
- **Testing**:
  - Test different YouTube URL formats
  - Verify responsive sizing
  - Test fallback functionality
  - Verify lazy loading

### 3.4 Date Formatting
- **Description**: Formats Google Sheets dates to YYYY/MM/DD
- **Displays**:
  - Added At date
  - Published At date (for videos)
  - Reading time estimate
- **Testing**:
  - Verify date parsing from Google Sheets format
  - Check date display accuracy
  - Test with various date formats

### 3.5 Reading Time Estimation
- **Description**: Calculates estimated reading time
- **Algorithm**:
  - English: 250 words per minute
  - Chinese: 400 characters per minute
  - Combined calculation for mixed content
  - Minimum 1 minute display
- **Testing**:
  - Test with English-only content
  - Test with Chinese-only content
  - Test with mixed content
  - Verify minimum 1 minute

---

## 4. Text-to-Speech (TTS)

### 4.1 Google Cloud TTS Integration
- **Description**: Converts post content to speech using Google Cloud API
- **API Configuration**:
  - Endpoint: `https://texttospeech.googleapis.com/v1/text:synthesize`
  - Audio format: MP3
  - Max chunk size: 4000 bytes
- **Testing**:
  - Configure API key
  - Verify API calls succeed
  - Test with and without API key

### 4.2 Language Detection & Voice Selection
- **Description**: Automatically detects language and selects appropriate voice
- **Voices**:
  - Chinese: zh-CN, Female
  - English: en-US, Female
- **Detection**: Uses regex to check for Chinese characters
- **Testing**:
  - Test with Chinese content
  - Test with English content
  - Test with mixed content
  - Verify correct voice is selected

### 4.3 Audio Chunking for Long Content
- **Description**: Splits long text into chunks to stay within API limits
- **Features**:
  - Splits at sentence boundaries
  - Falls back to word boundaries if needed
  - Respects 4000 byte limit per chunk
  - Background processing of remaining chunks
- **Testing**:
  - Test with short content (single chunk)
  - Test with long content (multiple chunks)
  - Verify smooth transitions between chunks

### 4.4 Streaming Audio Playback
- **Description**: Plays first chunk immediately while processing remaining chunks
- **Features**:
  - AudioQueueManager class handles streaming
  - Seamless progression between chunks
  - Pause/resume works across chunks
  - Waits for chunks if not ready yet
- **Testing**:
  - Test playback of multi-chunk content
  - Verify immediate playback of first chunk
  - Test pause/resume during streaming
  - Test stop and restart

### 4.5 Playback Controls
- **Description**: Listen button with multiple states
- **States**:
  - Default (play icon)
  - Loading (spinning circle)
  - Playing (pause icon)
  - Paused (play icon)
- **Features**:
  - Click to play/pause
  - Stops other playing audio
  - Respects playback speed setting
  - Excludes tables from speech
- **Testing**:
  - Test play/pause/resume
  - Test stopping one audio starts another
  - Verify playback speed applies
  - Verify tables are not read

### 4.6 API Key Management
- **Description**: Modal for configuring Google Cloud TTS API key
- **Features**:
  - Password input field
  - Save to localStorage
  - Visual status indicator (checkmark)
  - Instructions with link to Google Cloud Console
- **Testing**:
  - Open modal from hamburger menu
  - Save API key and verify persistence
  - Test status indicator updates
  - Test TTS works after key is saved

---

## 5. State Management & Persistence

### 5.1 Mark as Read/Unread (Videos)
- **Description**: Toggle read status for video posts
- **Features**:
  - Dimmed appearance when read
  - Auto-collapse when marked as read
  - Auto-expand when marked as unread
  - Scrolls to next post after marking as read
  - Syncs with webhook
- **Testing**:
  - Mark post as read and verify collapse
  - Mark as unread and verify expand
  - Verify scroll to next post
  - Check webhook is called

### 5.2 Archive/Unarchive (Notes)
- **Description**: Toggle archive status for note posts
- **Features**:
  - Uses same visual state as "read"
  - Auto-collapse when archived
  - Auto-expand when unarchived
  - Scrolls to next post after archiving
  - Syncs with webhook using note ID
  - Clears cache after update
- **Testing**:
  - Archive note and verify collapse
  - Unarchive and verify expand
  - Verify scroll to next post
  - Check webhook is called with ID

### 5.3 Webhook Integration
- **Description**: Calls external webhooks to persist state changes
- **Webhooks**:
  - Read status: `https://n8n.synergychen.com/webhook/c8115c00-5be7-45c3-88a6-04be9db381f4`
  - Archive status: `https://n8n.synergychen.com/webhook/19e8e145-f9fb-4b1c-aae9-13d0b91c83a6`
- **Testing**:
  - Monitor network tab for webhook calls
  - Verify correct parameters are sent
  - Test error handling for failed calls

### 5.4 Offline Queue Management
- **Description**: Queues actions when offline and syncs when back online
- **Features**:
  - Detects online/offline status
  - Queues read/archive actions to localStorage
  - Processes queue when back online
  - Removes duplicates (keeps latest)
  - Shows sync notifications
  - Handles 5xx errors differently (doesn't queue)
- **Testing**:
  - Go offline and mark posts as read
  - Verify actions are queued
  - Come back online and verify sync
  - Test with server errors (5xx)

### 5.5 LocalStorage Persistence
- **Description**: Saves user preferences to localStorage
- **Stored Values**:
  - `learner_theme`: 'light' or 'dark'
  - `learner_font_scale`: 0.8 to 1.5
  - `learner_playback_speed_index`: 0-3
  - `googleCloudTTSApiKey`: API key string
  - `learner_offline_queue`: Array of pending actions
- **Testing**:
  - Change each setting and reload page
  - Verify all preferences persist
  - Check localStorage in dev tools

---

## 6. Text Highlighting

### 6.1 Text Selection & Highlighting
- **Description**: Allows users to highlight selected text
- **Features**:
  - Select text to show "Highlight" tooltip
  - Click tooltip to apply yellow highlight
  - Click highlight to remove it
  - Works with complex selections (across blocks, in lists)
  - Special handling for list items
- **Testing**:
  - Select and highlight text in paragraphs
  - Select across multiple paragraphs
  - Select text in lists
  - Remove highlights by clicking them
  - Test edge cases (empty selection, single character)

### 6.2 Highlight Tooltip
- **Description**: Tooltip that appears above selected text
- **Features**:
  - Positioned centered above selection
  - Clickable to apply highlight
  - Disappears when clicking elsewhere
  - Hover effect (changes to blue)
- **Testing**:
  - Verify tooltip positioning
  - Test on selections near edges of screen
  - Verify hover effect
  - Test dismiss behavior

---

## 7. Theme & Styling

### 7.1 Dark Mode
- **Description**: Toggle between light and dark themes
- **Features**:
  - Default to dark mode
  - Persists to localStorage
  - Updates all UI elements
  - Smooth transition
  - Different colors for links, headings, backgrounds
- **Testing**:
  - Toggle theme and verify all elements update
  - Reload page and verify theme persists
  - Test all UI components in both themes
  - Verify readability in both modes

### 7.2 Font Size Scaling
- **Description**: Adjust font size from 80% to 150%
- **Features**:
  - Uses CSS custom property `--font-scale`
  - All text sizes scale proportionally
  - Displays percentage in menu
  - Persists to localStorage
- **Testing**:
  - Increase/decrease font size
  - Verify all text scales
  - Test minimum (80%) and maximum (150%)
  - Reload and verify persistence

### 7.3 Responsive Design
- **Description**: Mobile-friendly responsive layout
- **Features**:
  - Mobile breakpoint at 768px
  - Reduced padding on mobile
  - Adjusted font sizes
  - Bottom tabs for mobile navigation
  - Touch-friendly tap targets
- **Testing**:
  - Test on various screen sizes
  - Verify layout adjusts correctly
  - Test touch interactions on mobile
  - Verify tab navigation on mobile

---

## 8. User Experience Features

### 8.1 Auto-Scroll to Next Post
- **Description**: Scrolls to next post after marking as read/archived
- **Features**:
  - 300ms delay for animation
  - Smooth scroll behavior
  - 20px offset padding
  - Only when marking as read (not unread)
- **Testing**:
  - Mark post as read and verify scroll
  - Test with last post in list
  - Verify smooth animation

### 8.2 Sync Notifications
- **Description**: Toast notifications for sync events
- **Types**:
  - "Synced" - successful sync
  - "Back online! Syncing..." - coming back online
  - "Failed" - sync failed
  - Orange notification for offline queuing
- **Features**:
  - Fixed position top-right
  - Auto-dismiss after 1-3 seconds
  - Fade in/out animation
- **Testing**:
  - Trigger various sync events
  - Verify correct message displays
  - Verify auto-dismiss timing

### 8.3 Sticky Post Headers
- **Description**: Post headers stay visible when scrolling
- **Features**:
  - Header sticks to top when scrolling within post
  - Z-index ensures proper layering
  - Works with collapsed/expanded states
- **Testing**:
  - Scroll through long posts
  - Verify header remains visible
  - Test with multiple posts

### 8.4 Smooth Scrolling
- **Description**: Animated scrolling for better UX
- **Features**:
  - Scroll to top when clicking active tab
  - Scroll to post when clicking header title
  - Auto-scroll to next post
  - All use `behavior: 'smooth'`
- **Testing**:
  - Test all scroll triggers
  - Verify smooth animation
  - Test on different browsers

### 8.5 Tab Content Switching
- **Description**: Seamless switching between Videos and Notes tabs
- **Features**:
  - Shows/hides appropriate container
  - Loads data on first access
  - Maintains scroll position
  - Resets search when switching
  - Updates header title
- **Testing**:
  - Switch between tabs
  - Verify content loads correctly
  - Test search reset behavior
  - Verify first-load and cached behavior

---

## 9. Error Handling & Edge Cases

### 9.1 Data Loading Errors
- **Description**: Handles failures when loading from Google Sheets
- **Features**:
  - Shows error message
  - Displays error details
  - Hides loading indicator
  - Allows retry via sync button
- **Testing**:
  - Test with invalid sheet URL
  - Test with network errors
  - Verify error message displays

### 9.2 TTS API Errors
- **Description**: Handles Google Cloud TTS API failures
- **Features**:
  - Alert for missing API key
  - Alert for API failures
  - Resets button state on error
  - Logs error details to console
- **Testing**:
  - Test without API key
  - Test with invalid API key
  - Test with network errors
  - Verify error alerts display

### 9.3 YouTube Embed Failures
- **Description**: Fallback when YouTube embed is blocked
- **Features**:
  - Detects iframe load failures
  - Shows thumbnail with play icon
  - Provides "Watch on YouTube" link
  - Fallback thumbnail quality
- **Testing**:
  - Test embed in different contexts
  - Verify fallback displays correctly
  - Test fallback link works

### 9.4 Empty States
- **Description**: Handles cases with no content
- **Features**:
  - "No posts with summaries found" message
  - Centered and styled message
  - Only shows when truly empty
- **Testing**:
  - Load with empty sheet
  - Filter all posts with search
  - Verify message displays

---

## 10. Performance Optimizations

### 10.1 Lazy Loading
- **Description**: Defers loading of non-critical resources
- **Features**:
  - YouTube iframes use `loading="lazy"`
  - Images in fallback use lazy loading
  - Reduces initial page load time
- **Testing**:
  - Monitor network tab on page load
  - Scroll to verify lazy resources load
  - Check page load performance

### 10.2 Data Caching
- **Description**: Caches loaded data to avoid redundant requests
- **Features**:
  - In-memory cache for each tab
  - Only loads once per session
  - Cleared on manual sync
  - Cleared for notes after archive action
- **Testing**:
  - Switch tabs multiple times
  - Monitor network for duplicate requests
  - Verify cache is used

### 10.3 Debouncing & Throttling
- **Description**: Optimizes high-frequency events
- **Features**:
  - Scroll event uses passive listener
  - Bottom tabs hide/show debounced (1000ms)
  - Search has no delay (immediate)
- **Testing**:
  - Rapid scrolling
  - Fast typing in search
  - Monitor performance

---

## Testing Scenarios (Product Validation)

Use these user stories and acceptance criteria to validate `learner.html` from a product perspective.

### 1. First Launch Experience
- **User story**: As a learner opening the app, I immediately understand where I am and what content is available.
- **Acceptance criteria**:
  - App loads within a reasonable time without visible errors.
  - The Videos tab is populated with the latest content on first view.
  - The brand header reads "Learner" and the dark theme presents a cohesive first impression.
  - Bottom navigation tabs are visible so users know there are multiple content types.

### 2. Switching Between Content Types
- **User story**: As a user moving between Videos and Notes, I never lose my place or feel disoriented.
- **Acceptance criteria**:
  - Tapping the Notes tab immediately reveals the notes list, preserving the previous Videos state.
  - Returning to Videos restores the earlier scroll position.
  - Re-selecting the active tab scrolls back to the top, reinforcing navigation control.
  - The header always reflects the post currently under the sticky header while scrolling.

### 3. Managing Posts and Notes
- **User story**: As a learner organizing my queue, I can quickly read through posts and archive notes without manual scrolling.
- **Acceptance criteria**:
  - Tapping a post header expands or collapses it without affecting other posts.
  - Marking a video as read collapses it, dims the card, and automatically guides the user to the next unread item.
  - Marking a video as unread re-opens the card so the learner can continue reviewing.
  - Archiving or unarchiving a note updates its state, collapses/expands appropriately, and moves focus to the next note.

### 4. Finding Specific Information
- **User story**: As someone searching for a topic, I can instantly filter posts without reloading the page.
- **Acceptance criteria**:
  - Typing in the search field filters the visible posts in the active tab in real time (title + content).
  - Clearing the field restores the full list.
  - Switching tabs automatically resets the search so each tab starts with its complete dataset.

### 5. Listening to Content
- **User story**: As a user who prefers audio, I can listen to any summary hands-free with clear controls.
- **Acceptance criteria**:
  - If no API key is stored, the interface prompts the user to configure it before playback.
  - Playing short content begins within seconds and the button reflects the playing state.
  - Long content begins streaming immediately while remaining audio keeps loading in the background.
  - Pause/resume works predictably, and starting audio on a new post stops any other playback.
  - Playback speed respects the setting chosen in the hamburger menu.

### 6. Personalization & Persistence
- **User story**: As someone tuning the interface, my preferences stick between sessions.
- **Acceptance criteria**:
  - Switching between dark and light modes immediately updates the UI and persists after refresh.
  - Adjusting font size scales the entire interface proportionally and the chosen scale remains on reload.
  - Changing playback speed updates both current and future audio sessions until the user chooses a different speed.
  - Manual sync gives users confidence by refreshing the sheet data and clearing caches.

### 7. Highlighting Key Takeaways
- **User story**: As a learner capturing insights, I can highlight text snippets and remove them when done.
- **Acceptance criteria**:
  - Selecting a meaningful chunk of text surfaces the "Highlight" action near the selection.
  - Confirming the action wraps the selection in the highlight style without breaking the layout (including lists).
  - Tapping an existing highlight removes it and merges the text back into the paragraph.

### 8. Staying Productive Offline
- **User story**: As someone reviewing content without reliable internet, my actions are saved and synced later.
- **Acceptance criteria**:
  - When offline, marking items as read or archived shows a non-intrusive notice that the action will sync later.
  - Coming back online automatically triggers a sync and confirms success (or warns about failures).
  - Previously queued actions are cleared once the server acknowledges them.

### 9. Video Consumption
- **User story**: As a viewer, embedded videos work wherever possible and always offer a fallback.
- **Acceptance criteria**:
  - Standard embedded videos play inline with responsive sizing and controls.
  - If an embed fails (e.g., blocked), a thumbnail with a "Watch on YouTube" link appears so the user can continue externally.
  - The experience is consistent across desktop and mobile layouts.

### 10. Responsive Experience
- **User story**: As a user switching devices, the experience feels native on mobile, tablet, and desktop.
- **Acceptance criteria**:
  - Mobile view prioritizes vertical reading with comfortable padding and reachable controls.
  - Tablet view retains dual-purpose gestures (scroll + tap) without accidental actions.
  - Desktop view makes use of available width without stretching content beyond readable limits.
  - All key flows above remain achievable on each form factor.

### 11. Resilience & Error Handling
- **User story**: As a user, I’m never left wondering what went wrong.
- **Acceptance criteria**:
  - If the Google Sheet cannot load, the interface clearly states the issue and suggests a retry via the sync action.
  - Missing or invalid TTS credentials produce actionable guidance instead of silent failures.
  - Empty states explain why no content is visible and what to do next (e.g., add notes or adjust filters).

---

## Known Limitations

1. **API Rate Limits**: Google Cloud TTS has rate limits that may affect rapid playback requests
2. **Browser Compatibility**: Text-to-speech requires modern browser with Audio API support
3. **YouTube Embeds**: May be blocked in some contexts or by content blockers
4. **Offline Mode**: Only queues read/archive actions, not new content loading
5. **Cache Clearing**: Manual sync is required to see new Google Sheets data

---

## Future Enhancement Ideas

- [ ] Star/favorite functionality for posts
- [ ] Export highlights to markdown
- [ ] Customizable color themes
- [ ] Reading progress tracking
- [ ] Search history
- [ ] Keyboard shortcuts
- [ ] PDF export
- [ ] Print-friendly view
- [ ] Multiple highlight colors
- [ ] Notes/annotations system

---

**Last Updated**: 2024-11-30
**Version**: 1.0
**Author**: Learner App
