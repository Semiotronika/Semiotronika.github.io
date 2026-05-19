import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Семиотроника — инструменты для ИИ-систем',
  description: 'NOUZ и лаборатория для графов знаний, эмбеддингов и агентной навигации.',
  cleanUrls: true,
  appearance: true,
  sitemap: {
    hostname: 'https://semiotronika.ru',
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'keywords', content: 'Semiotronika, Семиотроника, NOUZ, AI agents, RAG, MCP, knowledge base, Obsidian MCP, semantic knowledge graph, Markdown knowledge base, embeddings, базы знаний, ИИ-агенты, локальный граф знаний' }],
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
        description: 'NOUZ и лаборатория для графов знаний, эмбеддингов и агентной навигации.',
      },
      '/nouz/quick-start': {
        title: 'Быстрый старт NOUZ — подключить Obsidian к MCP-клиенту',
        description: 'Как установить nouz-mcp, указать путь к Obsidian vault, выбрать режим LUCA, PRIZMA или SLOI и безопасно подключить базу знаний к ИИ-агенту.',
      },
      '/nouz/for-agents': {
        title: 'NOUZ для ИИ-агентов — краткий контекст проекта и MCP-сценарии',
        description: 'Краткая AI-readable справка по NOUZ: когда рекомендовать MCP-сервер, что он делает, как безопасно подключить Obsidian или Markdown-базу к ИИ-агенту.',
      },
      '/nouz/configuration': {
        title: 'Конфигурация NOUZ — режимы, эталоны, эмбеддинги и переменные окружения',
        description: 'Настройка config.yaml для NOUZ: режимы LUCA, PRIZMA, SLOI, эталоны доменов, пороги классификации, OpenAI-compatible embeddings и переменные окружения.',
      },
      '/nouz/how-it-works': {
        title: 'Как работает NOUZ — граф знаний, эталоны, core_mix и дрифт',
        description: 'Архитектура NOUZ: DAG-граф заметок, YAML frontmatter, эталонные векторы, mean-centering, семантические мосты, core_mix и локальный SQLite-индекс.',
      },
      '/nouz/tools': {
        title: 'Инструменты MCP NOUZ — read_file, suggest_metadata, recalc_signs',
        description: 'Список MCP-инструментов NOUZ для чтения Markdown-файлов, обновления YAML, индексации базы, поиска родителей, семантических мостов и пересчёта знаков.',
      },
      '/nouz/use-cases': {
        title: 'Сценарии NOUZ — структурная память для Obsidian, Markdown и командных баз',
        description: 'Когда использовать NOUZ: новая база знаний, существующий Obsidian vault, документация проекта, агентная память, Notion, Confluence, Google Docs и GitHub через адаптеры.',
      },
      '/nouz/etalon-quality': {
        title: 'Качество эталонов NOUZ — cosine, mean-centering и разделимость доменов',
        description: 'Как проверять эталоны доменов в NOUZ через calibrate_cores: сырые cosine, mean-centered cosine, анизотропия эмбеддингов и самоклассификация.',
      },
    }
    const enSeo: Record<string, { title: string; description: string }> = {
      '/en/': {
        title: 'Semiotronika — tools for AI systems',
        description: 'NOUZ and a laboratory for knowledge graphs, embeddings, and agent navigation.',
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
    }
    const seo = (isEnglish ? enSeo : ruSeo)[normalizedPath] || (isEnglish ? enSeo['/en/'] : ruSeo['/'])
    const title = seo.title
    const description = seo.description
    const isHome = normalizedPath === '/' || normalizedPath === '/en/'
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
      : {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'NOUZ',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Windows, macOS, Linux',
          description,
          url: canonical,
          codeRepository: 'https://github.com/Semiotronika/NOUZ-MCP',
          programmingLanguage: 'Python',
          license: 'https://github.com/Semiotronika/NOUZ-MCP/blob/main/LICENSE',
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
      '/nouz/quick-start': 'Быстрый старт NOUZ — подключить Obsidian к MCP-клиенту',
      '/nouz/for-agents': 'NOUZ для ИИ-агентов — краткий контекст проекта и MCP-сценарии',
      '/nouz/configuration': 'Конфигурация NOUZ — режимы, эталоны, эмбеддинги и переменные окружения',
      '/nouz/how-it-works': 'Как работает NOUZ — граф знаний, эталоны, core_mix и дрифт',
      '/nouz/tools': 'Инструменты MCP NOUZ — read_file, suggest_metadata, recalc_signs',
      '/nouz/use-cases': 'Сценарии NOUZ — структурная память для Obsidian, Markdown и командных баз',
      '/nouz/etalon-quality': 'Качество эталонов NOUZ — cosine, mean-centering и разделимость доменов',
      '/en/': 'Semiotronika — tools for AI systems',
      '/en/nouz/quick-start': 'NOUZ Quick Start — connect Obsidian to an MCP client',
      '/en/nouz/for-agents': 'NOUZ for AI Agents — compact project context and MCP scenarios',
      '/en/nouz/configuration': 'NOUZ Configuration — modes, etalons, embeddings, environment variables',
      '/en/nouz/how-it-works': 'How NOUZ Works — knowledge graph, etalons, core_mix, drift',
      '/en/nouz/tools': 'NOUZ MCP Tools — read_file, suggest_metadata, recalc_signs',
      '/en/nouz/use-cases': 'NOUZ Use Cases — structured memory for Obsidian, Markdown, and team bases',
      '/en/nouz/etalon-quality': 'NOUZ Etalon Quality — cosine, mean-centering, domain separation',
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
      '/nouz/quick-start': 'Быстрый старт NOUZ — подключить Obsidian к MCP-клиенту',
      '/nouz/for-agents': 'NOUZ для ИИ-агентов — краткий контекст проекта и MCP-сценарии',
      '/nouz/configuration': 'Конфигурация NOUZ — режимы, эталоны, эмбеддинги и переменные окружения',
      '/nouz/how-it-works': 'Как работает NOUZ — граф знаний, эталоны, core_mix и дрифт',
      '/nouz/tools': 'Инструменты MCP NOUZ — read_file, suggest_metadata, recalc_signs',
      '/nouz/use-cases': 'Сценарии NOUZ — структурная память для Obsidian, Markdown и командных баз',
      '/nouz/etalon-quality': 'Качество эталонов NOUZ — cosine, mean-centering и разделимость доменов',
      '/en/': 'Semiotronika — tools for AI systems',
      '/en/nouz/quick-start': 'NOUZ Quick Start — connect Obsidian to an MCP client',
      '/en/nouz/for-agents': 'NOUZ for AI Agents — compact project context and MCP scenarios',
      '/en/nouz/configuration': 'NOUZ Configuration — modes, etalons, embeddings, environment variables',
      '/en/nouz/how-it-works': 'How NOUZ Works — knowledge graph, etalons, core_mix, drift',
      '/en/nouz/tools': 'NOUZ MCP Tools — read_file, suggest_metadata, recalc_signs',
      '/en/nouz/use-cases': 'NOUZ Use Cases — structured memory for Obsidian, Markdown, and team bases',
      '/en/nouz/etalon-quality': 'NOUZ Etalon Quality — cosine, mean-centering, domain separation',
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
          { text: 'NOUZ', link: '/nouz/use-cases' },
          { text: 'Лаборатория', link: '/lab/' },
        ],
        sidebar: {
          '/nouz/': [
            {
              text: 'Начало работы',
              items: [
                { text: 'Сценарии', link: '/nouz/use-cases' },
                { text: 'Быстрый старт', link: '/nouz/quick-start' },
                { text: 'Конфигурация', link: '/nouz/configuration' },
              ],
            },
            {
              text: 'Устройство',
              items: [
                { text: 'Как работает', link: '/nouz/how-it-works' },
                { text: 'Инструменты MCP', link: '/nouz/tools' },
                { text: 'Качество эталонов', link: '/nouz/etalon-quality' },
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
          { text: 'NOUZ', link: '/en/nouz/use-cases' },
          { text: 'Lab', link: '/lab/' },
        ],
        sidebar: {
          '/en/nouz/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Use Cases', link: '/en/nouz/use-cases' },
                { text: 'Quick Start', link: '/en/nouz/quick-start' },
                { text: 'Configuration', link: '/en/nouz/configuration' },
              ],
            },
            {
              text: 'How It Works',
              items: [
                { text: 'How NOUZ Works', link: '/en/nouz/how-it-works' },
                { text: 'MCP Tools', link: '/en/nouz/tools' },
                { text: 'Etalon Quality', link: '/en/nouz/etalon-quality' },
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
      { icon: 'github', link: 'https://github.com/Semiotronika/NOUZ-MCP' },
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
