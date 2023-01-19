import { Spinner } from "@chakra-ui/react"

type Props = {}
export const CustomSpinner = (props: Props) => {
  return (
    <div style={{height:'calc(100vh - 150px)', width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl' />
    </div>
  )
}
