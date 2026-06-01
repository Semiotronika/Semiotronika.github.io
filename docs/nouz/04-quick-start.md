---
prev:
  text: Проверка качества эталонов
  link: /nouz/etalon-quality
next:
  text: Справочник MCP-инструментов
  link: /nouz/tools-reference
---

# Быстрый старт

Если вы еще не настраивали семантические ядра, начните с LUCA: для него не нужны эмбеддинги и `config.yaml`.

Что понадобится:

- Python 3.10 или новее.
- Папка с Markdown-файлами: Obsidian vault, Logseq graph или обычная директория.
- MCP-клиент: Claude Desktop, Cursor, Opencode или другой клиент с поддержкой stdio MCP.
- Для PRIZMA/SLOI: локальный или OpenAI-compatible embedding endpoint.

---

## Установка

```bash
pip install nouz-mcp
```

Проверить установленную версию можно так:

```bash
python -c "import nouz_mcp; print(nouz_mcp.__version__)"
```

Сам сервер запускается командой:

```bash
nouz-mcp
```

В обычном терминале команда будет ждать MCP-сообщения по stdio. Это нормально: в рабочем режиме ее запускает MCP-клиент.

---

## Подключение к MCP-клиенту

Добавьте сервер в конфиг клиента:

```json
{
  "mcpServers": {
    "nouz": {
      "command": "nouz-mcp",
      "env": {
        "OBSIDIAN_ROOT": "/path/to/your/vault"
      }
    }
  }
}
```

Для Windows путь обычно выглядит так:

```json
{
  "mcpServers": {
    "nouz": {
      "command": "nouz-mcp",
      "env": {
        "OBSIDIAN_ROOT": "D:\\Knowledge\\Obsidian\\base"
      }
    }
  }
}
```

`OBSIDIAN_ROOT` указывает на корень вашей базы. Все пути, которые агент передает в инструменты NOUZ, считаются относительно этой папки.

---

## Первый запуск в LUCA

Если `config.yaml` не задан, сервер использует LUCA. Это режим простого графа без семантической классификации.

После подключения попросите агента:

1. Запустить `index_all`.
2. Посмотреть обзор через `list_files`.
3. Открыть несколько заметок через `read_file`.
4. Предложить первые `parents_meta` без изменения текста.

Пример минимальной разметки:

```yaml
---
type: artifact
level: 5
artifact_sign: l
parents:
  - '[[Входящие идеи]]'
parents_meta:
  - entity: Входящие идеи
    link_type: temporary
---
```

Такой файл уже виден агенту как часть графа, но его место можно уточнить позже.

---

## Переход к PRIZMA

PRIZMA включает семантические ядра, эмбеддинги, автоматические знаки, смысловые мосты и `core_mix`.

Создайте локальный `config.yaml`:

```yaml
mode: prizma

etalons:
  - sign: B
    name: Business
    text: >
      Business models, customers, market positioning, pricing,
      conversion, retention, sales funnels and product growth.
  - sign: E
    name: Engineering
    text: >
      Software architecture, code, infrastructure, deployment,
      debugging, integrations, APIs, tests and production systems.
```

В установленном пакете можно держать собственный `config.yaml` рядом с проектом или передавать абсолютный путь через `NOUZ_CONFIG`:

```json
{
  "mcpServers": {
    "nouz": {
      "command": "nouz-mcp",
      "env": {
        "OBSIDIAN_ROOT": "/path/to/your/vault",
        "NOUZ_CONFIG": "/absolute/path/to/config.yaml"
      }
    }
  }
}
```

Перед первым массовым пересчетом проверьте качество эталонов: [как читать `calibrate_cores` и `nouz-calc-etalons`](/nouz/etalon-quality).

---

## Эмбеддинги

Эта часть относится к PRIZMA и SLOI. В LUCA сервер работает как чистый граф: `index_all` обновляет SQLite-индекс файлов и связей, а retrieval-инструменты для чанков, поиска и embeddings не доступны.

Для LM Studio или другого OpenAI-compatible endpoint:

```json
{
  "EMBED_PROVIDER": "openai",
  "EMBED_API_URL": "http://127.0.0.1:1234/v1",
  "EMBED_MODEL": "text-embedding-nomic-embed-text-v1.5"
}
```

Для Ollama:

```json
{
  "EMBED_PROVIDER": "ollama",
  "EMBED_API_URL": "http://127.0.0.1:11434",
  "EMBED_MODEL": "nomic-embed-text"
}
```

После настройки выполните:

1. `calibrate_cores` — создать или обновить эталонные векторы.
2. `index_all` с `with_embeddings=true` — проиндексировать файлы и чанки.
3. `recalc_signs` — пересчитать автоматические знаки.
4. `recalc_core_mix` — обновить доменный профиль родительских узлов.

---

## Переход к SLOI

SLOI использует ту же семантику, что PRIZMA, но добавляет строгую проверку уровней.

```yaml
mode: sloi
```

В этом режиме `hierarchy` должна идти по соседним уровням: ядро, паттерн, модуль, квант, артефакт. Связи `derived_from`, `semantic`, `tag`, `analogy` и `temporary` не считаются структурным родительством.

---

## Read-only режим

Если нужно дать агенту доступ только на чтение:

```json
{
  "NOUZ_READ_ONLY": "true"
}
```

В этом режиме сервер скрывает и блокирует инструменты записи: `write_file`, `update_metadata`, `index_all`, `calibrate_cores`, `recalc_signs`, `recalc_core_mix`, `process_orphans`, `add_entity`.

Если нужен read-only режим, но можно обновлять SQLite-кэш при чтении, добавьте:

```json
{
  "NOUZ_CACHE_WRITE": "true"
}
```
