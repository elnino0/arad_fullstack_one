const axios = require('axios');

// const data = {
//   name: 'foo',
//   age: 30,
// };

const email = "Sincere@april.biz"
const password = "defualte"

// {
//   _id: '67506584973ab212c4bf9742',
//   username: 'Bret',
//   email: 'Sincere@april.biz',
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTA2NTg0OTczYWIyMTJjNGJmOTc0MiIsImlhdCI6MTczMzMyMjkyNSwiZXhwIjoxNzMzODQxMzI1fQ.Um_e4YkUII5nf7QzxFuOUEztPQD00E7KZ7BSXbTMV2o'
// }


axios.post("http://localhost:3000/auth/login",  { email, password } )
  .then(response => {
    console.log(response.data);
    
      client = axios.create({
        baseURL: URL,
      });
      client.defaults.headers["authorization"] = "Bearer " + response.data.token


      // client.get("http://localhost:3000/api/user").then(res =>{
      //   console.log(res.data)
      // })

      // client.get("http://localhost:3000/api/movies").then(res =>{
      //   console.log(res.data)
      // })

      // client.get("http://localhost:3000/api/subs").then(res =>{
      //   console.log(res.data)
      // })

      // client.post("http://localhost:3000/api/movies", {
      //   name: "test",
      //   description: "test",
      //   category: "test",
      //   genre: "test",
      //   image: "test",
      //   rating: "test", 
      //   premiered: "test",  
      // }).then(res =>{
      //   console.log(res.data)
      // })

      client.post("http://localhost:3000/api/subs", {
        userid: 1,
        movieName: "test",
      }).then(res =>{
        console.log(res.data)
      })    

      

    })

  .catch(error => {
    console.log(error);
  });

  // const fs = require('node:fs');

//     axios.get("https://api.tvmaze.com/shows").then(res =>{
        
// try {
//     fs.writeFileSync('./movies.json', JSON.stringify(res.data,undefined,4));
//     // file written successfully
//   } catch (err) {
//     console.error(err);
//   }
//     })


