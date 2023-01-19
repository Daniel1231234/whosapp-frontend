import { User } from "../../models/User"

type Props = {
    roomUsers:User[] | []
}
export const UserList = ({ roomUsers}: Props) => {



  return (
    <ul className="usersList">
        {roomUsers?.map((user:User) => <li key={user._id}>{user.name}</li>)}
    </ul>
  )
}