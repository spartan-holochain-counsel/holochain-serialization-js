ENTRY_POINT		= lib/index.js
BUILD_DEPS		= node_modules $(ENTRY_POINT) Makefile tsconfig.json
TSC_OPTIONS		= -t es2022 -m es2022	\
	--moduleResolution node			\
	--esModuleInterop			\
	--strictNullChecks			\
	--strictPropertyInitialization		\
	-d --sourceMap


#
# Building
#
tsconfig.json:
	npx tsc --init $(TSC_OPTIONS) --outDir lib
$(ENTRY_POINT):		src/*.ts Makefile
	rm -f lib/*.js
	npx tsc $(TSC_OPTIONS) --strict --outDir lib src/index.ts



#
# Project
#
package-lock.json:	package.json
	npm install
	touch $@
node_modules:		package-lock.json
	npm install
	touch $@
build:			node_modules

use-local-holo-hash:
	cd tests; npm uninstall @spartan-hc/holo-hash
	cd tests; npm install --save-dev ../../holo-hash-js/
use-npm-holo-hash:
	cd tests; npm uninstall @spartan-hc/holo-hash
	cd tests; npm install --save-dev @spartan-hc/holo-hash


#
# Testing
#
DEBUG_LEVEL	       ?= warn
TEST_ENV_VARS		= LOG_LEVEL=$(DEBUG_LEVEL)
MOCHA_OPTS		= -n enable-source-maps -t 15000

test:
	make -s test-integration

test-integration:	$(BUILD_DEPS)
	$(TEST_ENV_VARS) npx mocha $(MOCHA_OPTS) tests/integration/test_basic.js

test-server:
	python3 -m http.server 8765


#
# Repository
#
clean-remove-chaff:
	@find . -name '*~' -exec rm {} \;
clean-files:		clean-remove-chaff
	git clean -nd
clean-files-force:	clean-remove-chaff
	git clean -fd
clean-files-all:	clean-remove-chaff
	git clean -ndx
clean-files-all-force:	clean-remove-chaff
	git clean -fdx


#
# NPM packaging
#
prepare-package:
	rm -f dist/*
	npx webpack
	MODE=production npx webpack
	gzip -kf dist/*.js
preview-package:	clean-files test prepare-package
	npm pack --dry-run .
create-package:		clean-files test prepare-package
	npm pack .
publish-package:	clean-files test prepare-package
	npm publish --access public .
