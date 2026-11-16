# Figma Design Reference — Room Listing V2

> **Workshop note:** Fetch design via **workshop-figma MCP** — `figma_get_frame_spec` with `fileKey: stayview-room-listing-v2`, `frameId: room-listing-v2`. This markdown is the backing spec returned by that tool (production would use the Figma cloud MCP).

## Layout Spec

### Page Structure
```
┌──────────────────────────────────────────────────────┐
│  Header (existing — no changes)                      │
├──────────────────────────────────────────────────────┤
│  Page Title: "Our Rooms & Suites"                    │
│  Subtitle: "Find your perfect room..."               │
├──────────────────────────────────────────────────────┤
│  Filter Bar                                          │
│  ┌──────────┬──────────┬──────────┬────────────────┐ │
│  │ Category │ Bed Type │ Price    │ Guests         │ │
│  └──────────┴──────────┴──────────┴────────────────┘ │
│  ┌─────────────────────────────────────────────────┐ │
│  │ NEW: Amenities Multi-Select                     │ │
│  │ [✓ WiFi] [✓ Ocean View] [ Pool] [ Spa] ...     │ │
│  └─────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────┤
│  Room Card Grid (3 columns on desktop, 1 on mobile)  │
│                                                      │
│  ┌─────────────────┐  ┌─────────────────┐            │
│  │ ┌─────────────┐ │  │ ┌─────────────┐ │            │
│  │ │             │ │  │ │             │ │            │
│  │ │  16:9 IMAGE │ │  │ │  16:9 IMAGE │ │            │
│  │ │             │ │  │ │             │ │            │
│  │ │ ┌─────────┐ │ │  │ │             │ │            │
│  │ │ │Name $289│ │ │  │ │             │ │            │
│  │ ├─┴─────────┴─┤ │  │ ├─────────────┤ │            │
│  │ │⭐4.8 (234)  │ │  │ │             │ │            │
│  │ │🏊 🌊 🍸 🛁 🏋│ │  │ │  SOLD OUT   │ │            │
│  │ │             │ │  │ │  Waitlist ↗  │ │            │
│  │ │Earn ~2890pts│ │  │ │             │ │            │
│  │ └─────────────┘ │  │ └─────────────┘ │            │
│  └─────────────────┘  └─────────────────┘            │
└──────────────────────────────────────────────────────┘
```

### Room Card V2 Spec

**Available Room:**
- Hero image: 16:9 aspect ratio, rounded-t-lg
- Gradient overlay: bottom 40%, from transparent to black/70%
- Room name: white, font-heading, text-lg — overlaid bottom-left of image
- Price: white, font-bold — overlaid bottom-right of image
- Category badge: top-left, white/90% bg, text-xs
- Loyalty badge: top-right, amber-500 bg, white text, text-xs, "Earn ~{points} pts"
- Below image:
  - Star rating + review count
  - Amenity icon row (max 5 SVG icons, 16x16, neutral-500)
  - Room specs: sqft | bed type | max guests — text-sm, neutral-500

**Sold Out Room:**
- Entire card at 60% opacity
- No gradient overlay on image
- Centered overlay: "Sold Out" text-lg + "Join Waitlist" button (btn-secondary, sm)
- No loyalty badge

### Amenity Filter Spec
- Horizontal row of toggleable chips below the existing filter bar
- Each chip: rounded-full, border, text-sm
- Inactive: bg-white, border-neutral-300, text-neutral-600
- Active: bg-brand-50, border-brand-500, text-brand-700
- Available amenities: WiFi, Pool, Spa, Gym, Ocean View, Balcony, Pet Friendly, Restaurant, Room Service, Kitchen

### Color Tokens
- Gradient overlay: `bg-gradient-to-t from-black/70 to-transparent`
- Loyalty badge bg: `bg-amber-500`
- Sold out opacity: `opacity-60`
- Amenity chip active: `bg-brand-50 border-brand-500 text-brand-700`

### Spacing
- Card gap: 24px (gap-6)
- Card internal padding: 16px (p-4)
- Image to content: 0 (content directly below image)
- Filter bar to grid: 24px (mb-6)
