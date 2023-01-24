.PHONY: setup
setup:
	yarn install
	npx pod-install
	npx jetify

buildIOSSim:
	open -a Simulator
	yarn ios