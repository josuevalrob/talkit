import http from './BaseServices';

const addUnities = (unity, classRoomId) => {
  //debugger
  return http.post(`/class-rooms/${classRoomId}/unities`, unity)
  .then(response => response.data) //* testit
}


const getUnity = (classRoomId, unityId) => {
  //debugger
  return http.get(`/class-rooms/${classRoomId}/unities/${unityId}`)
    .then(response => {
      return response.data
      }) //* testit
    .catch(ups => console.log(ups))
}

const getAll = (classRoomId) => {
  return http.get(`/class-rooms/${classRoomId}/unities/`)
    .then(response => {
      return response.data
      }) //* testit
    .catch(ups => console.log(ups))
}

const editUnities = (unity, classRoomId, unityId) => {
  //debugger

  return http.put(`/class-rooms/${classRoomId}/unities/${unityId}`, unity)
    .then(response => {
      return response.data}) //* testit    
    .catch(e => console.error(e)) 
}

const allUnities = (classRoomId, unityId) => {
  //debugger

  return http.get(`/class-room/${classRoomId}/unities/${unityId}`)}

const deleteUnity = (classRoomId, unityId) => {
  //debugger
  return http.delete(`/class-room/${classRoomId}/unities/${unityId}`)
  }

export default {addUnities, editUnities, getUnity, allUnities, deleteUnity, getAll}