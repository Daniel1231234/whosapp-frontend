export type User = {
    _id: string | any
    socketId:any
    name:string
    password: string 
    email: string 
    lastSeen:string | number | Date
    image: string 
    room: string 
    lastRoom?: string 
    chatRooms?:string[]
}


//     _id: string | any
//     name:string
//     password: string 
//     email: string 
//     lastSeen:string | number | Date
//     image: string 
//     room: string 
//     lastRoom?: string 
//     chatRooms?:string[]

//      constructor(name: string, password: string, email: string,) {
//         this.name = name
//         this.password = password
//         this.email = email
//         this.lastSeen = Date.now()
//         this.image = ""
//         this.room = ""
//         this.lastRoom = ''
//         this.chatRooms = ['']
//         this._id = ''
//   }
// }

// export default User;