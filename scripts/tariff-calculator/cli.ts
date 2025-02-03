#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { TariffCalculator } from './calculator.js';
import { TradeCalculation } from './types.js';

const program = new Command();

program
  .name('tariff-calculator')
  .description('CLI tool for calculating tariffs between countries')
  .version('0.1.0');

program
  .command('calculate')
  .description('Calculate tariffs for a trade scenario')
  .requiredOption('--from <country>', 'Country of origin (e.g., MX, CN)')
  .requiredOption('--to <country>', 'Destination country (e.g., CA)')
  .requiredOption('--value <number>', 'Product value')
  .requiredOption('--hs <code>', 'HS code for product classification')
  .option('--freight <number>', 'Freight costs', '0')
  .option('--insurance <number>', 'Insurance costs', '0')
  .option('--currency <code>', 'Currency code', 'USD')
  .action((options) => {
    try {
      const calculator = new TariffCalculator();
      
      const calculation: TradeCalculation = {
        countryFrom: options.from.toUpperCase(),
        countryTo: options.to.toUpperCase(),
        productValue: Number(options.value),
        hsCode: options.hs,
        freightCosts: Number(options.freight),
        insuranceCosts: Number(options.insurance),
        currency: options.currency.toUpperCase()
      };

      const result = calculator.calculateTotalLandedCost(calculation);

      // Print results
      console.log('\n' + chalk.bold('Tariff Calculation Results:'));
      console.log(chalk.dim('─'.repeat(50)));
      
      result.breakdown.forEach(item => {
        console.log(
          chalk.blue(item.description.padEnd(20)),
          chalk.yellow(`${calculation.currency} ${item.amount.toFixed(2)}`.padStart(15))
        );
      });
      
      console.log(chalk.dim('─'.repeat(50)));
      console.log(
        chalk.bold('Total Landed Cost:'.padEnd(20)),
        chalk.bold.green(`${calculation.currency} ${result.totalLandedCost.toFixed(2)}`.padStart(15))
      );
      console.log(
        chalk.bold('Effective Rate:'.padEnd(20)),
        chalk.bold.cyan(`${(result.effectiveRate * 100).toFixed(2)}%`.padStart(15))
      );

    } catch (error) {
      console.error(chalk.red('\nError:'), error instanceof Error ? error.message : 'An unknown error occurred');
      process.exit(1);
    }
  });

program.parse();