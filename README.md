1. Install docker and docker-compose
2. Run docker-compose build
3. Run docker-compose up
4. If backend fails, run 3 again

I set a timeout on creating table, didnt have time to find a way to create table after db was created.

I used console.log for logging to log errors and payloads. We can direct those logs to wherever we need and can monitor more than just "request happened".

I didn't have time to get testing to work with es6 imports. Not sure why it's not working as this is done with create-react-app. Would obviously solve it if given more time.

Would have also hooked nodemon or something to both backend and frontend to work along docker-compose for proper development.
