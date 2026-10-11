set -e
SUITE="${1:-all}"
case "$SUITE" in
  all)
    shift 2>/dev/null || true
    echo "==> Running ALL tests (args: $@)"
    exec npx playwright test "$@"
    ;;
  sanity|regression)
    shift
    echo "==> Running '$SUITE' tests (args: $@)"
    exec npm run "test:${SUITE}" -- "$@"
    ;;
  *)
    echo "Error: Unknown test suite '$SUITE'"
    echo ""
    echo "Usage: $0 {all|sanity|regression} [playwright
-args...]"
    echo ""
    echo "Available test suites:"
    echo "  all         Run all tests (default)"
    echo "  sanity      Run sanity tests  (@sanity)"
    echo "  regression  Run regression tests (@regression)"
    exit 1
    ;;
esac