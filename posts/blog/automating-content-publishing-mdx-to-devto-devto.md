---
title: Automating Content Publishing: Building an MDX to Dev.to Converter Script
published: false
tags: javascript, automation, nodejs, mdx, devto, tooling, productivity
---


## Introduction

As a developer who maintains a personal blog, I found myself constantly republishing content across multiple platforms. My main blog runs on Next.js with MDX, but I also wanted to share my posts on [dev.to](https://dev.to) to reach a broader audience.

The problem? Each platform has different formatting requirements. My MDX posts use custom React components like `<ul>`, `<Accent>`, `<div style="margin: 1rem 0; padding: 1rem; border: 1px solid #333; border-radius: 0.5rem; background: #1a1a1a;">`, and `<Link>`, which dev.to doesn't support. Manually converting each post was time-consuming and error-prone.

So I built an **automated conversion script** that transforms my MDX posts into dev.to-compatible Markdown. In this post, I'll walk you through the solution, the implementation, and how you can use it for your own content.

## The Problem

When you maintain a blog on multiple platforms, you face several challenges:

<ul>
  <li><b>Formatting differences</b> - Each platform supports different markdown features and HTML tags</li>
  <li><b>Time consumption</b> - Manually converting posts takes hours, especially for longer articles</li>
  <li><b>Consistency issues</b> - It's easy to miss converting some components or make formatting mistakes</li>
  <li><b>Maintenance overhead</b> - Every time you update a post, you need to update it on all platforms</li>
</ul>

In my case, I had custom MDX components that needed to be converted to standard HTML/Markdown:

<div style="margin: 1rem 0; padding: 1rem; border: 1px solid #333; border-radius: 0.5rem; background: #1a1a1a;">
- **LgList** → standard <code>&lt;ul&gt;</code> lists
- **Link** → markdown links <code>[text](url)</code>
- **Accent** → bold text <code>**text**</code>
- **HighlightBox** → styled <code>&lt;div&gt;</code>
- **EmbeddedLink** → markdown links
- **Adjusted** → inline code
</div>

## The Solution

I created a Node.js script that:

1. **Parses MDX frontmatter** - Extracts metadata using `gray-matter`
2. **Converts custom components** - Replaces all custom components with standard HTML/Markdown
3. **Transforms tags** - Converts tag arrays to comma-separated strings for dev.to
4. **Adds footer** - Automatically appends a footer with links to my personal blog
5. **Generates output** - Creates a new `.md` file ready for dev.to

## Implementation

Let's dive into the code. The script uses Node.js with the `gray-matter` package for parsing frontmatter:

```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DEVTO_FOOTER = `---

**If you found this post useful, check out more articles on my [personal blog](https://www.jageticbojan.com/routes/blog) where I write about Nodejs, React, TypeScript, and web development in general!**

You can also check out my [GitHub](https://github.com/basskibo) for more projects and open source contributions.`;
```

### Component Conversion

The core of the script is the `convertComponents` function that uses regex to replace custom components:

```javascript
function convertComponents(content) {
  let converted = content;

  // Replace <ul> with <ul>
  converted = converted.replace(/<ul>/g, '<ul>');
  converted = converted.replace(/<\/LgList>/g, '</ul>');

  // Replace [text](url) with [text](url)
  converted = converted.replace(
    /<Link\s+href=["']([^"']+)["']>([^<]+)<\/Link>/g, 
    '[$2]($1)'
  );

  // Replace **text** with **text** (bold)
  converted = converted.replace(
    /<Accent([^>]*)>([^<]+)<\/Accent>/g, 
    '**$2**'
  );

  // Replace <div style="margin: 1rem 0; padding: 1rem; border: 1px solid #333; border-radius: 0.5rem; background: #1a1a1a;"> with styled div
  converted = converted.replace(
    /<div style="margin: 1rem 0; padding: 1rem; border: 1px solid #333; border-radius: 0.5rem; background: #1a1a1a;">/g,
    '<div style="margin: 1rem 0; padding: 1rem; border: 1px solid #333; border-radius: 0.5rem; background: #1a1a1a;">'
  );
  converted = converted.replace(/<\/HighlightBox>/g, '</div>');

  // Replace [url](url) with markdown link
  converted = converted.replace(
    /<EmbeddedLink\s+url=["']([^"']+)["']\s*\/>/g, 
    '[$1]($1)'
  );

  // Replace `text` with inline code
  converted = converted.replace(
    /<Adjusted>([^<]+)<\/Adjusted>/g, 
    '`$1`'
  );

  return converted;
}
```

### Frontmatter Parsing

The script uses `gray-matter` to parse frontmatter and convert tags:

```javascript
function parseFrontmatter(content) {
  try {
    const parsed = matter(content);
    const frontmatter = parsed.data || {};
    const body = parsed.content;

    // Convert tags array to comma-separated string
    if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
      const tagNames = frontmatter.tags
        .map(tag => {
          if (typeof tag === 'object' && tag.name) {
            return tag.name;
          } else if (typeof tag === 'object' && tag.slug) {
            return tag.slug;
          } else if (typeof tag === 'string') {
            return tag;
          }
          return null;
        })
        .filter(Boolean);
      frontmatter.tags = tagNames.join(', ');
    }

    return { frontmatter, body };
  } catch (error) {
    console.warn('Error parsing frontmatter:', error.message);
    return { frontmatter: {}, body: content };
  }
}
```

### Main Conversion Function

The main function ties everything together:

```javascript
function convertToDevTo(inputPath, outputPath = null) {
  try {
    // Read the MDX file
    const content = fs.readFileSync(inputPath, 'utf-8');

    // Parse frontmatter and body
    const { frontmatter, body } = parseFrontmatter(content);

    // Convert components in body
    const convertedBody = convertComponents(body);

    // Generate dev.to frontmatter
    const devtoFrontmatter = {
      title: frontmatter.title || '',
      published: 'false', // Set to true when ready to publish
      tags: frontmatter.tags || '',
    };

    // Format frontmatter as YAML
    const frontmatterYaml = formatFrontmatter(devtoFrontmatter);

    // Combine everything
    const devtoContent = [
      frontmatterYaml,
      '',
      convertedBody,
      DEVTO_FOOTER
    ].join('\n');

    // Determine output path
    const finalOutputPath = outputPath || 
      inputPath.replace(/\.mdx$/, '-devto.md');

    // Write the converted file
    fs.writeFileSync(finalOutputPath, devtoContent, 'utf-8');

    console.log(`✅ Successfully converted: ${inputPath}`);
    console.log(`📄 Output: ${finalOutputPath}`);
    return finalOutputPath;
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    throw error;
  }
}
```

## Usage

The script can be used in two ways:

### Command Line

Add it to your `package.json`:

```json
{
  "scripts": {
    "convert-to-devto": "node scripts/convert-to-devto.js"
  }
}
```

Then run:

```bash
npm run convert-to-devto posts/blog/my-post.mdx
```

Or directly:

```bash
node scripts/convert-to-devto.js posts/blog/my-post.mdx
```

### API Endpoint

I also created a Next.js API endpoint for web-based conversion:

```javascript
// pages/api/convert-to-devto.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { postPath } = req.body;
  const resultPath = convertToDevTo(postPath);
  const convertedContent = fs.readFileSync(resultPath, 'utf-8');

  return res.status(200).json({
    success: true,
    outputPath: resultPath,
    content: convertedContent,
  });
}
```

## Results

This automation has saved me **hours of manual work**. Here's what I gained:

<ul>
  <li><b>Time savings</b> - Converting a post now takes seconds instead of 15-30 minutes</li>
  <li><b>Consistency</b> - All posts are converted the same way, reducing errors</li>
  <li><b>Maintainability</b> - When I update the script, all future conversions benefit</li>
  <li><b>Scalability</b> - I can convert multiple posts at once with a simple loop</li>
</ul>

## Extending the Script

The script is easily extensible. You can add support for:

- **More platforms** - Add converters for Medium, Hashnode, or other platforms
- **Custom transformations** - Add platform-specific formatting rules
- **Batch processing** - Convert multiple posts at once
- **Validation** - Check for missing images or broken links before publishing

Here's an example of how to extend it for batch processing:

```javascript
function convertMultiplePosts(postsDir) {
  const files = fs.readdirSync(postsDir);
  const mdxFiles = files.filter(f => f.endsWith('.mdx'));

  mdxFiles.forEach(file => {
    const inputPath = path.join(postsDir, file);
    convertToDevTo(inputPath);
  });

  console.log(`✅ Converted ${mdxFiles.length} posts`);
}
```

## Conclusion

Automating repetitive tasks like content conversion is one of the best investments you can make as a developer. This script not only saves time but also ensures consistency and reduces errors.

The key takeaways:

<ul>
  <li>Identify repetitive tasks in your workflow</li>
  <li>Start with a simple script that solves 80% of the problem</li>
  <li>Iterate and improve based on your needs</li>
  <li>Share your solutions - others might find them useful too!</li>
</ul>

If you maintain a blog on multiple platforms, I highly recommend building a similar automation. The time investment pays off quickly, and you'll have more time to focus on writing great content instead of manual formatting.

You can find the complete script in my [GitHub repository](https://github.com/basskibo). Feel free to fork it, modify it for your needs, or use it as inspiration for your own automation projects.

Happy automating! 🚀


---

**If you found this post useful, check out more articles on my [personal blog](https://www.jageticbojan.com/routes/blog) where I write about Nodejs, React, TypeScript, and web development in general!**

You can also check out my [GitHub](https://github.com/basskibo) for more projects and open source contributions.