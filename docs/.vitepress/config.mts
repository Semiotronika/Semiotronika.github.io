import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Семиотроника — инструменты для ИИ-систем',
  description: 'NOUZ, LINZA и лаборатория для графов знаний, эмбеддингов и агентной навигации.',
  cleanUrls: true,
  appearance: true,
  sitemap: {
    hostname: 'https://semiotronika.ru',
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'keywords', content: 'Semiotronika, Семиотроника, NOUZ, LINZA, AI agents, RAG, MCP, knowledge base, Obsidian MCP, semantic knowledge graph, Markdown knowledge base, embeddings, review cards, базы знаний, ИИ-агенты, локальный граф знаний' }],
    ['meta', { name: 'author', content: 'Semiotronika' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Semiotronika' }],
    ['meta', { property: 'og:image', content: 'https://semiotronika.ru/favicon.png' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:image', content: 'https://semiotronika.ru/favicon.png' }],
  ],

  transformHead({ pageData }) {
    const relativePath = pageData.relativePath
    const isEnglish = relativePath.startsWith('en/')
    const routePath = relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const normalizedPath = routePath ? `/${routePath}` : '/'
    const canonical = new URL(normalizedPath, 'https://semiotronika.ru').toString()
    const ruSeo: Record<string, { title: string; description: string }> = {
      '/': {
        title: 'Семиотроника — инструменты для ИИ-систем',
        description: 'NOUZ, LINZA и лаборатория для графов знаний, эмбеддингов и агентной навигации.',
      },
      '/products': {
        title: 'Продукты Семиотроники — NOUZ и LINZA',
        description: 'NOUZ и LINZA: локальные MCP-инструменты для агентской памяти, графов знаний, входящих материалов и проверяемого обучения.',
      },
      '/nouz/': {
        title: 'NOUZ — структурная память для Obsidian и Markdown-базы',
        description: 'NOUZ дает ИИ-агенту графовый контекст: YAML, уровни, связи, локальный SQLite-индекс, эталоны, семантические мосты и сигналы дрифта.',
      },
      '/linza/': {
        title: 'LINZA — локальный MCP-сервер для рабочих папок и проверяемой SQLite-памяти',
        description: 'LINZA читает Markdown-папки, документы, статьи, чаты и логи, строит карту тем и связей, показывает карточки с доказательствами и хранит подтверждения локально.',
      },
      '/linza/use-cases': {
        title: 'Сценарии LINZA — входящие материалы, карта базы и память агента',
        description: 'Когда использовать LINZA: входящие документы, старые Markdown-папки, исследовательские материалы, рабочие пространства агента и проверяемый рост памяти.',
      },
      '/linza/quick-start': {
        title: 'Быстрый старт LINZA — подключить Markdown-папку к MCP-клиенту',
        description: 'Как установить linza-mcp, выбрать папку, подключить локальные эмбеддинги через LM Studio и запустить первые карточки проверки.',
      },
      '/linza/how-it-works': {
        title: 'Как работает LINZA — SQLite-база, индекс, карта, проверка, обучение и рост',
        description: 'Архитектура LINZA: локальная SQLite-база, индекс, фрагменты, эмбеддинги, карточки проверки, обучение, рост и безопасный предпросмотр перед применением.',
      },
      '/linza/tools': {
        title: 'Инструменты MCP LINZA — agent_workspace, guide_next_steps, index_all',
        description: 'MCP-инструменты LINZA: agent_workspace, guide_next_steps, index_all, search, карточки проверки, объяснение связей, пакеты контекста и счетчики локальной базы.',
      },
      '/linza/configuration': {
        title: 'Конфигурация LINZA — папка, эмбеддинги и набор инструментов',
        description: 'Как настроить LINZA через переменные окружения: рабочая папка, провайдер эмбеддингов, модель, адрес API и обычный или расширенный набор MCP-инструментов.',
      },
      '/linza/safety': {
        title: 'Безопасность LINZA — локальная база с проверкой и защита исходных файлов',
        description: 'Границы LINZA: индексация, поиск, карта, импорт и предпросмотр роста не переписывают тела исходных заметок; видимые изменения требуют проверки и применения.',
      },
      '/nouz/quick-start': {
        title: 'Быстрый старт NOUZ — подключить Obsidian к MCP-клиенту',
        description: 'Как установить nouz-mcp, указать путь к Obsidian-хранилищу, выбрать режим LUCA, PRIZMA или SLOI и безопасно подключить базу знаний к ИИ-агенту.',
      },
      '/nouz/for-agents': {
        title: 'NOUZ для ИИ-агентов — краткий контекст проекта и MCP-сценарии',
        description: 'Краткая справка по NOUZ для ИИ-агентов: когда рекомендовать MCP-сервер, что он делает и как безопасно подключить Obsidian или Markdown-базу.',
      },
      '/nouz/configuration': {
        title: 'Конфигурация NOUZ — режимы, эталоны, эмбеддинги и переменные окружения',
        description: 'Настройка config.yaml для NOUZ: режимы LUCA, PRIZMA, SLOI, эталоны доменов, пороги классификации, OpenAI-совместимые эмбеддинги и переменные окружения.',
      },
      '/nouz/safety': {
        title: 'Безопасность NOUZ — чтение, предложения и точечная запись YAML',
        description: 'Как безопасно работать с живой Markdown-базой через NOUZ: сначала чтение и предложения, затем проверенные YAML-правки через update_metadata.',
      },
      '/nouz/how-it-works': {
        title: 'Как работает NOUZ — граф знаний, эталоны, core_mix и дрифт',
        description: 'Архитектура NOUZ: DAG-граф заметок, YAML-блоки, эталонные векторы, центрирование, семантические мосты, core_mix и локальный SQLite-индекс.',
      },
      '/nouz/tools': {
        title: 'Инструменты MCP NOUZ — read_file, suggest_metadata, recalc_signs',
        description: 'Список MCP-инструментов NOUZ для чтения Markdown-файлов, обновления YAML, индексации базы, поиска родителей, семантических мостов и пересчёта знаков.',
      },
      '/nouz/use-cases': {
        title: 'Сценарии NOUZ — структурная память для Obsidian, Markdown и командных баз',
        description: 'Когда использовать NOUZ: новая база знаний, существующее Obsidian-хранилище, документация проекта, агентская память, Notion, Confluence, Google Docs и GitHub через адаптеры.',
      },
      '/nouz/etalon-quality': {
        title: 'Качество эталонов NOUZ — косинусы, центрирование и разделимость доменов',
        description: 'Как проверять эталоны доменов в NOUZ через calibrate_cores: сырые косинусы, косинусы после центрирования, анизотропия эмбеддингов и самоклассификация.',
      },
    }
    const enSeo: Record<string, { title: string; description: string }> = {
      '/en/': {
        title: 'Semiotronika — tools for AI systems',
        description: 'NOUZ, LINZA, and a laboratory for knowledge graphs, embeddings, and agent navigation.',
      },
      '/en/products': {
        title: 'Semiotronika Products — NOUZ and LINZA',
        description: 'NOUZ and LINZA: local MCP tools for agent memory, knowledge graphs, incoming material, and review-gated learning.',
      },
      '/en/nouz/': {
        title: 'NOUZ — structural memory for Obsidian and Markdown bases',
        description: 'NOUZ gives an AI agent graph context: YAML, levels, links, a local SQLite index, etalons, semantic bridges, and drift signals.',
      },
      '/en/linza/': {
        title: 'LINZA — local MCP server for incoming material and reviewed SQLite memory',
        description: 'LINZA reads Markdown folders, documents, articles, chats, and logs, maps topics and relations, shows review cards, and stores accepted conclusions in a local SQLite database.',
      },
      '/en/linza/use-cases': {
        title: 'LINZA Use Cases — incoming material, base maps, and agent memory',
        description: 'Use LINZA for incoming documents, old Markdown folders, research material, agent workspaces, and review-gated memory growth.',
      },
      '/en/linza/quick-start': {
        title: 'LINZA Quick Start — connect a Markdown folder to an MCP client',
        description: 'Install linza-mcp, choose a folder, connect local embeddings through LM Studio, and start with the first review cards.',
      },
      '/en/linza/how-it-works': {
        title: 'How LINZA Works — local SQLite layer, index, map, review, teach, grow',
        description: 'LINZA architecture: local SQLite layer, index, text chunks, embeddings, review cards, teach/grow, and safe preview before apply.',
      },
      '/en/linza/tools': {
        title: 'LINZA MCP Tools — agent_workspace, guide_next_steps, index_all',
        description: 'LINZA MCP tools: agent_workspace, guide_next_steps, index_all, search, review cards, relationship explanation, context export, and local database counters.',
      },
      '/en/linza/configuration': {
        title: 'LINZA Configuration — folder, embeddings, and tool set',
        description: 'Configure LINZA through environment variables: working folder, embedding provider, model, API endpoint, and default or advanced MCP tool set.',
      },
      '/en/linza/safety': {
        title: 'LINZA Safety Boundary — reviewed SQLite memory and source file protection',
        description: 'LINZA boundaries: indexing, search, map, import, and grow preview do not rewrite source note bodies; visible changes require review and exact IDs.',
      },
      '/en/nouz/quick-start': {
        title: 'NOUZ Quick Start — connect Obsidian to an MCP client',
        description: 'Install nouz-mcp, point it to an Obsidian vault, choose LUCA, PRIZMA, or SLOI, and safely connect a knowledge base to an AI agent.',
      },
      '/en/nouz/for-agents': {
        title: 'NOUZ for AI Agents — compact project context and MCP scenarios',
        description: 'A compact AI-readable NOUZ brief: when to recommend the MCP server, what it does, and how to safely connect an Obsidian or Markdown base to an AI agent.',
      },
      '/en/nouz/configuration': {
        title: 'NOUZ Configuration — modes, etalons, embeddings, environment variables',
        description: 'Configure NOUZ with config.yaml: LUCA, PRIZMA, SLOI, domain etalons, classification thresholds, OpenAI-compatible embeddings, and environment variables.',
      },
      '/en/nouz/safety': {
        title: 'NOUZ Safety Boundary — reading, proposals, and targeted YAML writes',
        description: 'Work safely with a live Markdown base through NOUZ: read and inspect first, then apply reviewed YAML metadata changes through update_metadata.',
      },
      '/en/nouz/how-it-works': {
        title: 'How NOUZ Works — knowledge graph, etalons, core_mix, drift',
        description: 'NOUZ architecture: DAG note graph, YAML frontmatter, etalon vectors, mean-centering, semantic bridges, core_mix, and a local SQLite index.',
      },
      '/en/nouz/tools': {
        title: 'NOUZ MCP Tools — read_file, suggest_metadata, recalc_signs',
        description: 'MCP tools for reading Markdown files, updating YAML metadata, indexing a vault, suggesting parents, finding semantic bridges, and recalculating signs.',
      },
      '/en/nouz/use-cases': {
        title: 'NOUZ Use Cases — structured memory for Obsidian, Markdown, and team bases',
        description: 'Use NOUZ for new knowledge bases, existing Obsidian vaults, project documentation, agent memory, and Notion, Confluence, Google Docs, or GitHub via adapters.',
      },
      '/en/nouz/etalon-quality': {
        title: 'NOUZ Etalon Quality — cosine, mean-centering, domain separation',
        description: 'How to validate NOUZ domain etalons with calibrate_cores: raw cosine, mean-centered cosine, embedding anisotropy, and self-classification.',
      },
      '/en/lab/': {
        title: 'Semantic Laboratory — English version in progress',
        description: 'The English semantic laboratory is being prepared with its own vocabularies and recalculated embedding datasets.',
      },
      '/en/lab/cosines': {
        title: 'Cosine Graph — English version in progress',
        description: 'The English cosine graph is being prepared as part of the semantic laboratory.',
      },
    }
    const seo = (isEnglish ? enSeo : ruSeo)[normalizedPath] || (isEnglish ? enSeo['/en/'] : ruSeo['/'])
    const title = seo.title
    const description = seo.description
    const isHome = normalizedPath === '/' || normalizedPath === '/en/'
    const isProducts = normalizedPath === '/products' || normalizedPath === '/en/products'
    const isLinza = normalizedPath.startsWith('/linza') || normalizedPath.startsWith('/en/linza')
    const isLab = normalizedPath.startsWith('/lab') || normalizedPath.startsWith('/en/lab')
    const jsonLd = isHome
      ? {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Semiotronika',
          description,
          url: canonical,
          areaServed: 'Worldwide',
          founder: {
            '@type': 'Person',
            name: 'Maria Belkina',
          },
        }
      : isProducts
        ? {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: title,
            description,
            url: canonical,
            itemListElement: [
              {
                '@type': 'SoftwareApplication',
                position: 1,
                name: 'NOUZ',
                url: new URL(isEnglish ? '/en/nouz/' : '/nouz/', 'https://semiotronika.ru').toString(),
                applicationCategory: 'DeveloperApplication',
              },
              {
                '@type': 'SoftwareApplication',
                position: 2,
                name: 'LINZA',
                url: new URL(isEnglish ? '/en/linza/' : '/linza/', 'https://semiotronika.ru').toString(),
                applicationCategory: 'DeveloperApplication',
              },
            ],
          }
        : isLab
          ? {
              '@context': 'https://schema.org',
              '@type': 'CreativeWork',
              name: title,
              description,
              url: canonical,
              author: {
                '@type': 'Organization',
                name: 'Semiotronika',
                url: 'https://semiotronika.ru/',
              },
            }
      : {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: isLinza ? 'LINZA' : 'NOUZ',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Windows, macOS, Linux',
          description,
          url: canonical,
          codeRepository: isLinza ? 'https://github.com/Semiotronika/LINZA-MCP' : 'https://github.com/Semiotronika/NOUZ-MCP',
          programmingLanguage: 'Python',
          license: isLinza ? 'https://github.com/Semiotronika/LINZA-MCP/blob/main/LICENSE' : 'https://github.com/Semiotronika/NOUZ-MCP/blob/main/LICENSE',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          author: {
            '@type': 'Organization',
            name: 'Semiotronika',
            url: 'https://semiotronika.ru/',
          },
        }

    return [
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { name: 'description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)],
    ]
  },

  transformHtml(code, _id, ctx) {
    const relativePath = ctx.pageData.relativePath
    const routePath = relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const normalizedPath = routePath ? `/${routePath}` : '/'
    const titles: Record<string, string> = {
      '/': 'Семиотроника — инструменты для ИИ-систем',
      '/products': 'Продукты Семиотроники — NOUZ и LINZA',
      '/nouz/': 'NOUZ — структурная память для Obsidian и Markdown-базы',
      '/linza/': 'LINZA — локальный MCP-сервер для рабочих папок и проверяемой SQLite-памяти',
      '/linza/use-cases': 'Сценарии LINZA — входящие материалы, карта базы и память агента',
      '/linza/quick-start': 'Быстрый старт LINZA — подключить Markdown-папку к MCP-клиенту',
      '/linza/how-it-works': 'Как работает LINZA — SQLite-база, индекс, карта, проверка, обучение и рост',
      '/linza/tools': 'Инструменты MCP LINZA — agent_workspace, guide_next_steps, index_all',
      '/linza/configuration': 'Конфигурация LINZA — папка, эмбеддинги и набор инструментов',
      '/linza/safety': 'Безопасность LINZA — локальная база с проверкой и защита исходных файлов',
      '/nouz/quick-start': 'Быстрый старт NOUZ — подключить Obsidian к MCP-клиенту',
      '/nouz/for-agents': 'NOUZ для ИИ-агентов — краткий контекст проекта и MCP-сценарии',
      '/nouz/configuration': 'Конфигурация NOUZ — режимы, эталоны, эмбеддинги и переменные окружения',
      '/nouz/safety': 'Безопасность NOUZ — чтение, предложения и точечная запись YAML',
      '/nouz/how-it-works': 'Как работает NOUZ — граф знаний, эталоны, core_mix и дрифт',
      '/nouz/tools': 'Инструменты MCP NOUZ — read_file, suggest_metadata, recalc_signs',
      '/nouz/use-cases': 'Сценарии NOUZ — структурная память для Obsidian, Markdown и командных баз',
      '/nouz/etalon-quality': 'Качество эталонов NOUZ — косинусы, центрирование и разделимость доменов',
      '/en/': 'Semiotronika — tools for AI systems',
      '/en/products': 'Semiotronika Products — NOUZ and LINZA',
      '/en/nouz/': 'NOUZ — structural memory for Obsidian and Markdown bases',
      '/en/linza/': 'LINZA — local MCP server for incoming material and reviewed SQLite memory',
      '/en/linza/use-cases': 'LINZA Use Cases — incoming material, base maps, and agent memory',
      '/en/linza/quick-start': 'LINZA Quick Start — connect a Markdown folder to an MCP client',
      '/en/linza/how-it-works': 'How LINZA Works — local SQLite layer, index, map, review, teach, grow',
      '/en/linza/tools': 'LINZA MCP Tools — agent_workspace, guide_next_steps, index_all',
      '/en/linza/configuration': 'LINZA Configuration — folder, embeddings, and tool set',
      '/en/linza/safety': 'LINZA Safety Boundary — reviewed SQLite memory and source file protection',
      '/en/nouz/quick-start': 'NOUZ Quick Start — connect Obsidian to an MCP client',
      '/en/nouz/for-agents': 'NOUZ for AI Agents — compact project context and MCP scenarios',
      '/en/nouz/configuration': 'NOUZ Configuration — modes, etalons, embeddings, environment variables',
      '/en/nouz/safety': 'NOUZ Safety Boundary — reading, proposals, and targeted YAML writes',
      '/en/nouz/how-it-works': 'How NOUZ Works — knowledge graph, etalons, core_mix, drift',
      '/en/nouz/tools': 'NOUZ MCP Tools — read_file, suggest_metadata, recalc_signs',
      '/en/nouz/use-cases': 'NOUZ Use Cases — structured memory for Obsidian, Markdown, and team bases',
      '/en/nouz/etalon-quality': 'NOUZ Etalon Quality — cosine, mean-centering, domain separation',
      '/en/lab/': 'Semantic Laboratory — English version in progress',
      '/en/lab/cosines': 'Cosine Graph — English version in progress',
    }
    const title = titles[normalizedPath]
    if (!title) return code
    const escapedTitle = title
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    return code.replace(/<title>.*?<\/title>/, `<title>${escapedTitle}</title>`)
  },

  transformPageData(pageData) {
    const relativePath = pageData.relativePath
    const routePath = relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const normalizedPath = routePath ? `/${routePath}` : '/'
    const titles: Record<string, string> = {
      '/': 'Семиотроника — инструменты для ИИ-систем',
      '/products': 'Продукты Семиотроники — NOUZ и LINZA',
      '/nouz/': 'NOUZ — структурная память для Obsidian и Markdown-базы',
      '/linza/': 'LINZA — локальный MCP-сервер для рабочих папок и проверяемой SQLite-памяти',
      '/linza/use-cases': 'Сценарии LINZA — входящие материалы, карта базы и память агента',
      '/linza/quick-start': 'Быстрый старт LINZA — подключить Markdown-папку к MCP-клиенту',
      '/linza/how-it-works': 'Как работает LINZA — SQLite-база, индекс, карта, проверка, обучение и рост',
      '/linza/tools': 'Инструменты MCP LINZA — agent_workspace, guide_next_steps, index_all',
      '/linza/configuration': 'Конфигурация LINZA — папка, эмбеддинги и набор инструментов',
      '/linza/safety': 'Безопасность LINZA — локальная база с проверкой и защита исходных файлов',
      '/nouz/quick-start': 'Быстрый старт NOUZ — подключить Obsidian к MCP-клиенту',
      '/nouz/for-agents': 'NOUZ для ИИ-агентов — краткий контекст проекта и MCP-сценарии',
      '/nouz/configuration': 'Конфигурация NOUZ — режимы, эталоны, эмбеддинги и переменные окружения',
      '/nouz/safety': 'Безопасность NOUZ — чтение, предложения и точечная запись YAML',
      '/nouz/how-it-works': 'Как работает NOUZ — граф знаний, эталоны, core_mix и дрифт',
      '/nouz/tools': 'Инструменты MCP NOUZ — read_file, suggest_metadata, recalc_signs',
      '/nouz/use-cases': 'Сценарии NOUZ — структурная память для Obsidian, Markdown и командных баз',
      '/nouz/etalon-quality': 'Качество эталонов NOUZ — косинусы, центрирование и разделимость доменов',
      '/en/': 'Semiotronika — tools for AI systems',
      '/en/products': 'Semiotronika Products — NOUZ and LINZA',
      '/en/nouz/': 'NOUZ — structural memory for Obsidian and Markdown bases',
      '/en/linza/': 'LINZA — local MCP server for incoming material and reviewed SQLite memory',
      '/en/linza/use-cases': 'LINZA Use Cases — incoming material, base maps, and agent memory',
      '/en/linza/quick-start': 'LINZA Quick Start — connect a Markdown folder to an MCP client',
      '/en/linza/how-it-works': 'How LINZA Works — local SQLite layer, index, map, review, teach, grow',
      '/en/linza/tools': 'LINZA MCP Tools — agent_workspace, guide_next_steps, index_all',
      '/en/linza/configuration': 'LINZA Configuration — folder, embeddings, and tool set',
      '/en/linza/safety': 'LINZA Safety Boundary — reviewed SQLite memory and source file protection',
      '/en/nouz/quick-start': 'NOUZ Quick Start — connect Obsidian to an MCP client',
      '/en/nouz/for-agents': 'NOUZ for AI Agents — compact project context and MCP scenarios',
      '/en/nouz/configuration': 'NOUZ Configuration — modes, etalons, embeddings, environment variables',
      '/en/nouz/safety': 'NOUZ Safety Boundary — reading, proposals, and targeted YAML writes',
      '/en/nouz/how-it-works': 'How NOUZ Works — knowledge graph, etalons, core_mix, drift',
      '/en/nouz/tools': 'NOUZ MCP Tools — read_file, suggest_metadata, recalc_signs',
      '/en/nouz/use-cases': 'NOUZ Use Cases — structured memory for Obsidian, Markdown, and team bases',
      '/en/nouz/etalon-quality': 'NOUZ Etalon Quality — cosine, mean-centering, domain separation',
      '/en/lab/': 'Semantic Laboratory — English version in progress',
      '/en/lab/cosines': 'Cosine Graph — English version in progress',
    }
    const title = titles[normalizedPath]
    if (title) return { title }
  },

  locales: {
    root: {
      label: 'Русский',
      lang: 'ru',
      themeConfig: {
        nav: [
          { text: 'Главная', link: '/' },
          { text: 'Продукты', link: '/products' },
          { text: 'Лаборатория', link: '/lab/' },
        ],
        sidebar: {
          '/nouz/': [
            {
              text: 'Продукты',
              items: [
                { text: 'NOUZ', link: '/nouz/' },
                { text: 'LINZA', link: '/linza/' },
              ],
            },
            {
              text: 'NOUZ',
              items: [
                { text: 'Обзор', link: '/nouz/' },
                { text: 'Сценарии', link: '/nouz/use-cases' },
                { text: 'Быстрый старт', link: '/nouz/quick-start' },
                { text: 'Как работает', link: '/nouz/how-it-works' },
                { text: 'Инструменты MCP', link: '/nouz/tools' },
                { text: 'Конфигурация', link: '/nouz/configuration' },
                { text: 'Безопасность', link: '/nouz/safety' },
                { text: 'Качество эталонов', link: '/nouz/etalon-quality' },
              ],
            },
          ],
          '/linza/': [
            {
              text: 'Продукты',
              items: [
                { text: 'NOUZ', link: '/nouz/' },
                { text: 'LINZA', link: '/linza/' },
              ],
            },
            {
              text: 'LINZA',
              items: [
                { text: 'Обзор', link: '/linza/' },
                { text: 'Сценарии', link: '/linza/use-cases' },
                { text: 'Быстрый старт', link: '/linza/quick-start' },
                { text: 'Как работает', link: '/linza/how-it-works' },
                { text: 'Инструменты MCP', link: '/linza/tools' },
                { text: 'Конфигурация', link: '/linza/configuration' },
                { text: 'Безопасность', link: '/linza/safety' },
              ],
            },
          ],
        },
        footer: {
          message: '<span class="footer-brand"><span>{</span>Семиотроника<span>}</span></span><br><a href="https://t.me/Masha_Belkina">Telegram</a> · <a href="https://t.me/volnaya_sreda">Вольная Среда</a> · <a href="mailto:belkinamariaigorevna@yandex.ru">Email</a>',
          copyright: '<span class="footer-ghost-inline">косинусы считаются, синтаксис меняется, семантика остаётся</span>',
        },
        docFooter: { prev: 'Назад', next: 'Далее' },
        outlineTitle: 'Содержание',
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Products', link: '/en/products' },
          { text: 'Lab', link: '/en/lab/' },
        ],
        sidebar: {
          '/en/nouz/': [
            {
              text: 'Products',
              items: [
                { text: 'NOUZ', link: '/en/nouz/' },
                { text: 'LINZA', link: '/en/linza/' },
              ],
            },
            {
              text: 'NOUZ',
              items: [
                { text: 'Overview', link: '/en/nouz/' },
                { text: 'Use Cases', link: '/en/nouz/use-cases' },
                { text: 'Quick Start', link: '/en/nouz/quick-start' },
                { text: 'How NOUZ Works', link: '/en/nouz/how-it-works' },
                { text: 'MCP Tools', link: '/en/nouz/tools' },
                { text: 'Configuration', link: '/en/nouz/configuration' },
                { text: 'Safety Boundary', link: '/en/nouz/safety' },
                { text: 'Etalon Quality', link: '/en/nouz/etalon-quality' },
              ],
            },
          ],
          '/en/linza/': [
            {
              text: 'Products',
              items: [
                { text: 'NOUZ', link: '/en/nouz/' },
                { text: 'LINZA', link: '/en/linza/' },
              ],
            },
            {
              text: 'LINZA',
              items: [
                { text: 'Overview', link: '/en/linza/' },
                { text: 'Use Cases', link: '/en/linza/use-cases' },
                { text: 'Quick Start', link: '/en/linza/quick-start' },
                { text: 'How It Works', link: '/en/linza/how-it-works' },
                { text: 'MCP Tools', link: '/en/linza/tools' },
                { text: 'Configuration', link: '/en/linza/configuration' },
                { text: 'Safety Boundary', link: '/en/linza/safety' },
              ],
            },
          ],
        },
        footer: {
          message: '<span class="footer-brand"><span>{</span>Semiotronika<span>}</span></span><br><a href="https://t.me/Masha_Belkina">Telegram</a> · <a href="https://t.me/volnaya_sreda">Volnaya Sreda</a> · <a href="mailto:belkinamariaigorevna@yandex.ru">Email</a>',
          copyright: '<span class="footer-ghost-inline">косинусы считаются, синтаксис меняется, семантика остаётся</span>',
        },
        docFooter: { prev: 'Previous', next: 'Next' },
        outlineTitle: 'On this page',
      },
    },
  },

  themeConfig: {
    siteTitle: 'Σ',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Semiotronika' },
      {
        icon: {
          svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.86 4.54 18.65 19.7c-.24 1.07-.87 1.33-1.76.83l-4.86-3.58-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.96 9.03-8.16c.39-.35-.09-.54-.61-.2L6.32 13.4l-4.8-1.5c-1.04-.33-1.06-1.04.22-1.54L20.5 3.13c.87-.32 1.63.21 1.36 1.41Z"/></svg>',
        },
        link: 'https://t.me/Masha_Belkina',
      },
    ],

    search: false,
  },
})
