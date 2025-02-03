#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print with color
print_color() {
  local color=$1
  local message=$2
  echo -e "${color}${message}${NC}"
}

# Function to check if node and npm are installed
check_dependencies() {
  if ! command -v node &> /dev/null; then
    print_color "$RED" "Error: Node.js is not installed"
    exit 1
  fi

  if ! command -v npm &> /dev/null; then
    print_color "$RED" "Error: npm is not installed"
    exit 1
  fi
}

# Function to clear the cache
clear_cache() {
  print_color "$YELLOW" "Clearing persistent cache..."
  node -e "
    const { persistentCache } = require('./src/lib/persistentCache');
    persistentCache.clear().then(() => {
      console.log('Cache cleared successfully');
    }).catch(console.error);
  "
}

# Function to test the cache
test_cache() {
  print_color "$YELLOW" "Testing cache functionality..."
  node -e "
    const { persistentCache } = require('./src/lib/persistentCache');
    
    async function testCache() {
      try {
        // Test setting a value
        await persistentCache.set('test-key', { value: 'test-value' });
        console.log('✓ Set operation successful');
        
        // Test getting the value
        const value = await persistentCache.get('test-key');
        if (value?.value === 'test-value') {
          console.log('✓ Get operation successful');
        } else {
          throw new Error('Get operation failed');
        }
        
        // Test deleting the value
        await persistentCache.delete('test-key');
        console.log('✓ Delete operation successful');
        
        // Verify deletion
        const deleted = await persistentCache.get('test-key');
        if (!deleted) {
          console.log('✓ Verification successful');
        } else {
          throw new Error('Verification failed');
        }
        
        console.log('\nAll cache tests passed successfully!');
      } catch (error) {
        console.error('Cache test failed:', error);
        process.exit(1);
      }
    }
    
    testCache();
  "
}

# Function to pre-generate and cache content
generate_content() {
  print_color "$YELLOW" "Pre-generating and caching content..."
  node -e "
    const { generateCategoryInsights, generateCompanyDetails, generateProductDescription } = require('./src/lib/generateProductContent');
    const { consumerProducts, consumerCompanies } = require('./src/data/sectors/consumer');
    const { groceryProducts, groceryCompanies } = require('./src/data/sectors/groceries');
    const { healthcareCompanies } = require('./src/data/sectors/healthcare');
    const { technologyCompanies } = require('./src/data/sectors/technology');
    
    async function generateAllContent() {
      const sectors = ['Consumer', 'Groceries', 'Healthcare', 'Technology'];
      const regions = ['Europe', 'Asia', 'South America', 'Africa', 'Oceania'];
      
      try {
        // Generate sector overviews
        console.log('\nGenerating sector overviews...');
        await Promise.all(sectors.map(async sector => {
          await generateCategoryInsights(sector);
          console.log(\`✓ Generated content for \${sector} sector\`);
        }));
        
        // Generate company details
        console.log('\nGenerating company details...');
        const allCompanies = [
          ...consumerCompanies.map(c => ({ ...c, sector: 'Consumer' })),
          ...groceryCompanies.map(c => ({ ...c, sector: 'Groceries' })),
          ...healthcareCompanies.map(c => ({ ...c, sector: 'Healthcare' })),
          ...technologyCompanies.map(c => ({ ...c, sector: 'Technology' }))
        ];
        
        await Promise.all(allCompanies.map(async company => {
          await generateCompanyDetails(company.name, company.sector);
          console.log(\`✓ Generated content for company: \${company.name}\`);
        }));
        
        // Generate product descriptions
        console.log('\nGenerating product descriptions...');
        const allProducts = [...consumerProducts, ...groceryProducts];
        await Promise.all(allProducts.map(async product => {
          await generateProductDescription(product.name, product.category);
          console.log(\`✓ Generated content for product: \${product.name}\`);
        }));
        
        console.log('\nContent generation completed successfully!');
      } catch (error) {
        console.error('Content generation failed:', error);
        process.exit(1);
      }
    }
    
    generateAllContent();
  "
}

# Function to show cache stats
show_stats() {
  print_color "$YELLOW" "Fetching cache statistics..."
  node -e "
    const { persistentCache } = require('./src/lib/persistentCache');
    
    async function showStats() {
      try {
        const stats = await persistentCache.getStats();
        console.log('\nCache Statistics:');
        console.log('-----------------');
        console.log(\`Total Items: \${stats.totalItems}\`);
        console.log(\`Total Size: \${(stats.totalSize / 1024 / 1024).toFixed(2)} MB\`);
        console.log(\`Hit Rate: \${(stats.hitRate * 100).toFixed(2)}%\`);
        console.log(\`Miss Rate: \${((1 - stats.hitRate) * 100).toFixed(2)}%\`);
        console.log(\`Average Response Time: \${stats.avgResponseTime.toFixed(2)}ms\`);
      } catch (error) {
        console.error('Failed to fetch cache statistics:', error);
        process.exit(1);
      }
    }
    
    showStats();
  "
}

# Function to show usage
show_usage() {
  echo "Usage: ./cache-cli.sh [command]"
  echo ""
  echo "Commands:"
  echo "  clear    - Clear the persistent cache"
  echo "  test     - Run cache functionality tests"
  echo "  generate - Pre-generate and cache content for all pages"
  echo "  stats    - Show cache statistics"
  echo "  help     - Show this help message"
}

# Main script logic
check_dependencies

case "$1" in
  "clear")
    clear_cache
    ;;
  "test")
    test_cache
    ;;
  "generate")
    generate_content
    ;;
  "stats")
    show_stats
    ;;
  "help"|"")
    show_usage
    ;;
  *)
    print_color "$RED" "Error: Unknown command '$1'"
    show_usage
    exit 1
    ;;
esac
