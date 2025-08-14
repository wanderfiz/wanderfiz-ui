#!/bin/bash

# Health check script for wanderfiz-ui deployment
# Verifies that the deployed frontend is working correctly

set -e

# Configuration
HEALTH_CHECK_TIMEOUT=${HEALTH_CHECK_TIMEOUT:-300}  # 5 minutes
RETRY_INTERVAL=${RETRY_INTERVAL:-10}               # 10 seconds
MAX_RETRIES=$((HEALTH_CHECK_TIMEOUT / RETRY_INTERVAL))

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date -u '+%Y-%m-%d %H:%M:%S UTC')
    
    case $level in
        "INFO")
            echo -e "${timestamp} [${GREEN}INFO${NC}] $message"
            ;;
        "WARN")
            echo -e "${timestamp} [${YELLOW}WARN${NC}] $message"
            ;;
        "ERROR")
            echo -e "${timestamp} [${RED}ERROR${NC}] $message"
            ;;
    esac
}

# Check if URL is provided
if [[ $# -eq 0 ]]; then
    log "ERROR" "Usage: $0 <base_url>"
    log "ERROR" "Example: $0 https://dev-wanderfiz.com"
    exit 1
fi

BASE_URL=$1

# Remove trailing slash
BASE_URL=${BASE_URL%/}

log "INFO" "Starting health checks for: $BASE_URL"
log "INFO" "Timeout: ${HEALTH_CHECK_TIMEOUT}s, Retry interval: ${RETRY_INTERVAL}s"

# Health check functions
check_basic_connectivity() {
    local url="$BASE_URL"
    
    log "INFO" "Checking basic connectivity to $url"
    
    if curl -f -s --max-time 10 "$url" > /dev/null; then
        log "INFO" "✅ Basic connectivity check passed"
        return 0
    else
        log "WARN" "❌ Basic connectivity check failed"
        return 1
    fi
}

check_health_endpoint() {
    local health_url="$BASE_URL/health"
    
    log "INFO" "Checking health endpoint: $health_url"
    
    local response
    response=$(curl -f -s --max-time 10 "$health_url" 2>/dev/null || echo "")
    
    if [[ "$response" == *"healthy"* ]] || [[ "$response" == *"ok"* ]]; then
        log "INFO" "✅ Health endpoint check passed"
        return 0
    else
        log "WARN" "❌ Health endpoint check failed. Response: $response"
        return 1
    fi
}

check_static_assets() {
    local assets_url="$BASE_URL/assets"
    
    log "INFO" "Checking static assets availability"
    
    # Check if we can access the assets directory (should return some content)
    if curl -f -s -I --max-time 10 "$assets_url" > /dev/null 2>&1; then
        log "INFO" "✅ Static assets check passed"
        return 0
    else
        log "WARN" "❌ Static assets check failed"
        return 1
    fi
}

check_api_connectivity() {
    # This checks if the frontend can reach the API Gateway
    # In development, this might be localhost; in production, it goes through Cloudflare
    local api_base_url
    
    case "$BASE_URL" in
        *"dev-wanderfiz.com"*)
            api_base_url="https://dev-api.wanderfiz.com"
            ;;
        *"stg-wanderfiz.com"*)
            api_base_url="https://stg-api.wanderfiz.com"
            ;;
        *"uat-wanderfiz.com"*)
            api_base_url="https://uat-api.wanderfiz.com"
            ;;
        *"wanderfiz.com"*)
            api_base_url="https://api.wanderfiz.com"
            ;;
        *)
            api_base_url="http://localhost:8443"  # Local development
            ;;
    esac
    
    log "INFO" "Checking API connectivity to: $api_base_url"
    
    # Check API health endpoint
    local api_health_url="$api_base_url/actuator/health"
    
    if curl -f -s -k --max-time 10 "$api_health_url" > /dev/null; then
        log "INFO" "✅ API connectivity check passed"
        return 0
    else
        log "WARN" "❌ API connectivity check failed"
        return 1
    fi
}

