## 1. Introduction
- This is project share video link
- User can share video from youtube
- Other User can receive notification when new video was share

## 2.Prerequisites
- ruby 3.3.0
- node v20.11.0
- npm 10.2.4
- postgresql 14
- Docker for run app on local easy

## 3.Installation & Configuration
```bash
# install Ruby 3.3.0
brew install ruby@3.0

# install Rails ~7
gem install rails 

# install npm
brew install nodejs

# install postgres
brew install postgresql@14
```
## 4.Database Setup
- can use brew start postgress
- or start database in Docker


## 5.Running the Application
```bash
# run rails server at the root
rails s

# run front end app at path client/
npm run dev

# for unit test backend
rspec
```

## 6.Docker Deployment
```bash
# build rails app
make docker-build

# build front end app
make docker-build-client

# run docker-compose
docker-compose up -d
```


## 7. Usage
- First open the front end app, and register user by email and password(at least 10 character)
- Each 5 minutes the token will expire, can set by variable TOKEN_TTL_IN_MINUTES
- After login, user can see list video sharing
- Can click on icon youtube to view the video in youtube.
- Click on button share, and enter title, url of your video, and click share
- Other user can receive notification when video has shared

## 8. Troubleshooting
- Cannot connect websocket in postman, or frontend-local
 => solution: config action cable
```bash
# config/environments/development.rb
config.action_cable.allowed_request_origins = [/ws:\/\/*/, /wss:\/\/*/, 'http://localhost:8080']
```

- SSL when testing in docker-compose local => solution: allow ssl

```bash
#config/environments/production.rb
config.assume_ssl = true
config.force_ssl = true
```
