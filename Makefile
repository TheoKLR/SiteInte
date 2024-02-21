backend_dev: 
	docker-compose -f backend/docker-compose.yml up -d --build 
	cd backend && npm run start:dev &

frontend_dev:
	cd frontend && npm start &

dev: backend_dev frontend_dev

deploy:
	cd backend && npm run db:deploy