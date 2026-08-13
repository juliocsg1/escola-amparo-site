# Site — Escola de Informática Amparo

Site institucional de uma escola de informática de Amparo (SP). Site estático de quatro
páginas, sem build e sem framework, focado em conversão para WhatsApp e em SEO local.

**No ar em [amparoinformatica.com.br](https://amparoinformatica.com.br)**

![Página inicial](img/home.webp)

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Chamada principal em tela cheia, hero com barra de estatísticas e cards de diferenciais |
| `curso.html` | Grade com os 7 cursos oferecidos |
| `sobre.html` | História da escola e cards de visão, missão e valores |
| `404.html` | Página de erro personalizada, mantendo a navegação do site |

## Tecnologias

- **HTML5** semântico
- **CSS3** com custom properties (design tokens em `:root`)
- **Bootstrap 5.3.2** — grid e componentes, via CDN
- **Bootstrap Icons 1.11.3**
- **Google Fonts** — Poppins
- **JavaScript** puro para os efeitos de navbar

Sem bundler, sem `node_modules`, sem etapa de build. Os arquivos são servidos como estão.

## Design system

Todas as cores e a tipografia ficam centralizadas como variáveis CSS no topo de
`css/style.css`:

| Token | Valor | Papel |
|---|---|---|
| `--green` | `#198754` | Cor primária |
| `--green-dark` | `#146c43` | Estados de hover |
| `--green-deep` | `#0a2e1f` | Fundos escuros |
| `--neon` | `#b6ff00` | Cor de destaque |
| `--whatsapp` | `#25D366` | Botões de contato |
| `--font` | `Poppins` | Tipografia |

Trocar a identidade visual do site inteiro é uma questão de alterar esse bloco.

## SEO e performance

- `sitemap.xml` e `robots.txt` configurados
- Todas as imagens em **WebP** — a pasta pesa cerca de 360 KB no total
- Meta tags de descrição por página
- Página 404 personalizada
- Navbar com efeito *glassmorphism* ao rolar

## Como rodar

Não precisa instalar nada. Basta abrir `index.html` no navegador.

Para servir por HTTP (necessário para testar `sitemap.xml` e caminhos absolutos):

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Depois acesse `http://localhost:8080`.

## Estrutura

```
├── index.html      Página inicial
├── curso.html      Cursos
├── sobre.html      Sobre a escola
├── 404.html        Erro 404
├── css/style.css   Design tokens e todos os estilos
├── js/main.js      Comportamento da navbar
├── img/            Imagens em WebP
├── sitemap.xml
└── robots.txt
```

## Deploy

Hospedado na **Netlify**, com deploy contínuo a partir da branch `main`: cada push
publica o site. Não há etapa de build — a raiz do repositório é servida como está.

A Netlify aplica *Pretty URLs* na publicação, então os links internos escritos como
`curso.html` são servidos como `/curso`. As duas formas respondem, e as tags
`<link rel="canonical">` apontam para a versão com `.html`, que é a listada no
`sitemap.xml`.

## Observação

Projeto real, de um negócio da família. O número de WhatsApp presente no código é o contato
comercial público da escola.
