---
prev:
  text: Инструменты MCP
  link: /nouz/tools
next:
  text: Безопасность
  link: /nouz/safety
---

# Конфигурация

NOUZ ищет `config.yaml` в таком порядке: путь из `NOUZ_CONFIG`, текущая рабочая директория, затем директория установленного сервера. Для режима LUCA файл необязателен — сервер стартует с базовыми настройками.

Без `config.yaml` сервер работает в режиме **LUCA** (чистый граф).

## Минимальный конфиг

Из исходников:

```bash
cp config.template.yaml config.yaml
```

В Windows PowerShell:

```powershell
Copy-Item config.template.yaml config.yaml
```

```yaml
mode: prizma  # luca | prizma | sloi
```

Положите файл в рабочую директорию проекта или передайте абсолютный путь через `NOUZ_CONFIG`. Этого достаточно, чтобы включить PRIZMA; для доменной классификации добавьте `etalons` из полного примера ниже.

## Полный конфиг

```yaml
# Режим работы: luca | prizma | sloi
mode: prizma

# meta_root: якорная заметка уровня 0.
# Полезна для больших баз; для старта можно оставить пустой.
# Исключается из всех семантических операций.
meta_root: ""

# Семантические эталоны — описания доменов для классификации.
# Каждый эталон: 2-3 предложения предметным языком домена.
# Избегайте общих слов, которые встречаются в нескольких доменах.
etalons:
  - sign: S
    name: Systems Analysis
    text: >
      Methodology for analysing complex objects: feedback loops,
      emergent properties, self-regulation, bifurcation points.
      Cybernetics, synergetics, dissipative structures, catastrophe
      theory, autopoiesis — tools for understanding how the whole
      exceeds the sum of its parts. Not data and not code — a way
      of thinking about how parts form a whole and why systems
      behave non-linearly.
  - sign: D
    name: Data & Science
    text: >
      Physics and cosmology: from subatomic particles to the large-scale
      structure of the Universe. Lagrangians, curvature tensors, scattering
      cross-sections, quarks, bosons, fermions, plasma, vacuum fluctuations,
      cosmic microwave background, cosmological constant, decoherence.
      Pure science about the nature of matter, energy and spacetime.
  - sign: E
    name: Engineering
    text: >
      Software engineering, machine learning and infrastructure: writing
      and debugging code, deployment, containerisation, neural networks,
      inference, tokenisation, data serialisation, microservices, CI/CD,
      automated testing, refactoring, Git, Docker, Kubernetes, APIs.
      The practical discipline of building computational systems from
      architecture to production.

# Уровни иерархии.
# Значения технически настраиваются, но стандарт L1-L5 лучше оставлять как есть:
# документация, примеры и режим SLOI рассчитаны именно на эту шкалу.
levels:
  core: 1
  pattern: 2
  module: 3
  quant: 4
  artifact: 5

# Пороги классификации и связей
thresholds:
  # Минимальная разница между max и min косинусом для присвоения знака.
  # Если spread < sign_spread → различие между доменами слишком слабое.
  sign_spread: 0.05

  # Минимальный абсолютный косинус до ближайшего домена.
  # Если max_cosine >= confident_cosine → sign_source = "auto" (надёжный).
  # Если max_cosine < confident_cosine → sign_source = "weak_auto" (лучшая догадка,
  #   мосты в тот же домен НЕ блокируются).
  confident_cosine: 0.6

  # Минимальный нормализованный % для включения домена в составной знак.
  # После spread-нормализации: если adjusted_score / total * 100 >= threshold,
  # домен включается. Позволяет составные знаки вроде "SE" при двух доменах ≥ 30%.
  pattern_second_sign_threshold: 30.0

# Минимальный косинус для предложения семантического моста.
  # Предлагается только между заметками с разными доменами (cross-domain).
  semantic_bridge_threshold: 0.55

# Минимальный косинус для авто-привязки к родителю.
  # Используется в process_orphans и add_entity при auto_parents=true.
  # Сырой косинус (без бонуса за тот же домен) — гарантирует осмысленную близость.
  parent_link_threshold: 0.55

  # Порог надёжности после spread-нормализации.
  # Если доминантный домен >= confident_spread% → sign_source = "auto".
  # Ниже → sign_source = "weak_auto" (мосты не блокируются).
  confident_spread: 60.0

# Типы артефактов. Это справочник знаков; для эмбеддингов используются эталоны выше.
# L5 получает artifact_sign по эвристике содержимого.
# L4 может включать artifact_sign как часть составного знака.
# Публичная конвенция: домены — заглавные коды (S/D/E),
# типы материала — строчные коды (n/c/r/l/u/h/s).
# Коды можно заменить, если они короткие и не конфликтуют с доменами.
# Если нужно, к любому типу можно добавить keywords: сервер будет
# использовать эти слова вместо встроенной RU/EN эвристики.
artifact_signs:
  - sign: n
    name: Note
    text: "Краткая заметка, наблюдение, мысль на полях."
  - sign: c
    name: Concept
    text: "Определение, понятие, описание сущности."
  - sign: r
    name: Reference
    text: "Внешний источник, документация, ссылка, цитата."
  - sign: l
    name: Log
    text: "Хроника событий, запись сессии, лог диалога."
  - sign: u
    name: Update
    text: "Обновление, заметка о релизе, запись changelog."
  - sign: h
    name: Hypothesis
    text: "Гипотеза, допущение, предварительная версия."
  - sign: s
    name: Specification
    text: "Техническая спецификация, инструкция, требования."

# Дополнительные символы для парсинга имён файлов (опционально).
# Только для извлечения знаков из имён, НЕ для классификации.
sign_chars: ""
```

