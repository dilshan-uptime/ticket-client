# Design Guidelines: Ticket Management System

## Design Approach
**System-Based Approach**: Drawing inspiration from Linear and Notion for clean, productivity-focused interfaces. Emphasis on information density, scanning efficiency, and professional aesthetics suitable for enterprise ticket management.

## Core Design Principles
1. **Clarity First**: Every element serves ticket management workflow
2. **Scan-Optimized**: Users should quickly locate ticket information
3. **Professional Polish**: Enterprise-grade UI with consistent quality
4. **Adaptive Density**: Support multiple viewing preferences (cards/list/grid)

## Typography System

**Font Stack**: Inter (primary), system-ui fallback
- **Headlines/Page Titles**: text-2xl to text-3xl, font-semibold
- **Section Headers**: text-lg, font-medium
- **Ticket Titles**: text-base, font-medium
- **Body/Metadata**: text-sm, font-normal
- **Labels/Captions**: text-xs, font-medium, uppercase tracking-wide

## Layout & Spacing

**Spacing Units**: Tailwind 3, 4, 6, 8, 12, 16 units consistently
- Container: max-w-7xl with px-6
- Section padding: py-8 to py-12
- Component gaps: gap-4 to gap-6
- Card padding: p-4 to p-6

**Grid Systems**:
- List View: Single column, full-width rows
- Card View: grid-cols-1 md:grid-cols-2 xl:grid-cols-3 with gap-6
- Grid View: grid-cols-2 md:grid-cols-3 xl:grid-cols-4 with gap-4

## Color Strategy

**Brand Color (#ee754e)**: Use strategically for:
- Primary action buttons
- Active status indicators
- Selected state backgrounds (10% opacity)
- Interactive element accents

**Neutrals**: Gray-50 to Gray-900 palette
- Backgrounds: white, gray-50, gray-100
- Borders: gray-200, gray-300
- Text: gray-900 (primary), gray-600 (secondary), gray-500 (tertiary)

**Status Colors**:
- In Progress: Blue-500 background, blue-700 text
- Completed: Green-500 background, green-700 text
- Pending: Yellow-500 background, yellow-700 text
- Use pill-shaped badges with px-3 py-1, text-xs

## Component Library

### Authentication
**Login Screen**: Centered card (max-w-md) with logo, heading, Microsoft SSO button (brand color), white background, subtle shadow

### Navigation
**Top Bar**: Fixed header, bg-white with border-b, contains logo (h-8), user avatar (h-10 w-10 rounded-full), shadow-sm

### Ticket Cards
**Structure**:
- White background, rounded-lg, border border-gray-200
- Hover: shadow-md transition, border-gray-300
- Header: Ticket title (font-medium) + Status badge (top-right)
- Body: Description (text-sm, gray-600, line-clamp-2)
- Footer: Date metadata in flex justify-between, text-xs gray-500

### List View Rows
- Table-like structure with proper column alignment
- Alternating row backgrounds (white/gray-50)
- Hover state: bg-gray-100
- Left-aligned title, centered status badge, right-aligned dates

### View Toggle
Icon buttons group: Card icon, List icon, Grid icon
- Active state: bg-brand-color text-white
- Inactive: text-gray-600 hover:bg-gray-100

### Search & Filters
**Search Bar**: 
- Input with icon prefix (magnifying glass)
- Placeholder: "Search tickets..."
- Border-gray-300, focus:ring-2 ring-brand-color

**Filter Dropdowns**:
- Button triggers with chevron icons
- Dropdown menus with checkboxes for multi-select
- Status filter shows color-coded options

### Empty States
Centered content with icon (h-16 w-16 gray-300), heading, description, and action button

## Interactions

**Loading States**: Skeleton screens matching view mode (shimmer animation)
**Transitions**: duration-200 for hovers, duration-300 for view changes
**Animations**: Minimal - only fade-in for content loads, no elaborate effects

## Responsive Behavior

- Mobile: Single column cards, collapsible filters, simplified table columns
- Tablet: 2-column grids, full filter visibility
- Desktop: Full 3-4 column grids, expanded table view

## Images

**Logo Placement**: Top-left of navigation bar, height h-8 to h-10, maintain aspect ratio
**No Hero Image**: This is a dashboard application - users land directly on ticket views post-authentication

This design creates a professional, scalable ticket management interface optimized for daily productivity use.