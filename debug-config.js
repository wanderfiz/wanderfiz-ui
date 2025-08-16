// Quick config debug script
import { config } from './src/config/environment.ts';

console.log('Environment Configuration:');
console.log('AWS Region:', config.aws.region);
console.log('User Pool ID:', config.aws.cognito.userPoolId);
console.log('Client ID:', config.aws.cognito.clientId);
console.log('Domain:', config.aws.cognito.domain);
console.log('API Gateway URL:', config.api.gatewayUrl);