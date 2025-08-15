#!/bin/bash

# Code Analysis Script using scc
# Usage: ./scripts/code-analysis.sh [options]
# Options:
#   --detailed    Show detailed file-by-file breakdown
#   --complexity  Focus on complexity analysis
#   --json        Output in JSON format
#   --help        Show this help message

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Default values
DETAILED=false
COMPLEXITY_FOCUS=false
JSON_OUTPUT=false
SHOW_HELP=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --detailed)
            DETAILED=true
            shift
            ;;
        --complexity)
            COMPLEXITY_FOCUS=true
            shift
            ;;
        --json)
            JSON_OUTPUT=true
            shift
            ;;
        --help)
            SHOW_HELP=true
            shift
            ;;
        *)
            echo "Unknown option $1"
            exit 1
            ;;
    esac
done

# Show help
if [ "$SHOW_HELP" = true ]; then
    echo -e "${BLUE}Code Analysis Script${NC}"
    echo ""
    echo "Usage: ./scripts/code-analysis.sh [options]"
    echo ""
    echo "Options:"
    echo "  --detailed    Show detailed file-by-file breakdown"
    echo "  --complexity  Focus on complexity analysis"
    echo "  --json        Output in JSON format"
    echo "  --help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./scripts/code-analysis.sh                    # Basic analysis"
    echo "  ./scripts/code-analysis.sh --detailed         # Detailed breakdown"
    echo "  ./scripts/code-analysis.sh --complexity       # Complexity focus"
    echo "  ./scripts/code-analysis.sh --json > stats.json # JSON output"
    exit 0
fi

# Check if scc is installed
if ! command -v scc &> /dev/null; then
    echo -e "${RED}Error: scc is not installed${NC}"
    echo "Install it with: brew install scc (macOS) or go install github.com/boyter/scc/v3@latest"
    exit 1
fi

# Function to print section header
print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════════════════════${NC}"
}

# Function to calculate percentages and ratios
calculate_metrics() {
    local scc_output="$1"
    
    # Extract totals using awk
    local total_lines=$(echo "$scc_output" | grep "^Total" | awk '{print $3}')
    local total_blanks=$(echo "$scc_output" | grep "^Total" | awk '{print $4}')
    local total_comments=$(echo "$scc_output" | grep "^Total" | awk '{print $5}')
    local total_code=$(echo "$scc_output" | grep "^Total" | awk '{print $6}')
    local total_complexity=$(echo "$scc_output" | grep "^Total" | awk '{print $7}')
    
    if [ "$total_code" -gt 0 ]; then
        local comment_ratio=$(echo "scale=1; $total_comments * 100 / $total_code" | bc -l)
        local blank_ratio=$(echo "scale=1; $total_blanks * 100 / $total_lines" | bc -l)
        local complexity_per_line=$(echo "scale=2; $total_complexity / $total_code" | bc -l)
        
        echo -e "${CYAN}Code Quality Metrics:${NC}"
        echo -e "  Comment Ratio: ${YELLOW}${comment_ratio}%${NC} (Industry standard: 10-20%)"
        echo -e "  Blank Line Ratio: ${YELLOW}${blank_ratio}%${NC} (Good readability: 15-25%)"
        echo -e "  Complexity per Line: ${YELLOW}${complexity_per_line}${NC} (Lower is better)"
        
        # Quality assessment
        echo -e "\n${CYAN}Quality Assessment:${NC}"
        if (( $(echo "$comment_ratio < 10" | bc -l) )); then
            echo -e "  Comments: ${RED}Low${NC} - Consider adding more documentation"
        elif (( $(echo "$comment_ratio > 20" | bc -l) )); then
            echo -e "  Comments: ${YELLOW}High${NC} - Good documentation, check for over-commenting"
        else
            echo -e "  Comments: ${GREEN}Good${NC} - Well documented code"
        fi
        
        if (( $(echo "$complexity_per_line < 0.1" | bc -l) )); then
            echo -e "  Complexity: ${GREEN}Low${NC} - Very maintainable code"
        elif (( $(echo "$complexity_per_line > 0.2" | bc -l) )); then
            echo -e "  Complexity: ${RED}High${NC} - Consider refactoring complex functions"
        else
            echo -e "  Complexity: ${YELLOW}Moderate${NC} - Reasonably maintainable"
        fi
    fi
}

