---
prev:
  text: Сценарии
  link: /nouz/use-cases
next:
  text: Как работает
  link: /nouz/how-it-works
---

# Быстрый старт

Запуск NOUZ за 5 минут.

## Установка

```bash
pip install nouz-mcp
```

## Настройка

### 1. Создайте config.yaml (опционально)

Без `config.yaml` сервер запустится в режиме **LUCA** (чистый граф). Для PRIZMA/SLOI создайте локальный конфиг:

```bash
cp config.template.yaml config.yaml
```

В Windows PowerShell:

```powershell
Copy-Item config.template.yaml config.yaml
```

Если MCP-клиент запускает сервер не из директории проекта, передайте путь явно через `NOUZ_CONFIG`.

Минимальный конфиг:

```yaml
mode: prizma  # luca | prizma | sloi
```

Для семантической классификации добавьте домены (`etalons`, эталонные тексты) — полные примеры → [Конфигурация](/nouz/configuration).

В терминах NOUZ домен, или ядро, — это крупная область базы: продукт, разработка, процессы, личные заметки или другая ваша рамка. `sign` — короткий код домена, а `artifact_sign` — короткий код типа материала: заметка, лог, источник, спецификация.

### 2. Укажите путь к папке базы

```bash
export OBSIDIAN_ROOT=/path/to/your/obsidian-vault
```

### 3. Подключите провайдер эмбеддингов (для PRIZMA/SLOI)

Любой OpenAI-совместимый API: LM Studio, Ollama или облачный провайдер.

```bash
export EMBED_API_URL=http://127.0.0.1:1234/v1
export EMBED_MODEL=nomic-embed-text
```

### 4. Подключите к ИИ-клиенту

Добавьте в MCP-конфигурацию (Claude Desktop, Cursor, OpenCode и др.):

```json
{
  "mcpServers": {
    "nouz": {
      "command": "nouz-mcp",
      "env": {
        "OBSIDIAN_ROOT": "/path/to/vault",
        "EMBED_API_URL": "http://127.0.0.1:1234/v1"
      }
    }
  }
}
```

## Запуск

```bash
nouz-mcp
```

```
[INFO] Indexing database on startup...
[INFO] Indexed: 42 files, errors: 0
[INFO] Core etalons loaded from DB: ['S', 'D', 'E']
[INFO] NOUZ MCP Server v3.0.3 started
```

## Первые шаги

Когда NOUZ подключён, ИИ-ассистент использует инструменты напрямую:

```python
# Классификация новой заметки: знак домена, тип материала, мосты
suggest_metadata("Новая заметка.md")
# → {sign: "E", artifact_sign: "n", level: 4, bridges: [...]}

# Графовый контекст заметки
get_parents("Новая заметка.md")
get_children("Новая заметка.md")

# Пересчитать знаки по всему хранилищу
recalc_signs()
recalc_core_mix()
```

## Какой режим выбрать

| Если нужно | Режим |
| ---------- | ----- |
| Дать агенту граф, родителей, детей и навигацию без эмбеддингов | **LUCA** |
| Искать семантические связи, дрифт и похожие материалы | **PRIZMA** |
| Держать строгую пятиуровневую структуру с проверкой иерархии | **SLOI** |

## Безопасный первый запуск

Начните с индексации и чтения: `index_all`, `list_files`, `read_file`, `get_parents`, `get_children`. Эти действия помогают увидеть состояние базы без массовых правок.

Для изменений используйте предложения и предпросмотр: `suggest_metadata`, `suggest_parents`, `process_orphans(dry_run=true)`. Когда результат понятен, можно записывать только YAML через `update_metadata`, не меняя текст заметки.

## Простой старт

Начните с режима **LUCA** — без эмбеддингов:

```yaml
mode: luca
```

Вы получаете полный DAG: иерархические связи, навигацию по графу и локальный индекс. Семантику можно добавить позже — переключением на PRIZMA или SLOI.

## Требования

- Python 3.10+
- Obsidian-хранилище или любая папка с `.md` файлами
- SQLite-сервер не нужен: Python включает `sqlite3`, а пакет ставит `aiosqlite`
- LM Studio, Ollama или OpenAI-совместимый API (опционально, для PRIZMA/SLOI)
