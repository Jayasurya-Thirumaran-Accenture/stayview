# Paste into Jira description (Room Listing redesign)

## Summary

Redesign the Room Listing page (`/rooms`) to match the updated Figma design. The new layout introduces a card grid with larger imagery, an enhanced filter experience with amenity-based filtering, and visual indicators for loyalty point earnings. Gate behind feature flag `room-listing-v2` using existing `isFeatureEnabled()`.

## Acceptance Criteria

- **AC-1:** New room cards: 16:9 hero images, gradient overlay, name + starting price on image
- **AC-2:** Amenity icon row (max 5 icons) instead of text badges
- **AC-3:** Amenities multi-select on FilterBar
- **AC-4:** Loyalty badge "Earn ~{points} pts" where points = pricePerNight × 10
- **AC-5:** Sold-out: muted card + waitlist CTA (not hidden)
- **AC-6:** Behind `room-listing-v2` feature flag
- **AC-7:** Analytics: keep existing + `room_listing_amenity_filter_click`, `room_listing_loyalty_badge_hover`, `room_listing_waitlist_click`
- **AC-8:** E2E green for V1; new E2E for V2 behind flag
- **AC-9:** Unit tests: RoomCardV2, amenity filter, loyalty math, flag toggle
- **AC-10:** No CWV regression (LCP < 2.5s, CLS < 0.1, INP < 200ms)

## Design

Link the Figma frame from `workshop-config.json` (`Room Listing Page V2`).

## Technical Notes

- Add `room-listing-v2` to `lib/feature-flags.ts`
- New `components/RoomCardV2.tsx`; do not rewrite `RoomCard.tsx`
- Reuse `StarRating`, `PriceTag`
- Extend `filterRooms()` in `lib/rooms.ts`
- Analytics: `{page}_{element}_{action}`

## Out of Scope

- Room detail redesign, backend API changes, custom mobile-only layouts