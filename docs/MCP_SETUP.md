# MCP setup — real Jira (Atlassian) & Figma

This lab loads the **live Jira story** and **live Figma frame** through official remote MCP servers.

## Prerequisites

- **Atlassian Cloud** Jira access (same account you can open in the browser)
- **Figma** account with view access to the workshop design file
- Jira story + Figma frame created — see **`docs/CREATE-JIRA-AND-FIGMA.md`**
- **`docs/workshop-config.json`** filled with your `jiraIssueKey` and `figmaDesignUrl`

## 1. Wire MCP in the project

The repo ships **`.cursor/mcp.json`** with two remote servers:

| Server name in Cursor | Endpoint |
|----------------------|----------|
| `atlassian` | `https://mcp.atlassian.com/v2/mcp` |
| `figma` | `https://mcp.figma.com/mcp` |

You only need to open this folder as the Cursor workspace so that file is picked up. No edit is required unless your team renames servers.

---

## 2. Atlassian MCP — wire and authenticate (Jira)

**Prerequisites:** Atlassian **Cloud** account with permission to view the Jira project/issue in `workshop-config.json`. (Server/Data Center Jira is not supported by this remote MCP.)

### Step-by-step

1. **Open the project correctly** — **File → Open Folder** → select **`stayview`** (the folder that contains `.cursor/mcp.json`).
2. **Open MCP settings** — **Cursor Settings → Tools & MCP** (or **MCP** in the sidebar).
3. **Find `atlassian`** — it should appear under project MCP servers from `.cursor/mcp.json`.
4. **Turn the server on** — toggle **Enabled** if it is off.
5. **Connect** — click **Connect** (or **Sign in**) next to **`atlassian`**.
6. **Browser OAuth** — when the browser opens:
   - Sign in with your Atlassian account if prompted.
   - Choose the **Jira Cloud site** that hosts your workshop project.
   - Click **Accept** / **Allow** so Cursor can access Jira on your behalf.
7. **Confirm in Cursor** — the `atlassian` row should show **connected** (no error badge). Green check / “Connected” varies by Cursor version.
8. **Smoke test** — in Chat (`Ctrl+L`):
   ```
   @file docs/workshop-config.json
   Using Atlassian MCP, retrieve the Jira issue in jiraIssueKey and return its summary and description.
   ```
   You should see fields from **your real issue**, not file contents from `docs/JIRA-4521.md`.

### Optional: Marketplace install

Instead of manual wiring, you can add **Atlassian** from the [Cursor MCP marketplace](https://cursor.com/marketplace/mcp/atlassian) (**Add to Cursor**). Still complete OAuth when prompted. Keep the project `.cursor/mcp.json` so teammates share the same server URL.

### Atlassian troubleshooting

| Problem | What to do |
|---------|------------|
| `atlassian` missing in MCP list | Reopen `stayview` as folder; restart Cursor; confirm `.cursor/mcp.json` exists. |
| Connect loop or 401 | Command Palette → **Clear All MCP Tokens** → Connect again. |
| “Issue not found” | Fix `jiraIssueKey` in `workshop-config.json`; confirm your OAuth user can open that issue in the browser. |
| Corporate network blocks OAuth | Use VPN or offline MCP: `.cursor/mcp.offline.example.json` + `npm run mcp:install`. |

Official reference: [Get started with the Atlassian MCP server](https://support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/).

---

## 3. Figma MCP — wire and authenticate

1. In **Settings → Tools & MCP**, enable **`figma`** from `.cursor/mcp.json`.
2. Click **Connect** → **Allow access** in the browser (Figma account that can view your design file).
3. **Optional:** Command Palette → chat → `/add-plugin figma` for Figma skills (design-to-code).
4. If tool calls fail: **Clear All MCP Tokens**, reconnect, restart Cursor.

Remote Figma MCP needs a **frame URL** in prompts (`figmaDesignUrl` in config), not only a file home page.

See: [Cursor and Figma MCP setup](https://help.figma.com/hc/en-us/articles/39889260656407-Cursor-and-Figma-Set-up-the-MCP-server).

## 4. Verify both servers before Module 1

**Chat (`Ctrl+L`):**

```
@file docs/workshop-config.json
Using Atlassian MCP, retrieve the Jira issue named in jiraIssueKey and summarize acceptance criteria.
```

```
@file docs/workshop-config.json
Using Figma MCP, get design context for figmaDesignUrl in this config. Summarize differences vs the current RoomCard at @file components/RoomCard.tsx.
```

You should see **real** Jira fields and **real** Figma structure—not markdown files.

## 5. Prompting pattern for the lab

Always include **`@file docs/workshop-config.json`** when you need the issue key or Figma URL in context.

- **Jira:** “Using Atlassian MCP, fetch issue **{jiraIssueKey}** …”
- **Figma:** “Using Figma MCP, get design context for **figmaDesignUrl** …”

Do not implement from `docs/JIRA-4521.md` or `docs/figma-room-listing-v2.md` unless MCP is blocked; those files are **templates** for creating cloud artifacts.

## 6. Offline fallback (no Jira/Figma OAuth)

1. Run `npm run mcp:install` from project root.
2. Replace `.cursor/mcp.json` with **`.cursor/mcp.offline.example.json`** (or merge `workshop-jira` / `workshop-figma` entries).
3. Enable those servers and use prompts from `mcp.offline.example.json` comments in the instructor guide.

Local servers read `docs/mcp-seed/` — no cloud ticket required.