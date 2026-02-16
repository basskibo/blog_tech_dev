# Dev.to Converter Script

Automatski konvertuje MDX blog postove u dev.to format.

## Kako koristiti

### CLI (Command Line)

```bash
# Osnovna upotreba
npm run convert-to-devto posts/blog/my-post.mdx

# Ili direktno
node scripts/convert-to-devto.js posts/blog/my-post.mdx

# Sa custom output fajlom
node scripts/convert-to-devto.js posts/blog/my-post.mdx posts/blog/my-post-devto.md
```

### API Endpoint

Možeš pozvati API endpoint:

```bash
curl -X POST http://localhost:3000/api/convert-to-devto \
  -H "Content-Type: application/json" \
  -d '{"postPath": "posts/blog/my-post.mdx"}'
```

## Šta skripta radi

1. **Parsira frontmatter** - ekstraktuje metadata iz MDX fajla
2. **Konvertuje custom komponente** u standardne HTML/Markdown tagove:
   - `<LgList>` → `<ul>`
   - `<Link href="...">` → `[text](url)`
   - `<Accent>` → `**text**` (bold)
   - `<HighlightBox>` → styled `<div>`
   - `<EmbeddedLink>` → markdown link
   - `<Adjusted>` → inline code
   - itd.
3. **Konvertuje tagove** - pretvara array tagova u comma-separated string
4. **Dodaje footer** sa linkovima ka tvom sajtu

## Output

Skripta kreira novi `.md` fajl sa `-devto` sufiksom u istom folderu.

Primer:
- Input: `posts/blog/my-post.mdx`
- Output: `posts/blog/my-post-devto.md`

## Frontmatter

Output fajl ima dev.to kompatibilan frontmatter:

```yaml
---
title: My Post Title
published: false
tags: react, typescript, javascript
---
```

## Footer

Na kraju posta se automatski dodaje:

```markdown
---

**If you found this post useful, check out more articles on my [personal blog](https://www.jageticbojan.com/routes/blog) where I write about Nodejs, React, TypeScript, and web development in general!**

You can also check out my [GitHub](https://github.com/basskibo) for more projects and open source contributions.
```

