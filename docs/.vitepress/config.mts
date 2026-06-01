import { defineConfig } from 'vitepress'

const orderedPageRewrites: Record<string, string> = {
  'nouz/00-overview.md': 'nouz/index.md',
  'nouz/01-concepts/cores-patterns.md': 'nouz/concepts/cores-patterns.md',
  'nouz/01-concepts/modules-quanta.md': 'nouz/concepts/modules-quanta.md',
  'nouz/01-concepts/links.md': 'nouz/concepts/links.md',
  'nouz/02-use-cases.md': 'nouz/use-cases.md',
  'nouz/03-etalon-quality.md': 'nouz/etalon-quality.md',
  'nouz/04-quick-start.md': 'nouz/quick-start.md',
  'nouz/05-tools-reference.md': 'nouz/tools-reference.md',
  'linza/00-overview.md': 'linza/index.md',
  'linza/01-how-it-works.md': 'linza/how-it-works.md',
  'linza/02-quick-start.md': 'linza/quick-start.md',
  'linza/03-tools.md': 'linza/tools.md',
  'en/nouz/00-overview.md': 'en/nouz/index.md',
  'en/linza/00-overview.md': 'en/linza/index.md',
  'en/linza/01-use-cases.md': 'en/linza/use-cases.md',
  'en/linza/02-how-it-works.md': 'en/linza/how-it-works.md',
  'en/linza/03-quick-start.md': 'en/linza/quick-start.md',
  'en/linza/04-tools.md': 'en/linza/tools.md',
}

const normalizePagePath = (relativePath: string) => {
  const publicPath = orderedPageRewrites[relativePath] ?? relativePath
  const routePath = publicPath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')
  return routePath ? `/${routePath}` : '/'
}

const ruProductSwitch = {
  text: 'Продукты',
  items: [
    { text: 'NOUZ', link: '/nouz/' },
    { text: 'LINZA', link: '/linza/' },
  ],
}

const enProductSwitch = {
  text: 'Products',
  items: [
    { text: 'NOUZ', link: '/en/nouz/' },
    { text: 'LINZA', link: '/en/linza/' },
  ],
}

const ruNouzSidebar = [
  ruProductSwitch,
  {
    text: 'NOUZ',
    items: [
      { text: 'Обзор', link: '/nouz/' },
      {
        text: 'Семантическая онтология',
        collapsed: false,
        items: [
          { text: 'Ядра и Паттерны', link: '/nouz/concepts/cores-patterns' },
          { text: 'Модули, Кванты и Артефакты', link: '/nouz/concepts/modules-quanta' },
          { text: 'Связи и Граф', link: '/nouz/concepts/links' },
        ],
      },
      { text: 'Сценарии', link: '/nouz/use-cases' },
      { text: 'Качество эталонов', link: '/nouz/etalon-quality' },
      { text: 'Быстрый старт', link: '/nouz/quick-start' },
      { text: 'Инструменты MCP', link: '/nouz/tools-reference' },
    ],
  },
]

const ruLinzaSidebar = [
  ruProductSwitch,
  {
    text: 'LINZA',
    items: [
      { text: 'Обзор', link: '/linza/' },
      { text: 'Устройство', link: '/linza/how-it-works' },
      { text: 'Быстрый старт', link: '/linza/quick-start' },
      { text: 'Инструменты MCP', link: '/linza/tools' },
    ],
  },
]

const enNouzSidebar = [
  enProductSwitch,
  {
    text: 'NOUZ',
    items: [
      { text: 'Overview', link: '/en/nouz/' },
    ],
  },
]

const enLinzaSidebar = [
  enProductSwitch,
  {
    text: 'LINZA',
    items: [
      { text: 'Overview', link: '/en/linza/' },
      { text: 'Use Cases', link: '/en/linza/use-cases' },
      { text: 'How It Works', link: '/en/linza/how-it-works' },
      { text: 'Quick Start', link: '/en/linza/quick-start' },
      { text: 'MCP Tools', link: '/en/linza/tools' },
    ],
  },
]

