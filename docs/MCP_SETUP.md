# MCP setup — live Jira (Atlassian) & Figma

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

Open this folder as the Cursor workspace so that file is picked up.

---

## 2. Atlassian MCP — wire and authenticate (Jira)

**Prerequisites:** Atlassian **Cloud** with access to the issue in `workshop-config.json`.

### Step-by-step

1. **File → Open Folder** → **`stayview`**
2. **Cursor Settings → Tools & MCP**
3. Enable **`atlassian`**
4. **Connect** → browser OAuth → pick **Jira Cloud site** → **Allow**
5. Smoke test in Chat (`Ctrl+L`):
   ```
   @file docs/workshop-config.json
   Using Atlassian MCP, retrieve the Jira issue in jiraIssueKey and return its summary and description.
   ```

### Optional: Marketplace install

[Atlassian on Cursor Marketplace](https://cursor.com/marketplace/mcp/atlassian) → **Add to Cursor** (still complete OAuth).

### Troubleshooting

| Problem | What to do |
|---------|------------|
| `atlassian` missing | Reopen `stayview` as folder; restart Cursor |
| Connect loop / 401 | Command Palette → **Clear All MCP Tokens** → reconnect |
| Issue not found | Fix `jiraIssueKey`; open issue in browser with same account |
| Corporate network | VPN; contact IT for OAuth allowlist |

[Atlassian MCP getting started](https://support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/)

---

## 3. Figma MCP — wire and authenticate

1. Enable **`figma`** in Tools & MCP → **Connect** → **Allow access**
2. Optional: `/add-plugin figma` in chat for Figma skills
3. Use **frame URL** with `node-id` in `figmaDesignUrl`

[Cursor and Figma MCP setup](https://help.figma.com/hc/en-us/articles/39889260656407-Cursor-and-Figma-Set-up-the-MCP-server)

## 4. Verify both servers before Module 1

```
@file docs/workshop-config.json
Using Atlassian MCP, retrieve the Jira issue named in jiraIssueKey and summarize acceptance criteria.
```

```
@file docs/workshop-config.json
Using Figma MCP, get design context for figmaDesignUrl in this config. Summarize differences vs @file components/RoomCard.tsx.
```

## 5. Prompting pattern

Always include **`@file docs/workshop-config.json`** when referencing the issue or design URL.

Requirements and design come **only** from MCP (Atlassian + Figma), not from local markdown copies.