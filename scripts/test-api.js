import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Read API key from .env file
const envPath = join(__dirname, '..', '.env');
const envContent = readFileSync(envPath, 'utf8');
const API_KEY = envContent
  .split('\n')
  .find(line => line.startsWith('VITE_OPENROUTER_API_KEY='))
  ?.split('=')[1]
  ?.trim();

if (!API_KEY) {
  console.error('VITE_OPENROUTER_API_KEY not found in .env file');
  process.exit(1);
}

console.log('Found API key:', API_KEY.substring(0, 8) + '...');

function cleanJsonContent(content) {
  // First, normalize whitespace and line breaks
  let cleaned = content.replace(/\s+/g, ' ').trim();

  // Function to process object properties
  function processObject(match) {
    // Remove outer braces and trim
    const inner = match.slice(1, -1).trim();
    
    // Split into properties (handling both quoted strings and numbers)
    const props = inner.split(/(?<=(?:"|true|false|\d))\s+(?=")/);
    
    // Add commas between properties
    return '{' + props.join(', ') + '}';
  }

  // Process all objects (including nested)
  let lastCleaned;
  do {
    lastCleaned = cleaned;
    cleaned = cleaned.replace(/{[^{}]+}/g, processObject);
  } while (cleaned !== lastCleaned);

  // Add commas between array items
  cleaned = cleaned.replace(/}\s*{/g, '}, {');
  
  // Fix any trailing commas
  cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
  
  // Fix spacing
  cleaned = cleaned.replace(/{\s+/g, '{')
                  .replace(/\s+}/g, '}')
                  .replace(/\[\s+/g, '[')
                  .replace(/\s+\]/g, ']');
  
  // Fix any remaining formatting issues
  cleaned = cleaned.replace(/,\s*}/g, '}')
                  .replace(/,\s*]/g, ']')
                  .replace(/\[\s*,/g, '[')
                  .replace(/{\s*,/g, '{');

  // Verify and return
  try {
    JSON.parse(cleaned);
    return cleaned;
  } catch (e) {
    // If parsing fails, try one more aggressive cleanup
    cleaned = cleaned.replace(/(["})\d])\s+"/g, '$1,"');
    cleaned = cleaned.replace(/"\s+(["})\d])/g, '",$1');
    return cleaned;
  }
}

async function testAPI() {
  console.log('Testing OpenRouter API with Qwen 2.5 model...\n');
  
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Tariffic Supply Chain Analysis'
    },
    body: JSON.stringify({
      model: 'qwen/qwen-2.5-72b-instruct',
      messages: [
        {
          role: 'system',
          content: `You are a supply chain analysis expert. Generate detailed, accurate JSON responses following the exact structure provided. Focus on real-world data and relationships. Important: Always use proper JSON formatting with commas between properties and double quotes around strings.

Example of correct formatting:
{
  "subcategories": [
    {"name": "Electronics", "gdp": "390B", "count": 52},
    {"name": "Apparel", "gdp": "280B", "count": 45}
  ]
}`
        },
        {
          role: 'user',
          content: `Generate a JSON object with subcategories for the Consumer industry. Each subcategory must have a name, gdp (with B/T suffix), and company count. The response must be ONLY the JSON object with this exact structure:
{
  "subcategories": [
    {"name": "Electronics", "gdp": "390B", "count": 52},
    {"name": "Apparel", "gdp": "280B", "count": 45}
  ]
}`
        }
      ],
      stream: false,
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 0.9
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', response.status, response.statusText);
    console.error('Error details:', errorText);
    return;
  }

  const data = await response.json();
  console.log('Response:', JSON.stringify(data, null, 2));
  
  const content = data.choices[0]?.message?.content;
  if (content) {
    console.log('\nOriginal content:', content);
    try {
      const cleanedContent = cleanJsonContent(content);
      console.log('\nCleaned content:', cleanedContent);
      
      try {
        const parsed = JSON.parse(cleanedContent);
        console.log('\nSuccessfully parsed JSON:', JSON.stringify(parsed, null, 2));
        
        // Verify the structure
        if (!parsed.subcategories || !Array.isArray(parsed.subcategories)) {
          console.error('\nWarning: Response does not match expected structure');
        } else {
          console.log('\nVerified structure: ✓ Contains subcategories array');
          console.log('Found', parsed.subcategories.length, 'subcategories');
          
          // Verify each subcategory has required properties
          const validSubcategories = parsed.subcategories.every(sub => 
            typeof sub.name === 'string' &&
            typeof sub.gdp === 'string' &&
            typeof sub.count === 'number'
          );
          
          if (validSubcategories) {
            console.log('✓ All subcategories have required properties');
          } else {
            console.error('Warning: Some subcategories are missing required properties');
          }
        }
      } catch (parseError) {
        console.error('\nFailed to parse cleaned content:', parseError);
        console.error('Cleaned content that failed to parse:', cleanedContent);
      }
    } catch (cleanError) {
      console.error('\nFailed to clean content:', cleanError);
      console.error('Original content that failed to clean:', content);
    }
  } else {
    console.error('\nNo content in response');
    console.log('Full response data:', JSON.stringify(data, null, 2));
  }
}

testAPI().catch(console.error);
