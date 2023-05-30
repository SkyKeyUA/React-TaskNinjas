<!-- @format -->

Frontend: ReactJS v18, Redux Toolkit, React Hook Form, React Router v6, React Markdown / Simple Editor, Axios; Backend: NodeJS / ES6, Express + Validator, MongoDB / Mongoose, JSON Web Token, Multer, BCrypt

Backend: program start: npm run start:dev
Frontend: program start: npm run start

Frontend: Pages Home / FullPost / AddPost / Registration / Login were added. Pagination was added for a maximum of 5 posts on 1 page. async actions were added in redux to retrieve data and use them later. In auth we get the data that the user entered during registration and authorization...

Backend: A method was created to start the server with port 7777. Validation was added of user and post. 5 functions (controller) were created: 1. getPages - get the number of pages, the limit of posts that will be on 1 page. 2. getOne - get one post. 3. Remove - the ability to remove the post. 4. Create - creating of the post. 5. Update - allows you to update the post. in models (Post / User) created model schemas for the MognoDB / Mongoose database. Which have mandatory (require: true) and unique (require: true) items
