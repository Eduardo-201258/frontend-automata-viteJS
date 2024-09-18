import axios from "axios";


export const getParticiones = async () => {
  //const res = await particionesAPI.get('/particion')
  var config = {
    method: 'get',
    url: 'http://localhost:8000/particion',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  axios(config)
    .then(function (response) {
      console.log((response.data));
      var dataResponse = JSON.stringify(response.data)
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response.data;
};
