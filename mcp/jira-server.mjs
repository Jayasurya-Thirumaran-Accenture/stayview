#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

function loadIssue(issueKey) {
  const normalized = issueKey.toUpperCase().replace(/^JIRA-/, "STAY-");
  const seedPath = path.join(projectRoot, "docs", "mcp-seed", "STAY-4521.json");
  const raw = fs.readFileSync(seedPath, "utf8");
  const issue = JSON.parse(raw);

  if (normalized !== "STAY-4521" && issueKey.toUpperCase() !== "JIRA-4521") {
    return {
      error: `Issue ${issueKey} not found in workshop Jira. Supported keys: STAY-4521, JIRA-4521`,
    };
  }

  const mdPath = path.join(projectRoot, "docs", "JIRA-4521.md");
  const markdown = fs.existsSync(mdPath) ? fs.readFileSync(mdPath, "utf8") : "";

  return { ...issue, markdownBody: markdown, source: "workshop-jira-mcp" };
}

const server = new Server(
  { name: "stayview-workshop-jira", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "jira_get_issue",
      description:
        "Fetch a Jira issue by key (workshop: STAY-4521 or JIRA-4521). Returns summary, acceptance criteria, design links, and technical notes.",
      inputSchema: {
        type: "object",
        properties: {
          issueKey: {
            type: "string",
            description: "Jira issue key, e.g. STAY-4521",
          },
        },
        required: ["issueKey"],
      },
    },
    {
      name: "jira_search_issues",
      description:
        "Search open stories in the workshop project. Optional JQL text filters summary (workshop seed only).",
      inputSchema: {
        type: "object",
        properties: {
          jql: {
            type: "string",
            description: 'Optional filter text, e.g. summary ~ "Room Listing"',
          },
          maxResults: { type: "number", maximum: 15 },
        },
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "jira_get_issue") {
    const issueKey = args?.issueKey ?? "STAY-4521";
    const result = loadIssue(String(issueKey));
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }

  if (name === "jira_search_issues") {
    const issue = loadIssue("STAY-4521");
    const jql = (args?.jql ?? "").toLowerCase();
    const matches =
      !jql || issue.summary?.toLowerCase().includes(jql) || issue.key?.toLowerCase().includes(jql);

    const issues = matches && !issue.error ? [{ key: issue.key, summary: issue.summary, type: issue.type }] : [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ total: issues.length, issues, source: "workshop-jira-mcp" }, null, 2),
        },
      ],
    };
  }

  return {
    content: [{ type: "text", text: `Unknown tool: ${name}` }],
    isError: true,
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);