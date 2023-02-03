import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

type Props = {
  onAction: any
  password: string
  email: string
  setEmail: any
  setPassword: any
  setSignup: any
  name?: string
  setName?: any
  actionBtn: string
  isSignUp: boolean
}

export default function LoginForm(props: Props) {
  return (
    <Box maxHeight={"400px"} height="100%" m="auto" className='custom-form'
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={5}>
      <Stack spacing={3}>

        {props.isSignUp && <FormControl id="name">
          <FormLabel>Full name</FormLabel>
          <Input type="name" value={props.name} onChange={(e) => props.setName(e.target.value)} />
        </FormControl>}

        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)} />
        </FormControl>

        <Stack spacing={3}>

          {!props.isSignUp && <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}>
            <Checkbox>Remember me</Checkbox>
            <Link onClick={props.setSignup} color={'blue.400'}>Dont have an account?</Link>
          </Stack>
          }

          {props.isSignUp && <Link onClick={() => props.setSignup(false)} color={'blue.400'}>Allready have an account?</Link>}
          <Button onClick={props.onAction}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            {props.actionBtn}
          </Button>
        </Stack>

      </Stack>
    </Box>
  );
}