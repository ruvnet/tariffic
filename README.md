# Welcome to Tariffic

Tariffic helps users discover and explore non-American alternatives to companies and products across various industries. Whether you're looking to diversify your supply chain, find local alternatives, or explore global options, Tariffic makes it easy to discover companies from around the world.

## Features

### Core Features
- 🔍 Search across multiple industries and sectors
- 🌍 Find non-American alternatives to popular companies
- 📊 Compare company profiles and market impact
- 📈 View detailed supply chain information
- 🌐 Explore companies by region and country
- 💹 Access GDP impact data for different sectors

### Advanced Features

#### 🧮 Tariff Calculator
- Calculate total landed costs including duties, VAT, and fees
- Intelligent HS code lookup using LLM integration
- Support for multiple currencies and countries
- Detailed cost breakdown and visualization
- CLI tool for batch processing and automation

#### 🤖 AI-Enhanced Analysis
- AI-powered insights using OpenRouter API
- Sector and company analysis
- Market impact assessment
- Intelligent product classification
- Customizable analysis parameters

#### 📦 Smart Caching System
- Client-side persistent caching
- Efficient LLM response storage
- Automatic cache invalidation
- Version-based cache management
- Configurable TTL (Time To Live)
- Storage limit management

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- OpenRouter API key (for AI features)

### Environment Setup
Create a `.env` file in the root directory:
```env
VITE_OPENROUTER_API_KEY=your_api_key_here
```

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Using the Live Demo
Visit [Tariffic](https://lovable.dev/projects/3b0de4b0-aa31-47b8-b762-7023dffc24ea) to explore the application.

## Usage

### Tariff Calculator
1. Navigate to the Calculator page
2. Enter product details and trade information
3. Get instant calculations for duties and total landed costs
4. View detailed cost breakdowns and visualizations

### AI Analysis
1. Access the AI Enhancer component
2. Enter your OpenRouter API key
3. Select analysis type (sector, company, or product)
4. View AI-generated insights and recommendations

### Search and Discovery
1. Use the unified search bar to find companies or products
2. Filter results by sector, region, or category
3. View detailed company profiles and alternatives
4. Access supply chain and GDP impact data

## Technology Stack

- ⚡️ Vite - Next Generation Frontend Tooling
- ⚛️ React - A JavaScript library for building user interfaces
- 🎨 Tailwind CSS - A utility-first CSS framework
- 🎯 TypeScript - JavaScript with syntax for types
- 🎪 shadcn/ui - Beautifully designed components
- 🔄 Tanstack Query - Powerful asynchronous state management
- 🤖 OpenRouter API - AI integration for enhanced analysis
- 💾 Custom Caching System - Efficient data storage and retrieval

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  │   ├── ui/        # shadcn/ui components
  │   └── AIEnhancer # AI analysis component
  ├── data/          # Static data and mock APIs
  ├── hooks/         # Custom React hooks
  ├── lib/           # Utility functions and services
  │   ├── cache.ts   # Caching system
  │   └── utils.ts   # Helper functions
  ├── pages/         # Route components
  ├── types/         # TypeScript definitions
  └── features/      # Feature-specific code
      └── calculator/ # Tariff calculator

scripts/
  └── tariff-calculator/ # CLI tools for tariff calculation
```

## CLI Tools

### Tariff Calculator CLI
```sh
# Calculate tariffs for a single product
npm run calc -- calculate --product-value 1000 --country-from US --country-to CA

# Lookup HS codes
npm run calc -- lookup-hs "cotton t-shirt"

# Get tariff rates
npm run calc -- get-rate --hs-code 610910 --from US --to CA
```

## Customization

1. Modify categories and sectors in `src/data/`
2. Update company information structure in `src/types/`
3. Customize UI components in `src/components/`
4. Configure caching behavior in `src/lib/cache.ts`
5. Adjust AI parameters in `src/components/AIEnhancer.tsx`

## Deployment

### Quick Deploy
Open [Lovable](https://lovable.dev/projects/3b0de4b0-aa31-47b8-b762-7023dffc24ea) and click on Share -> Publish.

### Custom Domain
While we don't support custom domains directly, you can deploy to Netlify or other providers. Visit our [Custom domains documentation](https://docs.lovable.dev/tips-tricks/custom-domain/) for more details.

## Contributing

Feel free to fork this template and customize it for your needs. If you make improvements that could benefit others, consider submitting a pull request!

## License

This project is open-source and available under the MIT License.
