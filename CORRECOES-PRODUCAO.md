# Correções pendentes em produção

Este arquivo lista problemas que **já foram corrigidos neste repositório**, mas que
continuam presentes no site publicado em <https://amparoinformatica.com.br>.

Enquanto o servidor não receber estes arquivos, os problemas seguem no ar.

Verificado em 12/08/2026.

---

## 1. A página de erro 404 está sem estilo

**Gravidade:** média — a página aparece como HTML cru, sem cores, fontes ou layout.

O `404.html` carrega uma folha de estilos que não existe no servidor:

```html
<link rel="stylesheet" href="css/style.min.css">
```

Conferido com requisição direta:

| Arquivo | Resposta do servidor |
|---|---|
| `css/style.min.css` | **404 Not Found** |
| `css/style.css` | 200 OK |

As outras três páginas (`index`, `curso`, `sobre`) usam `css/style.css` e por isso
funcionam. Só o `404.html` ficou apontando para a versão minificada, que nunca foi gerada.

**Correção** — em `404.html`, linha 14:

```diff
- <link rel="stylesheet" href="css/style.min.css">
+ <link rel="stylesheet" href="css/style.css">
```

> Se um dia você quiser mesmo gerar o `style.min.css`, aí sim vale voltar a referenciá-lo —
> mas nas quatro páginas, não só nesta.

---

## 2. Os fallbacks de imagem apontam para arquivos que não existem

**Gravidade:** baixa — não quebra nada hoje, mas são 12 requisições que retornariam 404
se algum visitante usasse um navegador sem suporte a WebP.

As imagens usam `<picture>` com WebP e um fallback:

```html
<picture>
    <source srcset="./img/home.webp" type="image/webp">
    <img src="./img/home.png" ...>   <!-- este arquivo não existe -->
</picture>
```

Conferido:

| Arquivo | Resposta do servidor |
|---|---|
| `img/home.webp` | 200 OK |
| `img/home.png` | **404 Not Found** |

Nenhum dos PNG/JPG de fallback foi enviado para o servidor. Como todos os navegadores
atuais suportam WebP, o `<source>` é sempre usado e o site funciona normalmente — o
fallback é que está morto.

**Arquivos afetados:** `home.png`, `estudant.jpg`, `sobre.png`, `ai.png`, `exel.png`,
`internet.png`, `power-bi.png`, `power-point.png`, `win.png`, `word.png`,
`facebook.png`, `instagram.png`.

**Correção adotada aqui** — apontar o `<img>` para o próprio `.webp`, que é o padrão que
o arquivo já usava no logo do topo:

```diff
  <picture>
      <source srcset="./img/home.webp" type="image/webp">
-     <img src="./img/home.png" class="cta-photo" alt="..." loading="eager">
+     <img src="./img/home.webp" class="cta-photo" alt="..." loading="eager">
  </picture>
```

**Alternativa**, se você quiser fallback de verdade: gerar os PNG/JPG a partir dos WebP e
enviar para `img/`. Só vale a pena se você precisar atender navegadores muito antigos —
o suporte a WebP hoje passa de 97% dos usuários.

---

## Como aplicar

Envie para o servidor os quatro arquivos HTML deste repositório:

```
index.html
curso.html
sobre.html
404.html
```

Nenhuma outra alteração é necessária: o CSS, as imagens e o JavaScript no servidor
continuam válidos.

Depois de subir, confirme:

```bash
# deve responder 200 e vir com estilo
curl -I https://amparoinformatica.com.br/css/style.css

# deve renderizar estilizada
curl -s https://amparoinformatica.com.br/pagina-que-nao-existe | grep style.css
```