check_response_time() {
    local url="$BASE_URL"
    
    log "INFO" "Checking response time"
    
    local response_time
    response_time=$(curl -o /dev/null -s -w '%{time_total}' --max-time 10 "$url" 2>/dev/null || echo "999")
    
    # Convert to milliseconds for easier reading
    local response_time_ms
    response_time_ms=$(echo "$response_time * 1000" | bc 2>/dev/null || echo "999000")
    
    if (( $(echo "$response_time < 5.0" | bc -l) )); then
        log "INFO" "✅ Response time check passed: ${response_time_ms}ms"
        return 0
    else
        log "WARN" "❌ Response time too slow: ${response_time_ms}ms (threshold: 5000ms)"
        return 1
    fi
}

# Main health check function
run_health_checks() {
    local retry_count=0
    local all_checks_passed=false
    
    while [[ $retry_count -lt $MAX_RETRIES ]]; do
        local checks_passed=0
        local total_checks=5
        
        retry_count=$((retry_count + 1))
        log "INFO" "Health check attempt $retry_count/$MAX_RETRIES"
        
        # Run all health checks
        check_basic_connectivity && checks_passed=$((checks_passed + 1))
        check_health_endpoint && checks_passed=$((checks_passed + 1))
        check_static_assets && checks_passed=$((checks_passed + 1))
        check_api_connectivity && checks_passed=$((checks_passed + 1))
        check_response_time && checks_passed=$((checks_passed + 1))
        
        log "INFO" "Checks passed: $checks_passed/$total_checks"
        
        # All checks must pass for success
        if [[ $checks_passed -eq $total_checks ]]; then
            all_checks_passed=true
            break
        fi
        
        if [[ $retry_count -lt $MAX_RETRIES ]]; then
            log "WARN" "Some checks failed, retrying in ${RETRY_INTERVAL}s..."
            sleep $RETRY_INTERVAL
        fi
    done
    
    if [[ $all_checks_passed == true ]]; then
        log "INFO" "🎉 All health checks passed!"
        return 0
    else
        log "ERROR" "❌ Health checks failed after $MAX_RETRIES attempts"
        return 1
    fi
}

# Performance check (additional verification)
run_performance_check() {
    log "INFO" "Running performance verification"
    
    local url="$BASE_URL"
    local total_time=0
    local request_count=5
    
    for i in $(seq 1 $request_count); do
        local response_time
        response_time=$(curl -o /dev/null -s -w '%{time_total}' --max-time 10 "$url" 2>/dev/null || echo "10")
        total_time=$(echo "$total_time + $response_time" | bc -l)
        log "INFO" "Request $i: ${response_time}s"
    done
    
    local avg_time
    avg_time=$(echo "scale=3; $total_time / $request_count" | bc -l)
    local avg_time_ms
    avg_time_ms=$(echo "$avg_time * 1000" | bc 2>/dev/null || echo "0")
    
    log "INFO" "Average response time over $request_count requests: ${avg_time_ms}ms"
    
    if (( $(echo "$avg_time < 2.0" | bc -l) )); then
        log "INFO" "✅ Performance check passed"
        return 0
    else
        log "WARN" "⚠️  Performance check warning: Average response time is high"
        return 1
    fi
}

# Main execution
main() {
    log "INFO" "============================================"
    log "INFO" "Frontend Health Check Started"
    log "INFO" "============================================"
    
    # Run comprehensive health checks
    if run_health_checks; then
        log "INFO" "✅ Health checks completed successfully"
        
        # Run performance verification
        run_performance_check
        
        log "INFO" "============================================"
        log "INFO" "🎉 Frontend deployment verification completed!"
        log "INFO" "✅ Service is healthy and ready to serve traffic"
        log "INFO" "============================================"
        exit 0
    else
        log "ERROR" "============================================"
        log "ERROR" "❌ Frontend deployment verification failed!"
        log "ERROR" "❌ Service is not ready to serve traffic"
        log "ERROR" "============================================"
        exit 1
    fi
}

# Handle script interruption
trap 'log "WARN" "Health check interrupted"; exit 130' INT TERM

# Run main function
main