## Профили (опционально)

Для переключения между наборами эталонов через `PROFILE`:

```yaml
mode: prizma
profiles:
  default:
    mode: prizma
    etalons: []
  team:
    mode: prizma
    etalons:
      - sign: P
        name: Product
        text: >
          Product decisions, roadmap notes, user feedback,
          requirements, release planning...
```

```bash
export PROFILE=team
```

## Параметры

### `mode`

| Значение | Описание |
|----------|----------|
| `luca` | Чистый граф. Только YAML-блоки и связи. Эмбеддинги не нужны. Режим по умолчанию. |
| `prizma` | Семантика + граф. Эмбеддинги классифицируют заметки по доменам. Гибкая иерархия. |
| `sloi` | Строгая 5-уровневая иерархия с валидацией. Требует эмбеддинги. Пропуск уровня = ошибка. |

### `etalons`

Список доменов. Каждый эталон содержит:

- **`sign`** — короткий код домена. В примере используются `S`, `D`, `E`, но можно выбрать другие буквы или знаки, если они последовательно указаны в конфиге и не конфликтуют с `artifact_signs`.
- **`name`** — название
- **`text`** — описательный текст 2–3 предложения. Основа классификации. Пишите предметным языком вашего домена, используйте доменный жаргон. Избегайте слов, которые встречаются в нескольких доменах одновременно.

<div class="etalon-note">
  <strong>Качество эталонов</strong>
  <p>S/D/E выше — только стартовый пример трёх хорошо различимых доменов. Сами домены лучше выбирать под вашу базу: обычно хватает 2–4 областей с плотным предметным языком и ясными границами между соседними темами.</p>
  <p>После изменения эталонов запустите <code>calibrate_cores</code> и проверьте попарные косинусы. Сырые косинусы у трансформерных моделей обычно высокие (0.6-0.75) из-за анизотропии; значения после центрирования должны быть заметно ниже сырых и различаться между парами. Если пары выглядят почти одинаково, усилите специфику доменов и уберите общие слова. Подробно: <a href="/nouz/etalon-quality">Качество эталонов</a>.</p>
</div>

### `artifact_signs`

Справочник типов материала для L5-артефактов. Это не эталоны для эмбеддингов: сервер выбирает `artifact_sign` эвристически по структуре и словам в тексте. Например, лог получает `l`, спецификация — `s`, гипотеза — `h`. На старте этот справочник обычно можно оставить как есть. Если меняете коды, держите их короткими и не используйте те же символы, что у доменов. Для своих языков и форматов можно добавить `keywords` к нужному типу материала.

### `thresholds`

| Параметр | По умолчанию | Описание |
|----------|-------------|----------|
| `sign_spread` | 0.05 | Минимальная разница max/min косинуса для классификации |
| `confident_cosine` | 0.6 | Абсолютный порог косинуса к ближайшему домену |
| `pattern_second_sign_threshold` | 30.0 | Минимальный % для составного знака |
| `semantic_bridge_threshold` | 0.55 | Порог семантических мостов |
| `parent_link_threshold` | 0.55 | Порог авто-привязки к родителю |
| `confident_spread` | 60.0 | Порог надёжности классификации (%) |

## Переменные окружения

| Переменная | Обязательна | Описание |
|------------|-------------|----------|
| `OBSIDIAN_ROOT` | Да | Абсолютный путь к папке базы |
| `NOUZ_CONFIG` | Нет | Абсолютный путь к `config.yaml`; если не задан, сервер ищет файл в текущей директории |
| `PROFILE` | Нет | Имя профиля из config.yaml (по умолчанию: `default`) |
| `EMBED_PROVIDER` | Нет | OpenAI-совместимый провайдер или `ollama` (по умолчанию: `openai`) |
| `EMBED_ENABLED` | Нет | `true` или `false` (по умолчанию: `true`) |
| `EMBED_API_URL` | Для prizma/sloi | URL OpenAI-совместимого API эмбеддингов |
| `EMBED_MODEL` | Нет | Имя модели эмбеддингов |
| `EMBED_API_KEY` | Нет | API-ключ для облачных провайдеров |
| `LLM_API_URL` | Нет | URL для LLM (извлечение тегов) |
| `LLM_MODEL` | Нет | Имя LLM-модели |

```bash
export OBSIDIAN_ROOT=/path/to/vault
export EMBED_API_URL=http://127.0.0.1:1234/v1
export EMBED_MODEL=nomic-embed-text
```

## Совместимые провайдеры эмбеддингов

| Провайдер | URL | Примечание |
|-----------|-----|------------|
| LM Studio | `http://127.0.0.1:1234/v1` | Рекомендуется для локального запуска |
| Ollama | `http://127.0.0.1:11434` | Использует путь `/api/embeddings` |
| OpenAI | `https://api.openai.com/v1` | Добавьте `EMBED_API_KEY` |
| Любой OpenAI-совместимый API | — | Стандартный путь `/v1/embeddings` |
