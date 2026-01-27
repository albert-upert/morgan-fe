# SIAKUP Color System

This document outlines the complete color system for the SIAKUP application based on the design system.

## Color Palettes

### 🔴 Red (CMYK) - Primary Color

**Usage**: Primary CTAs, buttons, links, active states, borders, action entry points

| Shade     | Hex       | Usage                         |
| --------- | --------- | ----------------------------- |
| `red-900` | `#5C0A0D` | Darkest                       |
| `red-800` | `#810E12` |                               |
| `red-700` | `#A51217` | **Button pressed state**      |
| `red-600` | `#CA161C` |                               |
| `red-500` | `#E62129` | **Primary CTA, main buttons** |
| `red-400` | `#EB474D` |                               |
| `red-300` | `#EF6C70` | **Button hover state**        |
| `red-200` | `#F39194` |                               |
| `red-100` | `#F7B6B8` |                               |
| `red-50`  | `#FBDADB` | **Tag background**            |

### 🟢 Green Pear - Accent Color

**Usage**: Secondary buttons, links, active states, accent elements

| Shade       | Hex       | Usage                    |
| ----------- | --------- | ------------------------ |
| `green-900` | `#5B6416` | Darkest                  |
| `green-800` | `#7A861D` |                          |
| `green-700` | `#98A725` |                          |
| `green-600` | `#B6C92C` |                          |
| `green-500` | `#C2D43D` | **Primary accent color** |
| `green-400` | `#D0DE68` |                          |
| `green-300` | `#DBE58A` | **Button hover state**   |
| `green-200` | `#E5EDAB` |                          |
| `green-100` | `#EFF4CD` |                          |
| `green-50`  | `#FAFBEE` |                          |

### 🔵 Honolulu Blue - Success/Info Color

**Usage**: Success states, informational elements, links

| Shade      | Hex       | Usage                   |
| ---------- | --------- | ----------------------- |
| `blue-900` | `#001929` | Darkest                 |
| `blue-800` | `#003252` |                         |
| `blue-700` | `#004B7A` |                         |
| `blue-600` | `#0065A3` |                         |
| `blue-500` | `#0076BE` | **Primary blue, links** |
| `blue-400` | `#0097F5` |                         |
| `blue-300` | `#1FA9FF` | **Button hover state**  |
| `blue-200` | `#47B9FF` |                         |
| `blue-100` | `#70C8FF` |                         |
| `blue-50`  | `#99D8FF` | **Avatar background**   |

### 🟤 Beaver - Brown Tones

**Usage**: Earthy accents, secondary UI elements

| Shade        | Hex       |
| ------------ | --------- |
| `beaver-900` | `#2F2A23` |
| `beaver-800` | `#463E34` |
| `beaver-700` | `#5E5345` |
| `beaver-600` | `#756857` |
| `beaver-500` | `#8A7A65` |
| `beaver-400` | `#A0917E` |
| `beaver-300` | `#B1A595` |
| `beaver-200` | `#C2B9AD` |
| `beaver-100` | `#D4CDC4` |
| `beaver-50`  | `#E5E1DC` |

### ⚪ Neutral - Gray Scale

**Usage**: Typography, icons, borders, backgrounds, dividers

| Shade      | Hex       | Usage                            |
| ---------- | --------- | -------------------------------- |
| `gray-900` | `#1C1C1C` |                                  |
| `gray-800` | `#262626` | **Headings, dialog backgrounds** |
| `gray-700` | `#595959` | Secondary text                   |
| `gray-600` | `#8C8C8C` | **Body text, icons**             |
| `gray-500` | `#BFBFBF` | **Disabled text**                |
| `gray-400` | `#D9D9D9` | **Borders**                      |
| `gray-300` | `#E8E8E8` | **Borders, disabled button bg**  |
| `gray-200` | `#F5F5F5` | **Background dividers**          |
| `gray-100` | `#FAFAFA` | Light backgrounds                |
| `gray-50`  | `#FFFFFF` | **Card backgrounds, white**      |

### 🟡 Yellow - Warning Color

**Usage**: Warnings, callouts, alerts

