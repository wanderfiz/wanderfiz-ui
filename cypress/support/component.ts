import './commands';
import { mount } from 'cypress/react18';

// Import global styles
import '../../src/index.css';

// Augment the Cypress namespace to include type definitions for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);