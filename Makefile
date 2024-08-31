db:
	docker-compose -f backend/docker-compose.yml up -d --build 
	sleep 2
	cd backend && npm run db:deploy

api:
	cd backend && npm run start:dev

front:
	cd frontend && npm start


