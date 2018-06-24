module.exports = {
    title: 'Craft 3 日本語版ドキュメント',
    description: 'Craft 3 日本語版ドキュメント',
    theme: 'craftdocs',
    base: '/v3/',
    // ga: 'UA-XXXXXXXX-X',
    themeConfig: {
        editLinks: true,
        nav: [
            {
                text: 'Craft CMS',
                items: [
                    { text: 'Craft 2 Documentation', link: 'https://docs.craftcms.com/v2/' },
                    { text: 'Craft 3 Documentation', link: 'https://docs.craftcms.com/v3/' },
                    { text: 'Craft 2 Class Reference', link: 'https://docs.craftcms.com/api/v2/' },
                    { text: 'Craft 3 Class Reference', link: 'https://docs.craftcms.com/api/v3/' },
                ]
            },
            { text: 'Craftnet API', link: 'https://docs.api.craftcms.com/' },
        ],
        sidebar: {
            '/element-query-params/': [
                ['../element-queries', '← エレメントクエリ'],
                {
                    title: 'エレメントのクエリパラメータ',
                    collapsable: false,
                    children: [
                        ['asset-query-params', 'アセット'],
                        ['category-query-params', 'カテゴリ'],
                        ['entry-query-params', 'エントリ'],
                        ['matrix-block-query-params', '行列ブロック'],
                        ['tag-query-params', 'タグ'],
                        ['user-query-params', 'ユーザー'],
                    ]
                }
            ],
            '/templating/': [
                ['../twig-primer', '← Twig 入門書'],
                {
                    title: 'タグ',
                    collapsable: false,
                    children: [
                        'tags/cache',
                        'tags/css',
                        'tags/exit',
                        'tags/header',
                        'tags/js',
                        'tags/nav',
                        'tags/paginate',
                        'tags/redirect',
                        'tags/requirelogin',
                        'tags/requirepermission',
                        'tags/switch',
                    ]
                },
                'filters',
                'functions',
                'global-variables',
                'tests',
                'elements',
                {
                    title: 'テンプレートの実例',
                    collapsable: false,
                    children: [
                        'examples/integrating-disqus',
                        'examples/rss-feed',
                        'examples/atom-feed',
                        'examples/entry-form',
                        'examples/search-form',
                        'examples/login-form',
                        'examples/user-profile-form',
                        'examples/user-registration-form',
                        'examples/forgot-password-form',
                        'examples/set-password-form',
                    ]
                }
            ],
            '/': [
                {
                    title: '導入',
                    collapsable: false,
                    children: [
                        '',
                        'coc',
                        ['how-to-use-the-documentation', 'このドキュメントの使い方'],
                    ]
                },
                {
                    title: 'Craft のインストール',
                    collapsable: false,
                    children: [
                        'requirements',
                        'installation',
                    ]
                },
                {
                    title: 'Craft のアップデート',
                    collapsable: false,
                    children: [
                        'upgrade',
                        'updating',
                        'changes-in-craft-3',
                    ]
                },
                {
                    title: 'はじめに',
                    collapsable: false,
                    children: [
                        'the-pieces-of-craft',
                        'directory-structure',
                    ]
                },
                {
                    title: 'コアコンセプト',
                    collapsable: false,
                    children: [
                        'sections-and-entries',
                        'fields',
                        'categories',
                        'assets',
                        'users',
                        'globals',
                        'tags',
                        'routing',
                        'searching',
                        'sites',
                        ['localization', 'ローカライゼーション'],
                        'element-queries',
                        'content-migrations',
                        'configuration',
                    ]
                },
                {
                    title: 'テンプレート記法',
                    collapsable: false,
                    children: [
                        'twig-primer',
                        'templating/tags',
                        'templating/filters',
                        'templating/functions',
                        'templating/global-variables',
                        'templating/tests',
                        'templating/elements',
                        'templating/examples/',
                    ]
                },
                {
                    title: '高度なトピックス',
                    collapsable: false,
                    children: [
                        'relations',
                        'reference-tags',
                        'eager-loading-elements',
                    ]
                },
                {
                    title: 'プラグイン開発',
                    collapsable: false,
                    children: [
                        'plugin-intro',
                        // 'coding-guidelines',
                        // 'updating-plugins',
                        // 'changelogs-and-updates',
                        // 'plugin-settings',
                        // 'cp-section',
                        // 'asset-bundles',
                        // 'services',
                        // 'extending-twig',
                        // 'widget-types',
                        // 'field-types',
                        // 'volume-types',
                        // 'utility-types',
                        // 'element-types',
                        // 'element-action-types',
                        // 'plugin-migrations',
                        // 'plugin-store'
                    ]
                }
            ]
        },
        codeLanguages: {
            twig: 'Twig',
            php: 'PHP',
        },
        // algolia: {
        //     apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        //     indexName: 'craftcms',
        //     algoliaOptions: {
        //         facetFilters: ['version:v3', 'tags:doc']
        //     }
        // }
    },
    markdown: {
        anchor: {
            level: [2, 3, 4]
        },
        toc: {
            format(content) {
                return content.replace(/[_`]/g, '')
            }
        },
        config(md) {
            md
                .use(replaceApiLinks)
                .use(require('vuepress-theme-craftdocs/markup'))
        }
    },
}

function replaceApiLinks(md) {
    // code adapted from the markdown-it-replace-link plugin
    md.core.ruler.after(
        'inline',
        'replace-link',
        function (state) {
            state.tokens.forEach(function (blockToken) {
                if (blockToken.type === 'inline' && blockToken.children) {
                    blockToken.children.forEach(function (token, tokenIndex) {
                        if (token.type === 'link_open') {
                            token.attrs.forEach(function (attr) {
                                if (attr[0] === 'href') {
                                    let replace = replaceApiLink(attr[1]);
                                    if (replace) {
                                        attr[1] = replace;
                                        let next = blockToken.children[tokenIndex+1];
                                        if (next.type === 'text') {
                                            next.content = next.content.replace(/^(api|config):/, '');
                                        }
                                    }
                                }
                                return false;
                            });
                        }
                    });
                }
            });
            return false;
        }
    );
}

function replaceApiLink(link) {
    link = decodeURIComponent(link)
    let m = link.match(/^(?:api:)?\\?([\w\\]+)(?:::\$?(\w+)(\(\))?)?(?:#([\w\-]+))?$/)
    if (m) {
        let className = m[1]
        let subject = m[2]
        let isMethod = typeof m[3] !== 'undefined'
        let hash = m[4]

        if (className.match(/^craft\\/) || className.match(/^Craft/)) {
            let url = 'https://docs.craftcms.com/api/v3/'+className.replace(/\\/g, '-').toLowerCase()+'.html'
            if (subject) {
                hash = ''
                if (isMethod) {
                    hash = 'method-'
                } else if (!subject.match(/^EVENT_/)) {
                    hash = 'property-'
                }
                hash += subject.replace(/_/g, '-').toLowerCase()
            }
            return url + (hash ? `#${hash}` : '');
        }

        if (className.match(/^yii\\/) || className.match(/^Yii/)) {
            let url = 'https://www.yiiframework.com/doc/api/2.0/'+className.replace(/\\/g, '-').toLowerCase()
            if (subject) {
                hash = subject+(isMethod ? '()' : '')+'-detail'
            }
            return url + (hash ? `#${hash}` : '');
        }

        if (className.match(/^Twig/)) {
            let url = 'https://twig.symfony.com/api/2.x/'+className.replace(/\\/g, '/')+'.html'
            if (subject) {
                hash = '#method_'+subject
            }
            return url + (hash ? `#${hash}` : '');
        }
    }

    m = link.match(/^config:(.+)/)
    if (m) {
        return replaceApiLink('craft\\config\\GeneralConfig::'+m[1])
    }
}