| Shade        | Hex       | Usage                                |
| ------------ | --------- | ------------------------------------ |
| `yellow-600` | `#E6C530` |                                      |
| `yellow-500` | `#FDD835` | **Warning primary, callout borders** |
| `yellow-400` | `#FDE05D` |                                      |
| `yellow-100` | `#FEF3C0` |                                      |
| `yellow-50`  | `#FFFBEB` | **Callout background**               |

### 🟠 Crayola - Rating & Official

**Usage**: Ratings, official badges

| Shade         | Hex       |
| ------------- | --------- |
| `crayola-500` | `#F5A623` |

## Semantic Color Mappings

These are the semantic colors that map to the specific shades above:

```css
/* Primary Brand Color (Red) */
--primary: #e62129; /* red-500 */
--primary-foreground: #ffffff;

/* Secondary Color (Green) */
--secondary: #c2d43d; /* green-500 */
--secondary-foreground: #262626;

/* Accent Color (Blue) */
--accent: #0076be; /* blue-500 */
--accent-foreground: #ffffff;

/* Destructive/Error */
--destructive: #e62129; /* red-500 */
--destructive-foreground: #ffffff;

/* Backgrounds */
--background: #ffffff; /* white */
--foreground: #262626; /* gray-800 */

/* Muted/Disabled */
--muted: #f5f5f5; /* gray-200 */
--muted-foreground: #8c8c8c; /* gray-600 */

/* Borders & Inputs */
--border: #d9d9d9; /* gray-400 */
--input: #bfbfbf; /* gray-500 */
--ring: #0076be; /* blue-500 */
```

## Usage Guidelines

### Buttons

**Primary CTA Button:**

- Background: `red-500` (#E62129)
- Hover: `red-300` (#EF6C70)
- Pressed: `red-700` (#A51217)
- Text: white

**Secondary Button:**

- Background: `green-500` (#C2D43D)
- Hover: `green-300` (#DBE58A)
- Text: `gray-800` (#262626)

**Info/Link Button:**

- Background: `blue-500` (#0076BE)
- Hover: `blue-300` (#1FA9FF)
- Text: white

### Typography

- **Headings**: `gray-800` (#262626)
- **Body Text**: `gray-600` (#8C8C8C)
- **Secondary Text**: `gray-700` (#595959)
- **Disabled Text**: `gray-500` (#BFBFBF)

### UI Elements

- **Primary Border**: `gray-400` (#D9D9D9)
- **Disabled Border**: `gray-300` (#E8E8E8)
- **Dividers**: `gray-200` (#F5F5F5)
- **Card Background**: `gray-50` (#FFFFFF)
- **Dialog Background**: `gray-800` (#262626)

### Tags & Badges

- **Error/Alert Tag**: `red-50` (#FBDADB) background
- **Info Tag**: `blue-50` (#99D8FF) background
- **Success Tag**: `green-50` (#FAFBEE) background

### States

- **Active State**: `red-500` (#E62129)
- **Hover State**: `red-300` (#EF6C70) or `blue-300` (#1FA9FF)
- **Focus Ring**: `blue-500` (#0076BE)
- **Disabled**: `gray-300` (#E8E8E8) background, `gray-500` (#BFBFBF) text

## Tailwind Usage

All colors are available as Tailwind classes:

```jsx
// Red scale
<button className="bg-red-500 hover:bg-red-300 active:bg-red-700">
  Primary Button
</button>

// Green scale
<div className="bg-green-50 border border-green-500">
  Success Alert
</div>

// Blue scale
<a className="text-blue-500 hover:text-blue-300">
  Link
</a>

// Gray scale
<p className="text-gray-600">Body text</p>
<div className="border border-gray-400">Content</div>

// Yellow scale
<div className="bg-yellow-50 border-l-4 border-yellow-500">
  Warning Callout
</div>
```

## Accessibility

All color combinations have been designed to meet WCAG 2.1 AA standards for contrast:

- Primary buttons (red-500 on white): ✅ Pass
- Body text (gray-600 on white): ✅ Pass
- Disabled text (gray-500 on white): ⚠️ Use sparingly
- Link text (blue-500 on white): ✅ Pass
