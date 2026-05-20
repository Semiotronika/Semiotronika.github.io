# Быстрый старт

Запуск LINZA начинается с трех вещей: пакет, папка и модель эмбеддингов.

## Установка

```powershell
python -m pip install linza-mcp
```

Если нужно читать PDF-файлы прямо через LINZA:

```powershell
python -m pip install "linza-mcp[pdf]"
```

Обычная установка подходит для Markdown, TXT, JSON, DOCX и XLSX. `[pdf]` добавляет локальный PDF-экстрактор.

## Папка

LINZA работает с любой Markdown-папкой: Obsidian vault, проектная документация, исследовательская папка или отдельная рабочая директория.

В примерах ниже замените `/absolute/path/to/workspace-or-vault` на свой путь.

## Эмбеддинги

Для семантического поиска и карты тем нужна модель эмбеддингов. Самый простой локальный путь — LM Studio:

1. Откройте LM Studio.
2. Скачайте модель эмбеддингов, например `text-embedding-granite-embedding-278m-multilingual`, `nomic-embed-text-v1.5` или другую многоязычную модель.
3. Запустите Local Server.
4. Проверьте, что endpoint доступен на `http://127.0.0.1:1234/v1`.

## MCP-конфигурация

Claude Desktop, Cursor, OpenCode и другие MCP-клиенты обычно используют `mcpServers`:

```json
{
  "mcpServers": {
    "linza": {
      "command": "linza-mcp",
      "env": {
        "LINZA_VAULT": "/absolute/path/to/workspace-or-vault",
        "LINZA_EMBED_PROVIDER": "lmstudio",
        "LINZA_EMBED_URL": "http://127.0.0.1:1234/v1",
        "LINZA_EMBED_MODEL": "your-embedding-model-name",
        "LINZA_TOOL_SURFACE": "default"
      }
    }
  }
}
```

VS Code / Copilot MCP использует `servers`:

```json
{
  "servers": {
    "linza": {
      "type": "stdio",
      "command": "linza-mcp",
      "env": {
        "LINZA_VAULT": "/absolute/path/to/workspace-or-vault",
        "LINZA_EMBED_PROVIDER": "lmstudio",
        "LINZA_EMBED_URL": "http://127.0.0.1:1234/v1",
        "LINZA_EMBED_MODEL": "your-embedding-model-name"
      }
    }
  }
}
```

## Проверка

```powershell
linza-mcp --version
```

После подключения попросите агента:

```text
Проверь LINZA через agent_workspace(action="doctor").
Проиндексируй папку и покажи первые 3-5 review-карточек.
```

Хороший первый запуск должен быть маленьким: диагностика, индекс, карта, несколько карточек. Не начинайте с массового применения.
