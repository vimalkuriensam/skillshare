frontend_build:
	docker-compose -f ./deployment/docker-compose.yml up --build -d


frontend_down:
	docker-compose -f ./deployment/docker-compose.yml down -v