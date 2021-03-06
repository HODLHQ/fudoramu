import Address from '@/components/UI/Address'
import { useApp, startConnecting, reset } from '@/components/Context'
import {
  Box,
  Button,
  Icon,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react'
import { FaWallet } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const Web3 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { state, dispatch } = useApp()
  const { address, ens, isTestnet, isConnecting } = state

  const [explorer, setExplorer] = useState('')

  useEffect(() => {
    if (address) {
      const url = isTestnet
        ? 'https://rinkeby.etherscan.io'
        : 'https://etherscan.io'
      setExplorer(`${url}/address/${address}`)
    }
  }, [isTestnet, address])

  return (
    <>
      {address ? (
        <>
          <Button onClick={onOpen} mx={2}>
            <Address address={address} ens={ens} avatar='right' size={4} />
          </Button>
          {address && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Account</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Address
                    address={address}
                    ens={ens}
                    avatar='left'
                    size={8}
                    copyable
                  />
                  {explorer && (
                    <Box mt={10} px={10}>
                      <Link href={explorer} isExternal>
                        View on Explorer
                      </Link>
                    </Box>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme='red'
                    mr={3}
                    onClick={async () => {
                      dispatch(reset())
                      window.localStorage.removeItem(
                        'WEB3_CONNECT_CACHED_PROVIDER'
                      )
                      onClose()
                    }}>
                    Disconnect
                  </Button>
                  <Button variant='ghost' onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      ) : (
        <Box>
          <Button onClick={() => dispatch(startConnecting())}>
            <Icon as={FaWallet} />
          </Button>
        </Box>
      )}
    </>
  )
}

export default Web3
