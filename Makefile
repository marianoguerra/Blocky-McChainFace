
run-proxy:
	cd backend-proxy && make run

run-service-ui:
	cd service-ui && make run

deploy:
	tar -czf dist.tgz backend-proxy mobile-fe service-ui user-ui
	scp dist.tgz playground@142.93.99.125:~
