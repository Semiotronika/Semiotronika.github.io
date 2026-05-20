---
prev:
  text: Сценарии
  link: /linza/use-cases
next:
  text: Как работает
  link: /linza/how-it-works
---

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

LINZA работает с любой Markdown-папкой: Obsidian-хранилищем, проектной документацией, исследовательской папкой или отдельной рабочей директорией.

В примерах ниже замените `/absolute/path/to/your-folder` на свой путь.

## Эмбеддинги

Для семантического поиска и карты тем нужна модель эмбеддингов. Самый простой локальный путь — LM Studio:

1. Откройте LM Studio.
2. Скачайте модель эмбеддингов, например `text-embedding-granite-embedding-278m-multilingual`, `nomic-embed-text-v1.5` или другую многоязычную модель.
3. Запустите Local Server.
4. Проверьте, что адрес доступен на `http://127.0.0.1:1234/v1`.

## MCP-конфигурация

Claude Desktop, Cursor, OpenCode и другие MCP-клиенты обычно используют `mcpServers`:

```json
{
  "mcpServers": {
    "linza": {
      "command": "linza-mcp",
      "env": {
        "LINZA_VAULT": "/absolute/path/to/your-folder",
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
        "LINZA_VAULT": "/absolute/path/to/your-folder",
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
Проверьте LINZA через agent_workspace(action="doctor").
Проиндексируйте папку и покажите первые 3-5 карточек проверки.
```

Первый запуск лучше делать небольшим: диагностика, индекс, карта, несколько карточек. Не начинайте с массового применения.
