#!/usr/bin/env bash

##
## Generates a report to help us ensure we have a documentation folder for each package and that each documentation
## folder has an index.html file. Has non-zero exit code if there are any errors.
##


# Takes two lists of words and echos the words that are in the first list which are missing in the second list.
# Usage: missing_words "word1 word2 word3" "word2 word3 word4"
function missing_words() {
  local words1=($1)
  local words2=($2)
  local missing_words=()
  for word1 in "${words1[@]}"; do
    local found=false
    for word2 in "${words2[@]}"; do
      if [ "$word1" == "$word2" ]; then
        found=true
        break
      fi
    done
    if [ "$found" == false ]; then
      missing_words+=("$word1")
    fi
  done
  echo "${missing_words[@]}"
}

HAS_ERRORS=false

# Use 'ls -d' to get a list of directories in the packages and docs folders. It retains the subfolder structure that we
# care about (e.g. ui/package-name). Could use find, but this is maybe a little easier to reason about.
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd $BASE_DIR/packages/
UI_PACKAGES=$(ls -d ui/*/)
CORE_PACKAGES=$(ls -d core/*/)

cd $BASE_DIR/docs/
CORE_DOCS=$(ls -d core/*/)
UI_DOCS=$(ls -d ui/*/)

# Get a list of packages which are missing a corresponding documentation folder.
MISSING_DOCS=$(missing_words "$CORE_PACKAGES" "$CORE_DOCS")
MISSING_DOCS+=$(missing_words "$UI_PACKAGES" "$UI_DOCS")

if [ ! -z $MISSING_DOCS ]; then
  echo ""
  echo "The following packages are missing documentation folders:"
  for MISSING_DOC in "${MISSING_DOCS[@]}"; do
    echo "  $MISSING_DOC"
  done
  HAS_ERRORS=true
fi

# Inverse of the above (probably a mistake): Get a list of documentation folders which are missing a corresponding package.
MISSING_PACKAGES=$(missing_words "$CORE_DOCS" "$CORE_PACKAGES")
MISSING_PACKAGES+=$(missing_words "$UI_DOCS" "$UI_PACKAGES")

if [ ! -z "$MISSING_PACKAGES" ]; then
  echo ""
  echo "The following documentation folders are missing corresponding package folders (or may be misplaced):"
  for MISSING_PACKAGE in "${MISSING_PACKAGES[@]}"; do
    echo "  $MISSING_PACKAGE"
  done
  HAS_ERRORS=true
fi

# See if any docs are missing an index.html file
MISSING_INDEX_HTML=()
for DOC_SUBDIR in $CORE_DOCS $UI_DOCS; do
  if [ ! -f $BASE_DIR/docs/$DOC_SUBDIR/index.html ]; then
    MISSING_INDEX_HTML+=($DOC_SUBDIR)
  fi
done

if [ ! -z $MISSING_INDEX_HTML ]; then
  echo ""
  echo "The following documentation folders are missing an index.html file:"
  for MISSING_INDEX_HTML_ITEM in "${MISSING_INDEX_HTML[@]}"; do
    echo "  $MISSING_INDEX_HTML_ITEM"
  done
  HAS_ERRORS=true
fi

# Non-zero exit in case we want to use this in a CI pipeline.
if [ "$HAS_ERRORS" == true ]; then
  exit 1
fi
