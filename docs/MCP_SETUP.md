# MCP setup — Jira & Figma for StayView workshop

This lab wires **Jira** and **Figma** through **Model Context Protocol (MCP)** so Cursor fetches the story and design like a production workflow.

## 1. Install MCP server dependencies

From the `stayview` project root:

```bash
cd mcp
npm install
cd ..
```

## 2. Enable servers in Cursor

1. Open the **`stayview`** folder in Cursor (File → Open Folder).
2. Open **Cursor Settings → MCP** (or the MCP panel).
3. Confirm **`workshop-jira`** and **`workshop-figma`** appear from `.cursor/mcp.json`.
4. Turn both **on**. Reload Cursor if they do not start.

Config location: `.cursor/mcp.json`

| Server | Purpose |
|--------|---------|
| `workshop-jira` | `jira_get_issue`, `jira_search_issues` → seed issue **STAY-4521** |
| `workshop-figma` | `figma_get_file`, `figma_get_frame_spec` → frame **room-listing-v2** |

Back-end data lives in `docs/mcp-seed/` and `docs/figma-room-listing-v2.md` (local stand-in for cloud APIs).

## 3. Verify before Module 1

**Chat (Ctrl+L):**

```
Using workshop-jira MCP, call jira_get_issue for STAY-4521 and summarize acceptance criteria.

Using workshop-figma MCP, call figma_get_frame_spec for fileKey stayview-room-listing-v2, frameId room-listing-v2, and list the main visual differences from the current RoomCard.
```

You should see structured JSON from both tools, not generic answers.

## 4. Production-style MCP (optional)

See `.cursor/mcp.production.example.json` for adding **Atlassian** and **Figma** cloud MCP URLs. Complete OAuth in Cursor when prompted, then use the same prompts with `atlassian` / `figma` instead of workshop servers.

Keep workshop servers enabled for participants without corporate Jira/Figma access.