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

function loadFileMeta() {
  const metaPath = path.join(projectRoot, "docs", "mcp-seed", "figma-file.json");
  return JSON.parse(fs.readFileSync(metaPath, "utf8"));
}

function loadFrameSpec(fileKey, frameId) {
  const meta = loadFileMeta();
  if (fileKey !== meta.fileKey) {
    return { error: `Figma file ${fileKey} not found. Workshop fileKey: ${meta.fileKey}` };
  }

  const frame = meta.frames.find((f) => f.id === frameId || f.name === frameId);
  if (!frame) {
    return {
      error: `Frame ${frameId} not found`,
      availableFrames: meta.frames.map((f) => ({ id: f.id, name: f.name })),
    };
  }

  const specPath = path.join(projectRoot, frame.specPath);
  const specMarkdown = fs.readFileSync(specPath, "utf8");

  return {
    fileKey: meta.fileKey,
    fileName: meta.name,
    frame: { id: frame.id, name: frame.name, description: frame.description },
    specMarkdown,
    source: "workshop-figma-mcp",
  };
}

const server = new Server(
  { name: "stayview-workshop-figma", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "figma_get_file",
      description: "Get Figma file metadata and list of frames (workshop file: stayview-room-listing-v2).",
      inputSchema: {
        type: "object",
        properties: {
          fileKey: {
            type: "string",
            description: "Figma file key",
          },
        },
        required: ["fileKey"],
      },
    },
    {
      name: "figma_get_frame_spec",
      description:
        "Get design specification for a frame including layout tokens and component specs as markdown text.",
      inputSchema: {
        type: "object",
        properties: {
          fileKey: { type: "string" },
          frameId: {
            type: "string",
            description: 'Frame id or name, e.g. "room-listing-v2"',
          },
        },
        required: ["fileKey", "frameId"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "figma_get_file") {
    const fileKey = args?.fileKey ?? "stayview-room-listing-v2";
    const meta = loadFileMeta();
    if (fileKey !== meta.fileKey) {
      return {
        content: [{ type: "text", text: JSON.stringify({ error: `Unknown file ${fileKey}` }, null, 2) }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(meta, null, 2) }],
    };
  }

  if (name === "figma_get_frame_spec") {
    const fileKey = args?.fileKey ?? "stayview-room-listing-v2";
    const frameId = args?.frameId ?? "room-listing-v2";
    const result = loadFrameSpec(String(fileKey), String(frameId));
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }

  return {
    content: [{ type: "text", text: `Unknown tool: ${name}` }],
    isError: true,
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);