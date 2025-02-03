#!/usr/bin/env node
import { persistentCache } from '@/lib/persistentCache';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('cache-cli')
  .description('CLI tool for managing the persistent cache')
  .version('1.0.0');

// Helper function to format bytes
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// Helper function to format duration
function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

// Command to purge all cache entries
program
  .command('purge')
  .description('Purge all cache entries')
  .action(async () => {
    try {
      await persistentCache.clear();
      console.log(chalk.green('✓ Cache purged successfully'));
    } catch (error) {
      console.error(chalk.red('Error purging cache:'), error);
    }
  });

// Command to prune expired entries
program
  .command('prune')
  .description('Remove expired cache entries')
  .action(async () => {
    try {
      const stats = await persistentCache.prune();
      console.log(chalk.green(`✓ Pruned ${stats.pruned} expired entries`));
      console.log(chalk.gray(`  Remaining entries: ${stats.remaining}`));
    } catch (error) {
      console.error(chalk.red('Error pruning cache:'), error);
    }
  });

// Command to delete specific cache key
program
  .command('delete <key>')
  .description('Delete a specific cache entry by key')
  .action(async (key) => {
    try {
      const existed = await persistentCache.has(key);
      await persistentCache.delete(key);
      if (existed) {
        console.log(chalk.green(`✓ Deleted cache entry: ${key}`));
      } else {
        console.log(chalk.yellow(`! Cache entry not found: ${key}`));
      }
    } catch (error) {
      console.error(chalk.red('Error deleting cache entry:'), error);
    }
  });

// Command to view cache statistics
program
  .command('stats')
  .description('View cache statistics')
  .action(async () => {
    try {
      const stats = await persistentCache.getStats();
      console.log(chalk.bold('\nCache Statistics:'));
      console.log('─'.repeat(50));
      console.log(`Total Entries:     ${chalk.cyan(stats.totalEntries)}`);
      console.log(`Storage Used:      ${chalk.cyan(formatBytes(stats.storageUsed))}`);
      console.log(`Hit Rate:          ${chalk.cyan(stats.hitRate.toFixed(2))}%`);
      console.log(`Expired Entries:   ${chalk.yellow(stats.expiredEntries)}`);
      console.log(`Average Age:       ${chalk.cyan(formatDuration(stats.averageAge))}`);
      console.log('─'.repeat(50));
      console.log(chalk.gray(`Last Pruned:       ${new Date(stats.lastPruned).toLocaleString()}`));
    } catch (error) {
      console.error(chalk.red('Error getting cache statistics:'), error);
    }
  });

// Command to test cache operations
program
  .command('test')
  .description('Run cache operation tests')
  .action(async () => {
    console.log(chalk.bold('\nRunning Cache Tests:'));
    console.log('─'.repeat(50));

    try {
      // Test setting and getting
      const testKey = 'test-key';
      const testValue = { message: 'test value', timestamp: Date.now() };
      
      console.log(chalk.gray('Testing set operation...'));
      await persistentCache.set(testKey, testValue);
      console.log(chalk.green('✓ Set operation successful'));

      console.log(chalk.gray('Testing get operation...'));
      const retrieved = await persistentCache.get(testKey);
      if (JSON.stringify(retrieved) === JSON.stringify(testValue)) {
        console.log(chalk.green('✓ Get operation successful'));
      } else {
        console.log(chalk.red('✗ Get operation failed - value mismatch'));
      }

      console.log(chalk.gray('Testing has operation...'));
      const exists = await persistentCache.has(testKey);
      if (exists) {
        console.log(chalk.green('✓ Has operation successful'));
      } else {
        console.log(chalk.red('✗ Has operation failed'));
      }

      console.log(chalk.gray('Testing delete operation...'));
      await persistentCache.delete(testKey);
      const afterDelete = await persistentCache.has(testKey);
      if (!afterDelete) {
        console.log(chalk.green('✓ Delete operation successful'));
      } else {
        console.log(chalk.red('✗ Delete operation failed'));
      }

      console.log('─'.repeat(50));
      console.log(chalk.green('All tests completed successfully'));
    } catch (error) {
      console.error(chalk.red('Error during tests:'), error);
    }
  });

// Command to list all cache keys
program
  .command('list')
  .description('List all cache keys')
  .option('-p, --pattern <pattern>', 'Filter keys by pattern')
  .action(async (options) => {
    try {
      const keys = await persistentCache.keys(options.pattern);
      if (keys.length === 0) {
        console.log(chalk.yellow('No cache entries found'));
        return;
      }

      console.log(chalk.bold('\nCache Keys:'));
      console.log('─'.repeat(50));
      for (const key of keys) {
        const value = await persistentCache.get(key);
        const size = formatBytes(JSON.stringify(value).length);
        console.log(`${chalk.cyan(key)} (${chalk.gray(size)})`);
      }
      console.log('─'.repeat(50));
      console.log(chalk.gray(`Total entries: ${keys.length}`));
    } catch (error) {
      console.error(chalk.red('Error listing cache keys:'), error);
    }
  });

program.parse();