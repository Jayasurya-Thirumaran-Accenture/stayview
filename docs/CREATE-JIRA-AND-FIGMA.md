# Create the real Jira ticket and Figma frame

The lab fetches requirements from **Atlassian MCP** and design from **Figma MCP**. Create both **before Module 1**, then point `docs/workshop-config.json` at them.

## 1. Jira (Atlassian Cloud)

1. In your Jira site, create a **Story** in your workshop project.
2. **Summary:** `Redesign Room Listing Page (/rooms)`
3. Paste this into the **description** (acceptance criteria included):

### Story text (copy into Jira)

Redesign the Room Listing page (`/rooms`) to match the Figma design: larger card imagery, amenity filtering, loyalty points badges, gated behind `room-listing-v2` via `isFeatureEnabled()`.

**Acceptance criteria**

- AC-1: New room cards: 16:9 hero, gradient overlay, name + price on image
- AC-2: Amenity icon row (max 5), not text badges
- AC-3: Amenities multi-select on FilterBar
- AC-4: Loyalty badge `Earn ~{points} pts` (pricePerNight × 10)
- AC-5: Sold-out: muted card + waitlist CTA
- AC-6: Behind `room-listing-v2` feature flag
- AC-7: Analytics: existing + `room_listing_amenity_filter_click`, `room_listing_loyalty_badge_hover`, `room_listing_waitlist_click`
- AC-8: E2E green for V1; new E2E for V2 with flag
- AC-9: Unit tests: RoomCardV2, amenity filter, loyalty math, flag toggle
- AC-10: No CWV regression (LCP < 2.5s, CLS < 0.1, INP < 200ms)

**Technical:** Add flag in `lib/feature-flags.ts`; new `RoomCardV2.tsx`; reuse `StarRating`, `PriceTag`; extend `filterRooms()` in `lib/rooms.ts`.

4. Link the Figma frame when ready.
5. Update **`docs/workshop-config.json`**: `jiraIssueKey`, `jiraProjectKey`.

**Verify (Atlassian MCP OAuth):**

```
@file docs/workshop-config.json
Using Atlassian MCP, retrieve Jira issue {jiraIssueKey} and list all acceptance criteria.
```

## 2. Figma (remote MCP)

1. Create a Figma file, e.g. **StayView — Room Listing V2**.
2. Frame **`Room Listing Page V2`** should include:
   - Page title/subtitle, existing-style filter bar + **amenity chips**
   - Card grid: 16:9 image, gradient overlay, name/price on image, loyalty badge, amenity icons
   - Sold-out variant: ~60% opacity, waitlist CTA
3. Copy **link to frame** (`node-id=...` in URL).
4. Update **`docs/workshop-config.json`**: `figmaDesignUrl`, `figmaFrameName`.

**Verify (Figma MCP OAuth):**

```
@file docs/workshop-config.json
Using Figma MCP, get design context for figmaDesignUrl in this config.
```

## 3. Instructor checklist

| Item | Done? |
|------|-------|
| Jira story with AC-1–AC-10 | |
| Figma frame built | |
| `workshop-config.json` updated | |
| Atlassian + Figma MCP connected | |
| Verify prompts succeed | |