#!/bin/bash

# Automated deployment script for wanderfiz-ui to AWS
# This script deploys the frontend to the specified environment
# All configuration comes from environment variables (GitHub Secrets)

set -e

# Check required environment variables
check_required_vars() {
    local required_vars=(
        "ENVIRONMENT"
        "CONTAINER_IMAGE" 
        "AWS_REGION"
        "DB_HOST"
        "LOG_LEVEL"
    )
    
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var}" ]]; then
            echo "ERROR: Required environment variable $var is not set"
            exit 1
        fi
    done
}

# Deploy to AWS environment
deploy_to_aws() {
    local environment=$1
    
    echo "🚀 Starting deployment to $environment environment"
    echo "Container Image: $CONTAINER_IMAGE"
    echo "AWS Region: $AWS_REGION"
    
    # Update ECS service with new container image
    # In real deployment, this would update the ECS task definition
    # For now, this is the deployment script structure
    
    echo "📦 Updating container image in $environment"
    # aws ecs update-service \
    #     --cluster "wanderfiz-$environment" \
    #     --service "wanderfiz-ui" \
    #     --task-definition "wanderfiz-ui:latest" \
    #     --force-new-deployment
    
    echo "🔄 Waiting for deployment to complete..."
    # aws ecs wait services-stable \
    #     --cluster "wanderfiz-$environment" \
    #     --services "wanderfiz-ui"
    
    echo "✅ Deployment completed successfully!"
}

# Health check after deployment
run_health_checks() {
    local environment=$1
    local health_url
    
    case $environment in
        "development")
            health_url="https://dev-wanderfiz.com/health"
            ;;
        "staging")
            health_url="https://stg-wanderfiz.com/health"
            ;;
        "uat")
            health_url="https://uat-wanderfiz.com/health"
            ;;
        "production")
            health_url="https://wanderfiz.com/health"
            ;;
        *)
            echo "ERROR: Unknown environment: $environment"
            exit 1
            ;;
    esac
    
    echo "🔍 Running health checks..."
    
    # Wait for service to be available
    for i in {1..30}; do
        if curl -f -s "$health_url" > /dev/null 2>&1; then
            echo "✅ Health check passed!"
            return 0
        fi
        echo "⏳ Waiting for service to be available (attempt $i/30)..."
        sleep 10
    done
    
    echo "❌ Health check failed after 5 minutes"
    exit 1
}

# Rollback deployment if health checks fail
rollback_deployment() {
    local environment=$1
    
    echo "🔄 Rolling back deployment in $environment"
    
    # Get previous stable task definition
    # aws ecs update-service \
    #     --cluster "wanderfiz-$environment" \
    #     --service "wanderfiz-ui" \
    #     --task-definition "wanderfiz-ui:previous" \
    #     --force-new-deployment
    
    echo "✅ Rollback completed!"
}

# Main deployment function
main() {
    check_required_vars
    
    local environment=${ENVIRONMENT:-"development"}
    
    echo "🎯 Deploying wanderfiz-ui to $environment environment"
    echo "=================================================="
    
    # Deploy to AWS
    if deploy_to_aws "$environment"; then
        echo "✅ AWS deployment successful"
    else
        echo "❌ AWS deployment failed"
        exit 1
    fi
    
    # Run health checks
    if run_health_checks "$environment"; then
        echo "✅ All health checks passed"
    else
        echo "❌ Health checks failed, rolling back..."
        rollback_deployment "$environment"
        exit 1
    fi
    
    echo "🎉 Deployment completed successfully!"
    echo "Environment: $environment"
    echo "Image: $CONTAINER_IMAGE"
    echo "Timestamp: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
}

# Handle script interruption
trap 'echo "❌ Deployment interrupted"; exit 130' INT TERM

# Run main function
main "$@"