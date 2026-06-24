#!/bin/bash

GREEN='\e[32m'
RED='\e[31m'
BOLD='\e[1m'
ENDSTYLE='\e[0m'

run() {
	echo -e "❯❯❯❯ $1..."
	($2 > /dev/null)
	echo -e "${GREEN}  ✅ done${ENDSTYLE}"
}

true > checkLog.out
true > checkError.out

runInWorkspace() {
	echo -e "╰┈➤ $1..."
	echo -e "╰┈➤ $1" >> checkLog.out
	echo -e "╰┈➤ $1" >> checkError.out
	eval "yarn workspace $2 run $3 >> checkLog.out 2>>checkError.out"
	exitStatus=$?
	if [ $exitStatus -eq 0 ]; then
		echo -e "${GREEN}  ✅ done${ENDSTYLE}"
	else
		echo -e "${RED}${BOLD}  ❌ An error occurs!!!"
		echo -e "  ❌ Look at checkError.out for more informations${ENDSTYLE}"
	fi
}

# Global install
run "global install" "yarn"

# 3d
echo -e ""
echo -e "❯❯❯❯ @tanatloc/3d"
runInWorkspace "depcheck" "@tanatloc/3d" "depcheck"
runInWorkspace "lint" "@tanatloc/3d" "lint"
runInWorkspace "prettier" "@tanatloc/3d" "prettier"
runInWorkspace "doc" "@tanatloc/3d" "doc"
runInWorkspace "test" "@tanatloc/3d" "test"
runInWorkspace "build" "@tanatloc/3d" "build"

# converters
echo -e ""
echo -e "❯❯❯❯ @tanatloc/converters"
runInWorkspace "format" "@tanatloc/converters" "format"
runInWorkspace "cppcheck" "@tanatloc/converters" "cppcheck"
runInWorkspace "shellcheck" "@tanatloc/converters" "shellcheck"
runInWorkspace "build" "@tanatloc/converters" "build"
runInWorkspace "test" "@tanatloc/converters" "test"
runInWorkspace "coverage" "@tanatloc/converters" "coverage"

# core
echo -e ""
echo -e "❯❯❯❯ @tanatloc/core"
runInWorkspace "depcheck" "@tanatloc/core" "depcheck"
runInWorkspace "prettier" "@tanatloc/core" "prettier"
runInWorkspace "lint" "@tanatloc/core" "lint"
runInWorkspace "doc" "@tanatloc/core" "doc"
runInWorkspace "test" "@tanatloc/core" "test"
runInWorkspace "prestart" "@tanatloc/core" "prestart"
runInWorkspace "build" "@tanatloc/core" "build"
NEXT_PUBLIC_SERVER_MODE=frontpage runInWorkspace "export" "@tanatloc/core" "build"

# docker
echo -e ""
echo -e "❯❯❯❯ @tanatloc/docker"
runInWorkspace "format" "@tanatloc/docker" "dockercheck"

# electron
echo -e ""
echo -e "❯❯❯❯ @tanatloc/electron"
runInWorkspace "depcheck" "@tanatloc/electron" "depcheck"
runInWorkspace "prettier" "@tanatloc/electron" "prettier"
runInWorkspace "doc" "@tanatloc/electron" "doc"
runInWorkspace "test" "@tanatloc/electron" "test"
BUILD_VERSION="test" runInWorkspace "dist" "@tanatloc/electron" "dist"

# formula-validator
echo -e ""
echo -e "❯❯❯❯ @tanatloc/formula-validator"
runInWorkspace "depcheck" "@tanatloc/formula-validator" "depcheck"
runInWorkspace "depcheck" "@tanatloc/formula-validator" "prettier"
runInWorkspace "depcheck" "@tanatloc/formula-validator" "doc"
runInWorkspace "depcheck" "@tanatloc/formula-validator" "test"
runInWorkspace "depcheck" "@tanatloc/formula-validator" "build"

# worker
echo -e ""
echo -e "❯❯❯❯ @tanatloc/worker"
runInWorkspace "depcheck" "@tanatloc/worker" "dockercheck"
