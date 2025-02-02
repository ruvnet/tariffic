const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error('VITE_OPENROUTER_API_KEY not found in environment variables');
}

export async function streamCompletion(prompt: string): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'DeepSeek R1 Stream Example'
    },
    body: JSON.stringify({
      model: 'deepseek-ai/deepseek-r1',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
      max_tokens: 1000
    })
  });

  if (!response.body) {
    throw new Error('No response body received');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices[0]?.delta?.content;
          if (content) {
            result += content;
          }
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      }
    }
  }
  return result;
}

// Cache in memory for browser environment
const memoryCache: { [key: string]: string } = {};

export async function getProductContent(prompt: string): Promise<string> {
  if (memoryCache[prompt]) {
    return memoryCache[prompt];
  }
  const content = await streamCompletion(prompt);
  memoryCache[prompt] = content;
  return content;
}

export async function generateProductDescription(name: string, category: string): Promise<string> {
  const prompt = `Generate a detailed product description for ${name} in the ${category} category. Include information about its features, benefits, and potential US-sourced components.`;
  return getProductContent(prompt);
}

export async function generateCompanyDetails(name: string, sector: string): Promise<string> {
  const prompt = `Generate detailed information about ${name}, a company in the ${sector} sector. Include details about their US operations, manufacturing facilities, and supply chain practices.`;
  return getProductContent(prompt);
}

export async function generateCategoryInsights(category: string): Promise<string> {
  const prompt = `Generate insights about the ${category} category in the US market. Include information about major players, market trends, and the importance of US-sourced components in this sector.`;
  return getProductContent(prompt);
}
