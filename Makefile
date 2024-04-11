docker-build:
	DOCKER_DEFAULT_PLATFORM="linux/amd64" docker build -t video:latest ./

docker-build-client:
	cd client && docker build -t client:latest ./

docker-start:
	docker-compose up -d

docker-tag:
	docker tag video:latest phudockervn/video:latest

docker-push:
	docker push phudockervn/video:latest
