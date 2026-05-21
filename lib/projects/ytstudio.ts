import type { ProjectDetail } from "../data";

export const ytstudio: ProjectDetail = {
  id: "ytstudio",
  name: "Studio Engine",
  sub: "AI Animation Pipeline",
  years: "2025 — Present",
  status: "build",
  statusLabel: "Local · in build",
  blurb:
    "Series-agnostic hybrid local/cloud AI production pipeline for short-form animated content. Multi-agent orchestration, headless Blender + Stable Diffusion + RVC + Wav2Lip on a single GPU.",
  intro:
    "A single-node animation studio: a Python orchestrator drives Gemini-powered agents (Director, Cinematographer, Engineer, QC) that own the pipeline from script JSON to final shot. Headless Blender renders guide maps; Stable Diffusion Forge styles them with ControlNet; RVC + Wav2Lip handle voice and sync. Strict serial GPU use lets it run on a 4 GB GTX 1650 Ti.",
  problem:
    "Generating short-form animated content end-to-end stitches a dozen disjoint tools. There's no single pipeline that goes from script intent to rendered shot with consistent direction, agent-driven QC, and the discipline to run on consumer hardware.",
  built: [
    "Multi-agent system on Gemini 1.5 Pro/Flash — Director (vision), Cinematographer (camera+lighting), Engineer (asset audit), QC (frame-level hallucination detection)",
    "Watch-folder Python orchestrator (studio.py) with Scripts → Processing → Completed/Quarantine lifecycle, persistent log",
    "VRAM Sentinel: strict serial processing across Blender + SD Forge on a single 4 GB GPU",
    "Smart caching via hash key (CharID + AnimID + CamAngle + LightingHex) — dialogue changes don't trigger visual re-renders",
    "Headless Blender pipeline outputs Depth + OpenPose + Normal + Lighting guide maps; SD Forge styles via ControlNet stack",
    "Voice pipeline: ElevenLabs for cadence → RVC for character timbre → Wav2Lip for lip sync at 12 fps",
    "React + Vite + FastAPI command center with WebSocket-streamed render logs and the Red Pen inpaint protocol",
    "Cloudflare Tunnel for remote directing — approve shots from an iPad while away from the desk",
  ],
  features: [
    {
      icon: "brain",
      name: "Multi-agent system",
      lead: "Director / Cinematographer / Engineer / QC on Gemini.",
      desc: "Structured-I/O agents (not chatbots). Director on Pro, the rest on Flash. Each agent owns one slice of the pipeline; the orchestrator routes between them.",
    },
    {
      icon: "queue",
      name: "Watch-folder orchestrator",
      lead: "Scripts → Processing → Completed / Quarantine.",
      desc: "studio.py monitors PRODUCTION/Scripts every 5s, atomically locks a JSON, runs the GPU pipeline, sorts the result. Crashes land in Quarantine with a log entry.",
    },
    {
      icon: "split",
      name: "VRAM sentinel",
      lead: "Strict serial GPU use on 4 GB VRAM.",
      desc: "Blender and SD Forge cannot run together. The sentinel coordinates the serial handoff so the whole pipeline fits on a GTX 1650 Ti.",
    },
    {
      icon: "ingest",
      name: "Hash-keyed cache",
      lead: "Visual identity, not audio content, keys the render.",
      desc: "MD5(CharID + AnimID + CamAngle + LightingHex) hits skip GPU. Re-recording dialogue or re-pacing audio reuses the existing frame stack.",
    },
    {
      icon: "audit",
      name: "Frame-level QC agent",
      lead: "Gemini Pro Vision scrubs for AI hallucinations.",
      desc: "Catches extra fingers, melting text, drifting eyes, jittery shoulders, reflections that don't match the subject, etc. Flags clusters of inconsistencies for the director.",
    },
    {
      icon: "globe",
      name: "Remote directing",
      lead: "React command center + Cloudflare Tunnel.",
      desc: "Live render feed, timeline, terminal logs over WebSockets. Red Pen protocol: sketch a fix on the frame in the iPad and the agent inpaints just that region.",
    },
  ],
  proof: {
    metric: "Single GPU",
    metricLabel: "GTX 1650 Ti · 4 GB VRAM",
    extra: "full pipeline · script → final shot on consumer hardware",
  },
  stack: [
    "Python", "Gemini 1.5 Pro/Flash", "Blender (bpy)", "Stable Diffusion Forge",
    "ControlNet", "ElevenLabs", "RVC", "Wav2Lip", "FastAPI", "React + Vite",
    "Tailwind", "WebSockets", "Cloudflare Tunnel", "FFmpeg",
  ],
  archCaption:
    "Gemini-driven multi-agent orchestrator (studio.py) routes script JSON through Blender (guide maps) → SD Forge (style) → RVC + Wav2Lip (audio + lip sync); React + FastAPI command center streams logs; Cloudflare Tunnel for remote directing.",
  linksNote: "Local-only · single-node studio · this page serves as the writeup",
};
