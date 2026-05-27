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
        description: 'NOUZ и LINZA: MCP-серверы Семиотроники. Витрина с ссылками на GitHub и PyPI.',
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
    const relativePath = ctx.pageData.relativePath
    const routePath = relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const normalizedPath = routePath ? `/${routePath}` : '/'
    const titles: Record<string, string> = {
      '/': 'Семиотроника — инструменты для ИИ-систем',
      '/products': 'Продукты Семиотроники — NOUZ и LINZA',
      '/en/': 'Semiotronika — tools for AI systems',
      '/en/products': 'Semiotronika Products — NOUZ and LINZA',
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
      '/en/': 'Semiotronika — tools for AI systems',
      '/en/products': 'Semiotronika Products — NOUZ and LINZA',
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
