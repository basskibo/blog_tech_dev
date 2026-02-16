const fs = require('fs');
const path = require('path');
const { convertToDevTo } = require('../../scripts/convert-to-devto.js');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { postPath } = req.body;

    if (!postPath) {
      return res.status(400).json({ error: 'postPath is required' });
    }

    // Construct full path
    const fullPath = path.join(process.cwd(), postPath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check if it's an MDX file
    if (!fullPath.endsWith('.mdx')) {
      return res.status(400).json({ error: 'File must be an .mdx file' });
    }

    // Generate output path
    const outputPath = fullPath.replace(/\.mdx$/, '-devto.md');

    // Convert the file
    const resultPath = convertToDevTo(fullPath, outputPath);

    // Read the converted content
    const convertedContent = fs.readFileSync(resultPath, 'utf-8');

    // Return the converted content
    return res.status(200).json({
      success: true,
      outputPath: resultPath.replace(process.cwd(), ''),
      content: convertedContent,
    });
  } catch (error) {
    console.error('Error converting to dev.to:', error);
    return res.status(500).json({
      error: 'Failed to convert post',
      message: error.message,
    });
  }
}

