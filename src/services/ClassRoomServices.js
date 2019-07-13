import http from './BaseServices';

const allClass = (classRoom) => http.get('/class-rooms', classRoom)

const getClass = (classRoomId) => http.get(`/class-rooms/${classRoomId}`)

const addClass = (classRoom) => http.post('/class-rooms', classRoom)

const editClass = (classRoom, classRoomId) => http.put(`/class-rooms/${classRoomId}`, classRoom)

const deleteClass = (classRoom) => http.delete('/class-rooms', classRoom)

export default {addClass, allClass, getClass, editClass, deleteClass}