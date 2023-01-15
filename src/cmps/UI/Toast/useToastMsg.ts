import { useToast } from "@chakra-ui/react"

type Props = {
    status?: any,
    title?: string,
    description?: string
    isShow?:boolean
}




export const useToastMsg = (props:Props) => {
    const toast = useToast()

    const showToast = () => {
        if (props.isShow === false) return
        toast({
          title: props.title,
          description: props.description,
          status: props.status,
          duration: 2000,
          isClosable: true,
        })
    }

    return { showToast }
}


    // const statuses = ['success', 'error', 'warning', 'info']