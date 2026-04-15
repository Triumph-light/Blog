# 前言

最近在学习ai，发现ai的相关知识越来越多，如：agent、mcp、skill，准备整体梳理一下。

# skill 介绍

一个固定的格式，封装了指令、脚本、资源等，能够用于位智能体提供可复用、面向特定专业场景的技能。

一个技能能够被视为提供给智能体的一套“专业说明书“。执行任务时，能够按需加载相应的技能，从而增强对任务的理解和执行能力。

## 主要特点

- 结构化：在根目录下必须要包含skill.md文件
  > skill.md文件的格式如下：

```markdown
name: Skill Name
description: Skill Description
license: License Name
compatibility: Compatibility Requirements
metadata: Additional Metadata
allowed-tools: Allowed Tools
```

- 动态按需加载：任务开始时，智能体不会一次性读取所有技能内容，而是扫描所有的技能简要描述，判断当前任务和某个技能描述高度相关，才会加载该技能的详细内容。有效的减少上下文token、避免无关信息的干扰。

## 使用场景

- 保证输出结果的一致性与规范性
- 自动化重复性工作流
- 总结与共享专业能力

## skill 与 mcp的区别

skill 是给agent描述一个工作如何完成，而mcp server是给agent提供一个可以调用的工具。

## skill的具体使用和发布l，可以参考以下链接：

- [Vercel 官方指南](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context)

# 引用

- [Agent Skills Specification](https://agentskills.io)
- [Skills Directory](https://skills.sh)
- [Amp Skills Documentation](https://ampcode.com/manual#agent-skills)
- [Antigravity Skills Documentation](https://antigravity.google/docs/skills)
- [Factory AI / Droid Skills Documentation](https://docs.factory.ai/cli/configuration/skills)
- [Claude Code Skills Documentation](https://code.claude.com/docs/en/skills)
- [OpenClaw Skills Documentation](https://docs.openclaw.ai/tools/skills)
- [Cline Skills Documentation](https://docs.cline.bot/features/skills)
- [CodeBuddy Skills Documentation](https://www.codebuddy.ai/docs/ide/Features/Skills)
- [Codex Skills Documentation](https://developers.openai.com/codex/skills)
- [Command Code Skills Documentation](https://commandcode.ai/docs/skills)
- [Crush Skills Documentation](https://github.com/charmbracelet/crush?tab=readme-ov-file#agent-skills)
- [Cursor Skills Documentation](https://cursor.com/docs/context/skills)
- [Firebender Skills Documentation](https://docs.firebender.com/multi-agent/skills)
- [Gemini CLI Skills Documentation](https://geminicli.com/docs/cli/skills/)
- [GitHub Copilot Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [iFlow CLI Skills Documentation](https://platform.iflow.cn/en/cli/examples/skill)
- [Kimi Code CLI Skills Documentation](https://moonshotai.github.io/kimi-cli/en/customization/skills.html)
- [Kiro CLI Skills Documentation](https://kiro.dev/docs/cli/custom-agents/configuration-reference/#skill-resources)
- [Kode Skills Documentation](https://github.com/shareAI-lab/kode/blob/main/docs/skills.md)
- [OpenCode Skills Documentation](https://opencode.ai/docs/skills)
- [Qwen Code Skills Documentation](https://qwenlm.github.io/qwen-code-docs/en/users/features/skills/)
- [OpenHands Skills Documentation](https://docs.openhands.ai/modules/usage/how-to/using-skills)
- [Pi Skills Documentation](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/skills.md)
- [Qoder Skills Documentation](https://docs.qoder.com/cli/Skills)
- [Replit Skills Documentation](https://docs.replit.com/replitai/skills)
- [Roo Code Skills Documentation](https://docs.roocode.com/features/skills)
- [Trae Skills Documentation](https://docs.trae.ai/ide/skills)
- [Vercel Agent Skills Repository](https://github.com/vercel-labs/agent-skills)