# Function to show language breakdown with percentages
show_language_breakdown() {
    local scc_output="$1"
    local total_code=$(echo "$scc_output" | grep "^Total" | awk '{print $6}')
    
    echo -e "${CYAN}Language Distribution:${NC}"
    echo "$scc_output" | grep -v "^Total" | grep -v "^─" | grep -v "^Language" | while read -r line; do
        if [[ -n "$line" && "$line" != *"Estimated"* && "$line" != *"Processed"* ]]; then
            local lang=$(echo "$line" | awk '{print $1}')
            local code=$(echo "$line" | awk '{print $6}')
            if [[ "$code" =~ ^[0-9]+$ ]] && [ "$total_code" -gt 0 ]; then
                local percentage=$(echo "scale=1; $code * 100 / $total_code" | bc -l)
                echo -e "  ${lang}: ${YELLOW}${percentage}%${NC} (${code} lines)"
            fi
        fi
    done
}

# Main analysis function
run_analysis() {
    local project_name=$(basename "$(pwd)")
    
    print_header "📊 Code Analysis Report for: $project_name"
    echo -e "Generated on: ${YELLOW}$(date)${NC}"
    echo -e "Directory: ${YELLOW}$(pwd)${NC}"
    
    if [ "$JSON_OUTPUT" = true ]; then
        print_header "📋 Raw Data (JSON Format)"
        scc --format json
        return
    fi
    
    # Get basic scc output
    local scc_basic=$(scc)
    
    print_header "📈 Basic Statistics"
    echo "$scc_basic"
    
    # Calculate and show metrics
    print_header "🎯 Quality Metrics"
    calculate_metrics "$scc_basic"
    
    # Show language breakdown
    print_header "🌐 Language Breakdown"
    show_language_breakdown "$scc_basic"
    
    if [ "$COMPLEXITY_FOCUS" = true ]; then
        print_header "🧠 Complexity Analysis"
        echo -e "${CYAN}Most Complex Files:${NC}"
        scc --by-file --sort complexity | head -20
        
        echo -e "\n${CYAN}Complexity by Language:${NC}"
        scc --sort complexity
    fi
    
    if [ "$DETAILED" = true ]; then
        print_header "📁 Detailed File Breakdown"
        echo -e "${CYAN}Largest Files by Code Lines:${NC}"
        scc --by-file --sort code | head -20
        
        echo -e "\n${CYAN}Files with Most Comments:${NC}"
        scc --by-file --sort comments | head -10
    fi
    
    # Project insights
    print_header "💡 Project Insights"
    local total_files=$(echo "$scc_basic" | grep "^Total" | awk '{print $2}')
    local total_code=$(echo "$scc_basic" | grep "^Total" | awk '{print $6}')
    local avg_lines_per_file=$(echo "scale=0; $total_code / $total_files" | bc -l)
    
    echo -e "${CYAN}Project Size Assessment:${NC}"
    if [ "$total_code" -lt 1000 ]; then
        echo -e "  Size: ${GREEN}Small${NC} ($total_code lines) - Easy to maintain"
    elif [ "$total_code" -lt 10000 ]; then
        echo -e "  Size: ${YELLOW}Medium${NC} ($total_code lines) - Well manageable"
    elif [ "$total_code" -lt 100000 ]; then
        echo -e "  Size: ${YELLOW}Large${NC} ($total_code lines) - Requires good organization"
    else
        echo -e "  Size: ${RED}Very Large${NC} ($total_code lines) - Consider modularization"
    fi
    
    echo -e "  Average lines per file: ${YELLOW}${avg_lines_per_file}${NC}"
    if [ "$avg_lines_per_file" -lt 100 ]; then
        echo -e "  File organization: ${GREEN}Excellent${NC} - Small, focused files"
    elif [ "$avg_lines_per_file" -lt 300 ]; then
        echo -e "  File organization: ${YELLOW}Good${NC} - Reasonable file sizes"
    else
        echo -e "  File organization: ${RED}Consider refactoring${NC} - Large files detected"
    fi
    
    # Recommendations
    print_header "🚀 Recommendations"
    local comment_ratio=$(echo "$scc_basic" | grep "^Total" | awk '{
        total_comments = $5
        total_code = $6
        if (total_code > 0) print total_comments * 100 / total_code
        else print 0
    }')
    
    if (( $(echo "$comment_ratio < 10" | bc -l) )); then
        echo -e "  ${YELLOW}•${NC} Add more inline comments and documentation"
    fi
    
    if [ "$total_files" -gt 50 ] && [ "$avg_lines_per_file" -gt 200 ]; then
        echo -e "  ${YELLOW}•${NC} Consider breaking down larger files into smaller modules"
    fi
    
    echo -e "  ${GREEN}•${NC} Run with --detailed for file-by-file analysis"
    echo -e "  ${GREEN}•${NC} Run with --complexity to identify complex code areas"
    echo -e "  ${GREEN}•${NC} Use --json to export data for further analysis"
}

# Run the analysis
run_analysis
