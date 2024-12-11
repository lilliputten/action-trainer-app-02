#!/bin/sh
# @desc Initialize publish syncing repository
# @changed 2024.12.11, 18:52

scriptsPath=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
rootPath=`dirname "$scriptsPath"`
prjPath="$rootPath" # `pwd`

# Import config variables (expected variable `$PUBLISH_FOLDER`)...
test -f "$scriptsPath/config.sh" && . "$scriptsPath/config.sh"
test -f "$scriptsPath/config-local.sh" && . "$scriptsPath/config-local.sh"

# Check basic required variables...
test -f "$rootPath/config-check.sh" && . "$rootPath/config-check.sh" --omit-publish-folder-check

# Publish folder should be absent...
. "$scriptsPath/publish-check-absent-folder.sh"

echo "Initializing publish folder & submodule '$PUBLISH_FOLDER' (for '$PUBLISH_BRANCH' branch)..."

DIST_REPO=`git config --get remote.origin.url`

echo "Create publish branch and submodule with $DIST_REPO ..."
touch ".gitmodules" && \
  git submodule add -f "$DIST_REPO" "$PUBLISH_FOLDER" && \
  git rm --cached -f "$PUBLISH_FOLDER" ".gitmodules" && \
  test ! -z "$PUBLISH_BRANCH" && ( \
    cd "$PUBLISH_FOLDER" && \
    echo "Creating orhpaned branch '$PUBLISH_BRANCH'..." && \
    git checkout --orphan "$PUBLISH_BRANCH" && \
    echo "Cleaning up exsting files..." && \
    git rm -rf ".*" && \
    git rm -rf "*" && \
    echo "Commiting..." && \
    git commit -a --allow-empty -m "Initial orphaned $PUBLISH_BRANCH branch" && \
    echo "Pushing..." && \
    git push --set-upstream origin "$PUBLISH_BRANCH" && \
    cd .. \
  ) && \
  echo OK
