
run-proxy:
	cd backend-proxy && make run

run-service-ui:
	cd service-ui && make run

deploy:
	tar -czf dist.tgz backend-proxy mobile-fe service-ui user-ui
	scp dist.tgz playground@142.93.99.125:~
	ssh playground@142.93.99.125 "PATH=$$PATH:/home/playground/.nvm/versions/node/v8.15.0/bin/; tar -xzf dist.tgz; cd backend-proxy; forever stop index.js; forever start index.js"

