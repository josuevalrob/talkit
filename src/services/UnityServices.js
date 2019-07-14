import http from './BaseServices';

const addUnities = (unity, classRoomId) => http.post(`/class-rooms/${classRoomId}`, unity)

// const allUnities = (classRoom) => http.get('/class-rooms', classRoom)
// const getUnities = (classRoomId) => http.get(`/class-rooms/${classRoomId}`)
// const editUnities = (classRoom, classRoomId) => http.put(`/class-rooms/${classRoomId}`, classRoom)
// const deleteUnities = (classRoom) => http.delete('/class-rooms', classRoom)

// export default {allUnities, getUnities, addUnities, editUnities, deleteUnities}
export default {addUnities}