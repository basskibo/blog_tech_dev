#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Converts MDX blog post to dev.to format
 * Replaces custom components with standard HTML/Markdown
 */

const DEVTO_FOOTER = `---

**If you found this post useful, check out more articles on my [personal blog](https://www.jageticbojan.com/routes/blog) where I write about Nodejs, React, TypeScript, and web development in general!**

You can also check out my [GitHub](https://github.com/basskibo) for more projects and open source contributions.`;

/**
 * Convert custom components to standard HTML/Markdown
 */
function convertComponents(content) {
  let converted = content;

  // Replace <LgList> with <ul>
  converted = converted.replace(/<LgList>/g, '<ul>');
  converted = converted.replace(/<\/LgList>/g, '</ul>');

  // Replace <SmList> with <ul>
  converted = converted.replace(/<SmList>/g, '<ul>');
  converted = converted.replace(/<\/SmList>/g, '</ul>');

  // Replace <LgNumberList> with <ol>
  converted = converted.replace(/<LgNumberList>/g, '<ol>');
  converted = converted.replace(/<\/LgNumberList>/g, '</ol>');

  // Replace <Link href="url">text</Link> with [text](url)
  converted = converted.replace(/<Link\s+href=["']([^"']+)["']>([^<]+)<\/Link>/g, '[$2]($1)');

  // Replace <Link href="url"> with just the URL as markdown link if no text
  converted = converted.replace(/<Link\s+href=["']([^"']+)["']\s*\/>/g, '[$1]($1)');

  // Replace <Accent>text</Accent> with **text** (bold)
  converted = converted.replace(/<Accent([^>]*)>([^<]+)<\/Accent>/g, '**$2**');

  // Replace <HighlightBox> with styled div
  converted = converted.replace(
    /<HighlightBox>/g,
    '<div style="margin: 1rem 0; padding: 1rem; border: 1px solid #333; border-radius: 0.5rem; background: #1a1a1a;">'
  );
  converted = converted.replace(/<\/HighlightBox>/g, '</div>');

  // Replace <EmbeddedLink url="url" /> with markdown link
  converted = converted.replace(/<EmbeddedLink\s+url=["']([^"']+)["']\s*\/>/g, '[$1]($1)');

  // Replace <EmbeddedLink url="url">text</EmbeddedLink> with [text](url)
  converted = converted.replace(/<EmbeddedLink\s+url=["']([^"']+)["']>([^<]+)<\/EmbeddedLink>/g, '[$2]($1)');

  // Replace <b>text</b> with **text** (if not already bold)
  // But keep existing <b> tags that might be intentional
  // Actually, let's keep <b> as is since dev.to supports it

  // Replace <Adjusted>text</Adjusted> with \`text\` (inline code)
  converted = converted.replace(/<Adjusted>([^<]+)<\/Adjusted>/g, '`$1`');

  // Replace <QouteComponent> with blockquote
  converted = converted.replace(/<QouteComponent>/g, '> ');
  converted = converted.replace(/<\/QouteComponent>/g, '');

  // Replace <NewLine /> with double newline
  converted = converted.replace(/<NewLine\s*\/>/g, '\n\n');

  // Remove any remaining self-closing custom components
  converted = converted.replace(/<[A-Z][a-zA-Z]*\s*\/>/g, '');

  return converted;
}

/**
 * Parse frontmatter and convert tags to dev.to format
 */
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
    console.warn('Error parsing frontmatter, using fallback:', error.message);
    // Fallback to simple regex parsing
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    if (match) {
      return { frontmatter: {}, body: match[2] };
    }
    return { frontmatter: {}, body: content };
  }
}

/**
 * Generate dev.to frontmatter
 */
function generateDevToFrontmatter(originalFrontmatter) {
  const devtoFrontmatter = {
    title: originalFrontmatter.title || '',
    published: 'false', // Set to true when ready to publish
  };

  // Convert tags
  if (originalFrontmatter.tags) {
    devtoFrontmatter.tags = originalFrontmatter.tags;
  }

  return devtoFrontmatter;
}

/**
 * Format frontmatter as YAML
 */
function formatFrontmatter(frontmatter) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(frontmatter)) {
    if (value !== undefined && value !== null) {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

/**
 * Main conversion function
 */
function convertToDevTo(inputPath, outputPath = null) {
  try {
    // Read the MDX file
    const content = fs.readFileSync(inputPath, 'utf-8');

    // Parse frontmatter and body
    const { frontmatter, body } = parseFrontmatter(content);

    // Convert components in body
    const convertedBody = convertComponents(body);

    // Generate dev.to frontmatter
    const devtoFrontmatter = generateDevToFrontmatter(frontmatter);

    // Combine everything
    const devtoContent = [
      formatFrontmatter(devtoFrontmatter),
      '',
      convertedBody,
      DEVTO_FOOTER
    ].join('\n');

    // Determine output path
    const finalOutputPath = outputPath || inputPath.replace(/\.mdx$/, '-devto.md');

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

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage: node scripts/convert-to-devto.js <input-file> [output-file]

Examples:
  node scripts/convert-to-devto.js posts/blog/my-post.mdx
  node scripts/convert-to-devto.js posts/blog/my-post.mdx posts/blog/my-post-devto.md
    `);
    process.exit(1);
  }

  const inputFile = args[0];
  const outputFile = args[1] || null;

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ File not found: ${inputFile}`);
    process.exit(1);
  }

  convertToDevTo(inputFile, outputFile);
}

module.exports = { convertToDevTo, convertComponents };

