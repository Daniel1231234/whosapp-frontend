import { Socket } from "socket.io-client"
import { MessageModel } from '../../models/Message'
import deleteIcon from '../../assets/delete.svg'
import { useToastMsg } from "../../cmps/UI/Toast/useToastMsg"
import { toastContent } from "../../cmps/UI/Toast/toastContent"



type Props = {
    socket: Socket<any>
    msgRecived: any
    setMsgRecived: any
    username:string
    msg:MessageModel
    
}
export const Message = (props: Props) => {
  const removeErr = useToastMsg({title: 'Can not remove this messgae!', status:'error'})
  

 const removeMsg = async (e: any) => {
    const _id = e.target.id
   if (!_id) return
   
   if (props.msg.sender === 'ChatBot') {
     removeErr.showToast()
     return
   }

   if (props.msg.sender !== props.username) {
     removeErr.showToast()
     return
   }
    
    props.socket.emit('remove_message', _id)
    
    const updatedMsgs = props.msgRecived.filter((msg: MessageModel) => msg._id !== _id)
    props.setMsgRecived(updatedMsgs)
  }

  const styles = props.username === props.msg.sender ? "message-container " : "message-container lightslategrey"
    return (
      <div className={styles}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="msgMeta">{props.msg.sender }</span>
            <span className="msgMeta">{formatDate(props.msg.createdAt)}</span>
            <span onClick={removeMsg}><img src={deleteIcon} alt="" id={props.msg._id} style={{width:'50%', cursor:'pointer'}} /></span>
        </div>  
            <p className="msgText">{props.msg.txt}</p>
      </div>
  )
}

function formatDate(timestamp: string | number | Date) {
    const date = new Date(+timestamp);
    return date.toLocaleString();
  }