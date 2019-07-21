import http from './BaseServices';

const allClass = (user) =>{
  return http.get('/class-rooms')
    .then(response =>{
      return user ? response.data.filter(e=>e.owner === user) : response.data
    })
  }


const getClass = (classRoomId) => {
  //debugger
  return http.get(`/class-rooms/${classRoomId}`).then(res=>res.data)
  }

const addClass = (classRoom) => {
  //debugger
  return http.post('/class-rooms', classRoom)
  }

const editClass = (classRoom, classRoomId) => {
  //debugger
  return http.put(`/class-rooms/${classRoomId}`, classRoom)
  }

const deleteClass = (classRoom) => {
  //debugger
  return  http.delete('/class-rooms', classRoom)
  }

export default {addClass, allClass, getClass, editClass, deleteClass}