export default defineConfig({
  title: 'Семиотроника — инструменты для ИИ-систем',
  description: 'NOUZ, LINZA и лаборатория для графов знаний, эмбеддингов и агентной навигации.',
  rewrites: orderedPageRewrites,
  cleanUrls: true,
  appearance: true,
  sitemap: {
    hostname: 'https://semiotronika.ru',
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'keywords', content: 'Semiotronika, Семиотроника, NOUZ, LINZA, AI agents, RAG, MCP, knowledge base, Obsidian MCP, semantic knowledge graph, Markdown knowledge base, embeddings, review proposals, базы знаний, ИИ-агенты, локальный граф знаний' }],
    ['meta', { name: 'author', content: 'Semiotronika' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Semiotronika' }],
    ['meta', { property: 'og:image', content: 'https://semiotronika.ru/favicon.png' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:image', content: 'https://semiotronika.ru/favicon.png' }],
  ],

  transformHead({ pageData }) {
    const normalizedPath = normalizePagePath(pageData.relativePath)
    const isEnglish = normalizedPath.startsWith('/en/')
    const canonical = new URL(normalizedPath, 'https://semiotronika.ru').toString()
    const ruSeo: Record<string, { title: string; description: string }> = {
      '/': {
        title: 'Семиотроника — инструменты для ИИ-систем',
        description: 'NOUZ, LINZA и лаборатория для графов знаний, эмбеддингов и агентной навигации.',
      },
      '/products': {
        title: 'Продукты Семиотроники — NOUZ и LINZA',
        description: 'NOUZ и LINZA: MCP-серверы Семиотроники. Витрина с ссылками на GitHub и PyPI.',
      },
      '/nouz/': {
        title: 'NOUZ — структурная память для Obsidian и Markdown',
        description: 'NOUZ дает AI-агенту графовый контекст Markdown-базы: YAML, уровни, связи, локальный SQLite-индекс, эталоны, чанки, семантические мосты и дрифт.',
      },
      '/nouz/concepts/cores-patterns': {
        title: 'NOUZ — ядра и паттерны',
        description: 'Семантическая онтология NOUZ-MCP: ядра и паттерны как тематический фундамент базы знаний.',
      },
      '/nouz/concepts/modules-quanta': {
        title: 'NOUZ — модули, кванты и артефакты',
        description: 'Семантическая онтология NOUZ-MCP: модули, кванты, артефакты и переход от сырого материала к устойчивому смыслу.',
      },
      '/nouz/concepts/links': {
        title: 'NOUZ — связи и граф',
        description: 'Семантическая онтология NOUZ-MCP: hierarchy, temporary, semantic, tag и analogy связи как структура живого графа знаний.',
      },
      '/nouz/use-cases': {
        title: 'NOUZ — сценарии использования',
        description: 'Сценарии NOUZ-MCP: от хаоса LUCA к фабрике контента и управляемой базе знаний.',
      },
      '/nouz/etalon-quality': {
        title: 'NOUZ — проверка качества эталонов',
        description: 'Как NOUZ-MCP проверяет семантические эталоны: raw cosine, mean-centered cosine, smoke test эталонов, spread и связь с лабораторией embeddings.',
      },
      '/nouz/quick-start': {
        title: 'NOUZ — быстрый старт',
        description: 'Технический старт NOUZ-MCP: установка, запуск и интеграция в Claude.',
      },
      '/nouz/tools-reference': {
        title: 'Инструменты MCP NOUZ',
        description: 'Инструменты MCP NOUZ-MCP для ИИ: чтение, граф, индексация, семантика и безопасные операции.',
      },
      '/linza/': {
        title: 'LINZA — локальный MCP-сервер для рабочей памяти агента',
        description: 'LINZA создает локальный .linza/linza.db для индекса Markdown, входящих артефактов, карточек ревью, памяти, trace-записей и пакетов контекста.',
      },
      '/linza/quick-start': {
        title: 'Быстрый старт LINZA — подключить рабочий материал к MCP-клиенту',
        description: 'Как установить linza-mcp, указать LINZA_VAULT, подключить MCP-клиент, настроить адрес API эмбеддингов и проверить первые карточки ревью.',
      },
      '/linza/how-it-works': {
        title: 'Устройство LINZA — сайдкар, ревью, контекст и trace-записи',
        description: 'Как LINZA хранит сайдкар, индексирует Markdown, принимает артефакты, выдает ID ревью, показывает dry-run и ограничивает записи.',
      },
      '/linza/tools': {
        title: 'Инструменты MCP LINZA — 7 основных инструментов и agent_workspace',
        description: 'Основные MCP-инструменты LINZA: guide_next_steps, agent_workspace, index_all, search, read_file, get_stats и scan_vault.',
      },
    }
    const enSeo: Record<string, { title: string; description: string }> = {
      '/en/': {
        title: 'Semiotronika — tools for AI systems',
        description: 'NOUZ, LINZA, and a laboratory for knowledge graphs, embeddings, and agent navigation.',
      },
      '/en/products': {
        title: 'Semiotronika Products — NOUZ and LINZA',
        description: 'NOUZ and LINZA: Semiotronika MCP servers. A product showcase with GitHub and PyPI links.',
      },
      '/en/nouz/': {
        title: 'NOUZ — structural memory for Obsidian and Markdown',
        description: 'NOUZ gives an AI agent graph context for a Markdown base: YAML, levels, links, a local SQLite index, etalons, chunks, semantic bridges, and drift.',
      },
      '/en/linza/': {
        title: 'LINZA — local MCP server for agent sidecar memory',
        description: 'LINZA creates a local .linza/linza.db for Markdown indexing, incoming artifacts, review cards, memory, traces, and context packs.',
      },
      '/en/linza/use-cases': {
        title: 'LINZA — use cases',
        description: 'LINZA use cases: project folders, incoming material, context handoff, and agent trace review.',
      },
      '/en/linza/quick-start': {
        title: 'LINZA Quick Start — connect working material to an MCP client',
        description: 'Install linza-mcp, set LINZA_VAULT, connect an MCP client, configure an embedding endpoint, and check the first review cards.',
      },
      '/en/linza/how-it-works': {
        title: 'How LINZA Works — sidecar, review, context, and traces',
        description: 'How LINZA stores the sidecar, indexes Markdown, ingests artifacts, returns review IDs, uses dry-run, and restricts writes.',
      },
      '/en/linza/tools': {
        title: 'LINZA MCP Tools — 7 main tools and agent_workspace',
        description: 'LINZA main MCP tools: guide_next_steps, agent_workspace, index_all, search, read_file, get_stats, and scan_vault.',
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
                url: 'https://github.com/Semiotronika/NOUZ-MCP',
                applicationCategory: 'DeveloperApplication',
              },
              {
                '@type': 'SoftwareApplication',
                position: 2,
                name: 'LINZA',
                url: 'https://github.com/Semiotronika/LINZA-MCP',
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
          '@type': 'WebPage',
          name: title,
          description,
          url: canonical,
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
    const normalizedPath = normalizePagePath(ctx.pageData.relativePath)
    const titles: Record<string, string> = {
      '/': 'Семиотроника — инструменты для ИИ-систем',
      '/products': 'Продукты Семиотроники — NOUZ и LINZA',
      '/nouz/': 'NOUZ — структурная память для Obsidian и Markdown',
      '/nouz/concepts/cores-patterns': 'NOUZ — ядра и паттерны',
      '/nouz/concepts/modules-quanta': 'NOUZ — модули, кванты и артефакты',
      '/nouz/concepts/links': 'NOUZ — связи и граф',
      '/nouz/use-cases': 'NOUZ — сценарии использования',
      '/nouz/etalon-quality': 'NOUZ — проверка качества эталонов',
      '/nouz/quick-start': 'NOUZ — быстрый старт',
      '/nouz/tools-reference': 'Инструменты MCP NOUZ',
      '/linza/': 'LINZA — локальный MCP-сервер для рабочей памяти агента',
      '/linza/how-it-works': 'Устройство LINZA — сайдкар, ревью, контекст и trace-записи',
      '/linza/quick-start': 'Быстрый старт LINZA — подключить рабочий материал к MCP-клиенту',
      '/linza/tools': 'Инструменты MCP LINZA — 7 основных инструментов и agent_workspace',
      '/en/': 'Semiotronika — tools for AI systems',
      '/en/products': 'Semiotronika Products — NOUZ and LINZA',
      '/en/nouz/': 'NOUZ — structural memory for Obsidian and Markdown',
      '/en/linza/': 'LINZA — local MCP server for agent sidecar memory',
      '/en/linza/use-cases': 'LINZA — use cases',
      '/en/linza/how-it-works': 'How LINZA Works — sidecar, review, context, and traces',
      '/en/linza/quick-start': 'LINZA Quick Start — connect working material to an MCP client',
      '/en/linza/tools': 'LINZA MCP Tools — 7 main tools and agent_workspace',
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
    const normalizedPath = normalizePagePath(pageData.relativePath)
    const titles: Record<string, string> = {
      '/': 'Семиотроника — инструменты для ИИ-систем',
      '/products': 'Продукты Семиотроники — NOUZ и LINZA',
      '/nouz/': 'NOUZ — структурная память для Obsidian и Markdown',
      '/nouz/concepts/cores-patterns': 'NOUZ — ядра и паттерны',
      '/nouz/concepts/modules-quanta': 'NOUZ — модули, кванты и артефакты',
      '/nouz/concepts/links': 'NOUZ — связи и граф',
      '/nouz/use-cases': 'NOUZ — сценарии использования',
      '/nouz/etalon-quality': 'NOUZ — проверка качества эталонов',
      '/nouz/quick-start': 'NOUZ — быстрый старт',
      '/nouz/tools-reference': 'Инструменты MCP NOUZ',
      '/linza/': 'LINZA — локальный MCP-сервер для рабочей памяти агента',
      '/linza/how-it-works': 'Устройство LINZA — сайдкар, ревью, контекст и trace-записи',
      '/linza/quick-start': 'Быстрый старт LINZA — подключить рабочий материал к MCP-клиенту',
      '/linza/tools': 'Инструменты MCP LINZA — 7 основных инструментов и agent_workspace',
      '/en/': 'Semiotronika — tools for AI systems',
      '/en/products': 'Semiotronika Products — NOUZ and LINZA',
      '/en/nouz/': 'NOUZ — structural memory for Obsidian and Markdown',
      '/en/linza/': 'LINZA — local MCP server for agent sidecar memory',
      '/en/linza/use-cases': 'LINZA — use cases',
      '/en/linza/how-it-works': 'How LINZA Works — sidecar, review, context, and traces',
      '/en/linza/quick-start': 'LINZA Quick Start — connect working material to an MCP client',
      '/en/linza/tools': 'LINZA MCP Tools — 7 main tools and agent_workspace',
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
          '/nouz/': ruNouzSidebar,
          '/linza/': ruLinzaSidebar,
        },
        footer: {
          message: '<span class="footer-brand"><span>{</span>Семиотроника<span>}</span></span><br><a href="https://t.me/Masha_Belkina">Telegram</a> · <a href="mailto:belkinamariaigorevna@yandex.ru">Email</a>',
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
          '/en/nouz/': enNouzSidebar,
          '/en/linza/': enLinzaSidebar,
        },
        footer: {
          message: '<span class="footer-brand"><span>{</span>Semiotronika<span>}</span></span><br><a href="https://t.me/Masha_Belkina">Telegram</a> · <a href="mailto:belkinamariaigorevna@yandex.ru">Email</a>',
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
