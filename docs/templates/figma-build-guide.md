# Figma frame build guide (Room Listing V2)

Create frame **Room Listing Page V2** in your workshop Figma file. Match **`docs/figma-room-listing-v2.md`** for layout.

## Must include

- Header unchanged (reference only)
- Page title + subtitle
- Filter bar (category, bed, price, guests) **plus** amenity chip row
- 3-column desktop card grid (1 column mobile)
- **Available card:** 16:9 image, gradient overlay, name/price on image, loyalty badge top-right, star row, amenity icons, specs line
- **Sold-out card:** 60% opacity, centered Sold Out + Join Waitlist, no loyalty badge
- Tokens: amber loyalty badge, brand chips for active amenity filters

## After building

1. Select the frame → Copy link to selection.
2. Paste URL into `docs/workshop-config.json` → `figmaDesignUrl`.
3. Confirm Figma MCP `get_design_context` returns layout for that URL.