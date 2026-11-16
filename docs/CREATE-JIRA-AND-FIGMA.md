# Create the real Jira ticket and Figma frame

The lab fetches requirements from **Atlassian MCP** and design from **Figma MCP**. Create both **before Module 1**, then point `docs/workshop-config.json` at them.

## 1. Jira (Atlassian Cloud)

1. In your Jira site, create a **Story** (or Team-managed story) in your workshop project.
2. Set **summary:** `Redesign Room Listing Page (/rooms)`
3. Paste the description and acceptance criteria from **`docs/templates/jira-story-body.md`** (same content as the legacy `docs/JIRA-4521.md`).
4. Link or mention the Figma frame URL once it exists.
5. Note the issue key (e.g. `STAY-4521`, `BWQE-42`).
6. Update **`docs/workshop-config.json`**:
   - `jiraIssueKey`
   - `jiraProjectKey` (prefix before the dash)

**Verify in Cursor (after Atlassian MCP OAuth):**

```
@file docs/workshop-config.json
Using Atlassian MCP, retrieve Jira issue {jiraIssueKey} and list all acceptance criteria.
```

## 2. Figma (remote MCP)

1. Create a Figma Design file, e.g. **StayView — Room Listing V2**.
2. Build a frame named **`Room Listing Page V2`** using **`docs/figma-room-listing-v2.md`** (and **`docs/templates/figma-build-guide.md`**) as the build checklist.
3. Copy the **frame link** (Share → Copy link, or copy link to selection with `node-id=...`).
4. Update **`docs/workshop-config.json`**:
   - `figmaDesignUrl` (must include `node-id` for the V2 frame)
   - `figmaFrameName`

**Verify in Cursor (after Figma MCP OAuth):**

```
@file docs/workshop-config.json
Using Figma MCP, get design context for the figmaDesignUrl in this config. Summarize layout, cards, filters, and tokens for implementing RoomCardV2.
```

## 3. Instructor checklist

| Item | Done? |
|------|-------|
| Jira story created with AC-1–AC-10 | |
| Figma frame matches markdown spec | |
| `workshop-config.json` updated | |
| Atlassian MCP connected in Cursor | |
| Figma MCP connected in Cursor | |
| Both verify prompts succeed | |

## 4. Offline / no cloud access

Use **`.cursor/mcp.offline.example.json`** instead of `.cursor/mcp.json`, run `npm run mcp:install`, and use the seeded local servers. See **`docs/MCP_SETUP.md`** section “Offline fallback”.