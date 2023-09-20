# < Docker 사용 방법>

1. docker desktop 설치
2. microsoft store에서 ubuntu lts 설치
3. ubuntu 명령창(?)에서 회원가입
4. wsl 버전 2로 올리기
   1. wsl -l -v
   2. wsl --set-defulat-version 2
   3. wsl --set-version Ubuntu-22.04 2
5. docker login
6. docker image pull redis
7. docker network ls
8. docker network create redis-network
9. docker network ls
10. docker image pull redis
11. docker run --name local-redis -p 6379:6379 --network redis-network -v redis_temp:/data -d redis:latest redis-server --appendonly yes