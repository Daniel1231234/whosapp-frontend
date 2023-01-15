import { Card, CardHeader, CardBody, CardFooter, Flex } from '@chakra-ui/react'
import { ReactNode } from "react"

type Props = {
    children?: ReactNode
}

export const CustomCard = (props:Props) => {
  return (
    <Card maxW='md' variant="filled">
      <Flex minWidth='200px' alignItems='center' gap='4' p="10" direction="column">

        {props.children }

      </Flex>
    </Card>
  )
}
