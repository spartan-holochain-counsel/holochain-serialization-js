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


MOCHA_OPTS		= -t 15000
#
# Testing
#
test:				test-integration
test-debug:			test-integration-debug

test-integration:		build
	LOG_LEVEL=warn npx mocha $(MOCHA_OPTS) ./tests/integration
test-integration-debug:		build
	LOG_LEVEL=trace npx mocha $(MOCHA_OPTS) ./tests/integration
test-integration-debug-%:	build
	LOG_LEVEL=trace npx mocha $(MOCHA_OPTS) ./tests/integration/test_$*.js

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
