import React, { useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Modal, Button, Flex, LinkExternal } from '@pancakeswap-libs/uikit'
import Spacer from 'components/Spacer'
import BalanceInput from 'components/Input/BalanceInput'
import useTokenBalance from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import ClaimLabelButton from './ClaimButton'


interface Props {
  currency: string
  contract: any
  currencyAddress: string
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({ currency, contract, currencyAddress, onDismiss }) => {
  const [value, setValue] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()

  const [marunclaimToken , setMarUnclaimToken] = useState(new BigNumber(0))
  const [aprunclaimToken , setAprUnclaimToken] = useState(new BigNumber(0))
  const [mayunclaimToken , setMayUnclaimToken] = useState(new BigNumber(0))
  const [jununclaimToken , setJunUnclaimToken] = useState(new BigNumber(0))
  const [julunclaimToken , setJulUnclaimToken] = useState(new BigNumber(0))
  const [augunclaimToken , setAugUnclaimToken] = useState(new BigNumber(0))
  const [sepunclaimToken , setSepUnclaimToken] = useState(new BigNumber(0))

  const fetch = async () => {  
    const _marunclaimToken = await contract.methods.getTokensUnclaimed(new BigNumber(1),account).call()       
    const _aprunclaimToken = await contract.methods.getTokensUnclaimed(new BigNumber(2),account).call()   
    const _mayunclaimToken = await contract.methods.getTokensUnclaimed(new BigNumber(3),account).call()
    const _jununclaimToken = await contract.methods.getTokensUnclaimed(new BigNumber(4),account).call()
    const _julunclaimToken = await contract.methods.getTokensUnclaimed(new BigNumber(5),account).call()
    const _augunclaimToken = await contract.methods.getTokensUnclaimed(new BigNumber(6),account).call()
    const _sepunclaimToken = await contract.methods.getTokensUnclaimed(new BigNumber(7),account).call()
    setMarUnclaimToken(_marunclaimToken)
    setAprUnclaimToken(_aprunclaimToken)
    setMayUnclaimToken(_mayunclaimToken)
    setJunUnclaimToken(_jununclaimToken)
    setJulUnclaimToken(_julunclaimToken)
    setAugUnclaimToken(_augunclaimToken)
    setSepUnclaimToken(_sepunclaimToken)
  }
  if (account) {
    fetch()
  }

  const Marchclaim = async () => {
    setPendingTx(true)
    await contract.methods.MarclaimTokens().send({ from: account })
    setPendingTx(false)
  }

   const Aprilclaim = async () => {
    setPendingTx(true)
    await contract.methods.AprclaimTokens().send({ from: account })
    setPendingTx(false)
  }
  const Mayclaim = async () => {
    setPendingTx(true)
    await contract.methods.MayclaimTokens().send({ from: account })
    setPendingTx(false)
  }
  const Juneclaim = async () => {
    setPendingTx(true)
    await contract.methods.JunclaimTokens().send({ from: account })
    setPendingTx(false)
  }
  const Julyclaim = async () => {
    setPendingTx(true)
    await contract.methods.JulclaimTokens().send({ from: account })
    setPendingTx(false)
  }
  const Auguestclaim = async () => {
    setPendingTx(true)
    await contract.methods.AugclaimTokens().send({ from: account })
    setPendingTx(false)
  }
  const Sepclaim = async () => {
    setPendingTx(true)
    await contract.methods.SepclaimTokens().send({ from: account })
    setPendingTx(false)
  }
  
 
  return (
    <Modal title={`Claim `} onDismiss={onDismiss}>
    
    {account && (
        <ClaimLabelButton
          disabled={pendingTx || marunclaimToken  <= new BigNumber(0)}              
          datelabel="30 Mar, 6:00 am UTC"
          percentlabel="10%"
          buttonLabel="Claim"
          value={new BigNumber(marunclaimToken).dividedBy(new BigNumber(10).pow(18)).toFixed(3)}
          onClick={Marchclaim}
        />
      )}
      <Spacer size="sm" />
      {account && (
        <ClaimLabelButton
          disabled={pendingTx || aprunclaimToken  <= new BigNumber(0)}              
          datelabel="30 Apr, 6:00 am UTC"
          percentlabel="15%"
          buttonLabel="Claim"
          value={new BigNumber(aprunclaimToken).dividedBy(new BigNumber(10).pow(18)).toFixed(3)}
          onClick={Aprilclaim}
        />
      )}
      <Spacer size="sm" />
      {account && (
        <ClaimLabelButton
          disabled={pendingTx || mayunclaimToken  <= new BigNumber(0)}              
          datelabel="30 May, 6:00 am UTC"
          percentlabel="15%"
          buttonLabel="Claim"
          value={new BigNumber(mayunclaimToken).dividedBy(new BigNumber(10).pow(18)).toFixed(3)}
          onClick={Mayclaim}
        />
      )}
      <Spacer size="sm" />
      {account && (
        <ClaimLabelButton
          disabled={pendingTx || jununclaimToken  <= new BigNumber(0)}              
          datelabel="30 Jun, 6:00 am UTC"
          percentlabel="15%"
          buttonLabel="Claim"
          value={new BigNumber(jununclaimToken).dividedBy(new BigNumber(10).pow(18)).toFixed(3)}
          onClick={Juneclaim}
        />
      )}
      <Spacer size="sm" />
      {account && (
        <ClaimLabelButton
          disabled={pendingTx || julunclaimToken  <= new BigNumber(0)}              
          datelabel="30 Jul, 6:00 am UTC"
          percentlabel="15%"
          buttonLabel="Claim"
          value={new BigNumber(julunclaimToken).dividedBy(new BigNumber(10).pow(18)).toFixed(3)}
          onClick={Julyclaim}
        />
      )}
      <Spacer size="sm" />
      {account && (
        <ClaimLabelButton
          disabled={pendingTx || augunclaimToken  <= new BigNumber(0)}              
          datelabel="30 Aug, 6:00 am UTC"
          percentlabel="15%"
          buttonLabel="Claim"
          value={new BigNumber(augunclaimToken).dividedBy(new BigNumber(10).pow(18)).toFixed(3)}
          onClick={Auguestclaim}
        />
      )}
      <Spacer size="sm" />
      {account && (
        <ClaimLabelButton
          disabled={pendingTx || sepunclaimToken  <= new BigNumber(0)}              
          datelabel="30 Sep, 6:00 am UTC"
          percentlabel="15%"
          buttonLabel="Claim"
          value={new BigNumber(sepunclaimToken).dividedBy(new BigNumber(10).pow(18)).toFixed(3)}
          onClick={Sepclaim}
        />
      )}
      <Spacer size="sm" />
      <Flex justifyContent="space-between" mb="24px">
        <Button fullWidth variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        
      </Flex>      
    </Modal>
  )
}

export default ContributeModal
