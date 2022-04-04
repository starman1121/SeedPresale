import React, { useState, useEffect } from 'react'
import { useModal, Button, Heading, Card, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { useERC20 } from 'hooks/useContract'
import { IfoStatus } from 'config/constants/types'
import UnlockButton from 'components/UnlockButton'
import { usePreSaleApprove } from 'hooks/useApprove'
import { usePreSaleAllowance } from 'hooks/useAllowance'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import CardValue from 'views/Home/components/CardValue'
import Spacer from 'components/Spacer'
import LabelButton from './LabelButton'
import ClaimLabelButton from './ClaimButton'
import ContributeModal from './ContributeModal'


const StyledPreSaleCard = styled(Card)`
  padding: 32px 16px 16px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
  border-radius: 0px;
  margin-top: 1px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 32px 16px 16px;
    margin-left: auto;
    margin-right: auto;
    max-width: 437px;
    width: 100%;
    border-radius: 0px;
  }
`

const StyledClaimPreSaleCard = styled(Card)`
  padding: 32px 16px 16px;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  width: 100%;
  border-radius: 16px;
  margin-top: 1px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 32px 16px 16px;
    margin-left: auto;
    margin-right: auto;
    max-width: 800px;
    width: 100%;
    border-radius: 0px;
  }
`
const Row = styled.div`
  display: block;
  padding-top: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    padding-top: 24px;
  }
`
const RowItem = styled.div`
  display: flex;
  padding-top: 16px;
`

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  status?: IfoStatus
  raisingAmount?: BigNumber
  tokenDecimals: number
}

const PresaleContribute: React.FC<Props> = ({
  address,
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  tokenDecimals,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [claimTokenBalance, setClaimTokenBalance] = useState(new BigNumber(0))

  const [claimed, setClaimed] = useState(false)
  const [amount, setAmount] = useState(new BigNumber(0))
  const [isActive, setActive] = useState(true)
  const { account } = useWallet()
  const [total, setTotal] = useState(new BigNumber(0))

  const [unclaimToken, setUnclaimToken] = useState(new BigNumber(0))
  const [marunclaimToken , setMarUnclaimToken] = useState(new BigNumber(0))
  const [aprunclaimToken , setAprUnclaimToken] = useState(new BigNumber(0))
  const [mayunclaimToken , setMayUnclaimToken] = useState(new BigNumber(0))
  const [jununclaimToken , setJunUnclaimToken] = useState(new BigNumber(0))
  const [julunclaimToken , setJulUnclaimToken] = useState(new BigNumber(0))
  const [augunclaimToken , setAugUnclaimToken] = useState(new BigNumber(0))
  const [sepunclaimToken , setSepUnclaimToken] = useState(new BigNumber(0))

  const [ownToken, setOwnToken] = useState(new BigNumber(0))
  const [totalSoldToken, setTotalSoldToken] = useState(new BigNumber(0))
  const [leftToken, setLeftToken] = useState(new BigNumber(0))
  const contractRaisingToken = useERC20(currencyAddress)
  const allowance = usePreSaleAllowance(contractRaisingToken, address, pendingTx)
  const onApprove = usePreSaleApprove(contractRaisingToken, address)
  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} />,
  )

  const TranslateString = useI18n()

  useEffect(() => {
    const fetchV = async () => {
      const _claimed = await contract.methods.claimActive().call()
      const _active = await contract.methods.saleActive().call()
      const _total = await contract.methods.getIMMETokensLeft().call()
      
      const _totalSoldToken = await contract.methods.getTotalTokensSold().call()
      console.log('debug->_total123', _totalSoldToken,account)
      console.log('dddd')

      const _leftToken = new BigNumber(_total).minus(new BigNumber(_totalSoldToken))
      setClaimed(_claimed)
      setActive(_active)
      setLeftToken(_leftToken)
      setTotalSoldToken(_totalSoldToken)
      setTotal(_total)
    }

    const fetch = async () => {     
      const balance = new BigNumber(await contract.methods.getTokensUnclaimed(0,account).call())      
      const _claimed = await contract.methods.claimActive().call()
      const _amount = await contract.methods.getTokensOwned(account).call()     
      const _active = await contract.methods.saleActive().call()
      const _total = await contract.methods.getIMMETokensLeft().call()     
      const _marunclaimToken = await contract.methods.getTokensUnclaimed(1,account).call()     
      const _aprunclaimToken = await contract.methods.getTokensUnclaimed(2,account).call()
      const _mayunclaimToken = await contract.methods.getTokensUnclaimed(3,account).call()
      const _jununclaimToken = await contract.methods.getTokensUnclaimed(4,account).call()  
      const _julunclaimToken = await contract.methods.getTokensUnclaimed(5,account).call()
      const _augunclaimToken = await contract.methods.getTokensUnclaimed(6,account).call()
      const _sepunclaimToken = await contract.methods.getTokensUnclaimed(7,account).call()
      const _unclaimToken = await contract.methods.getTokensUnclaimed(0,account).call()      
      const _ownToken = await contract.methods.getTokensOwned(account).call()
      const _totalSoldToken = await contract.methods.getTotalTokensSold().call()
      const _leftToken = new BigNumber(_total).minus(new BigNumber(_totalSoldToken))

      console.log('debug->_total1', _leftToken, _ownToken, _totalSoldToken, _total, _marunclaimToken,_aprunclaimToken,_unclaimToken)

      setClaimed(_claimed)
      setClaimTokenBalance(balance)
      setAmount(_amount)
      setActive(_active)
      setLeftToken(_leftToken)

      setUnclaimToken(_unclaimToken)
      setMarUnclaimToken(_marunclaimToken)
      setAprUnclaimToken(_aprunclaimToken)
      setMayUnclaimToken(_mayunclaimToken)
      setJunUnclaimToken(_jununclaimToken)
      setJulUnclaimToken(_julunclaimToken)
      setAugUnclaimToken(_augunclaimToken)
      setSepUnclaimToken(_sepunclaimToken)
      
      setOwnToken(_ownToken)
      setTotalSoldToken(_totalSoldToken)
      setTotal(_total)
    }

    if (account) {
      fetch()
    }
    fetchV()
  }, [account, contract.methods, pendingTx])
  // console.log('debug-allow', allowance)

  // if (allowance === null) {
  //   return null
  // }

  // const { onClaim } = useClaim()
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

  const isFinished = false

  return (
    <>
      {!isActive && (
        <Heading size="lg" style={{ textAlign: 'center' }}>
          PreSale is not active
        </Heading>
      )}
      <Row>
        <StyledPreSaleCard>
          <Heading size="lg" mb="24px" style={{ textAlign: 'center' }}>
            Buy{' '}
          </Heading>
          {account && allowance <= 0 && (
            <Button
              fullWidth
              disabled={pendingTx || isFinished}
              onClick={async () => {
                try {
                  setPendingTx(true)
                  await onApprove()
                  setPendingTx(false)
                } catch (e) {
                  setPendingTx(false)
                  console.error(e)
                }
              }}
            >
              Approve
            </Button>
          )}
          {!account && <UnlockButton fullWidth />}
          {account && allowance > 0 && (
            <LabelButton
              disabled={pendingTx || !(isActive || isFinished)}
              buttonLabel="Contribute"
              label={isFinished ? 'Your tokens to claim' : `Your contribution (IMME)`}
              value={
                // eslint-disable-next-line no-nested-ternary
                isFinished
                  ? claimed
                    ? 'Claimed'
                    : getBalanceNumber(claimTokenBalance, tokenDecimals).toFixed(4)
                  : getBalanceNumber(new BigNumber(amount).times(1)).toFixed(4)
              }
              onClick={onPresentContributeModal}
            />
          )}
        </StyledPreSaleCard>
      </Row>
      <Row>
      <StyledPreSaleCard>
          <Heading size="lg" mb="24px" style={{ textAlign: 'center' }}>
            Info{' '}
          </Heading>
          <hr />
          <RowItem>
            <Text mr="16px">Purchased IMME:</Text>
            <CardValue value={getBalanceNumber(ownToken, 18)} decimals={0} fontSize="16px" />
          </RowItem>
          <RowItem>
            <Text mr="16px">Unclaimed IMME:</Text>
            <CardValue value={getBalanceNumber(unclaimToken, 18)} decimals={0} fontSize="16px" />
          </RowItem>
          <hr />
          <RowItem>
            <Text mr="16px">Total IMME:</Text>
            <CardValue value={getBalanceNumber(total, 18)} decimals={0} fontSize="16px" />
          </RowItem>
          <RowItem>
            <Text mr="16px">Total IMME Sold:</Text>
            <CardValue value={getBalanceNumber(totalSoldToken, 18)} decimals={0} fontSize="16px" />
          </RowItem>
          <hr />
          <RowItem>
            <Text mr="16px" color="warning">
              IMME Left:
            </Text>
            <CardValue value={getBalanceNumber(leftToken, 18)} decimals={0} fontSize="18px" />
          </RowItem>
        </StyledPreSaleCard>
        <Spacer size="sm" />
        <StyledClaimPreSaleCard>
          <Heading size="lg" mb="24px" style={{ textAlign: 'center' }}>
            Claim{' '}
          </Heading>

          {!account && <UnlockButton fullWidth />}
          {account && (
            <ClaimLabelButton
              disabled={pendingTx || marunclaimToken  <= new BigNumber(0) || !(isActive || isFinished ) || !claimed}              
              datelabel="29 Apr, 6:00 am UTC"
              percentlabel="10%"
              buttonLabel="Claim"
              value={
                // eslint-disable-next-line no-nested-ternary
                isFinished
                  ? claimed
                    ? 'Claimed'
                    : getBalanceNumber(marunclaimToken  , tokenDecimals).toFixed(4)
                  : getBalanceNumber(new BigNumber(marunclaimToken )).toFixed(4)
              }
              onClick={Marchclaim}
            />
          )}
          <Spacer size="sm" />
          {account && (
            <ClaimLabelButton
              disabled={pendingTx || aprunclaimToken  <= new BigNumber(0) || !(isActive || isFinished) || !claimed}              
              datelabel="29 May, 6:00 am UTC"
              percentlabel="15%"
              buttonLabel="Claim"
              value={
                // eslint-disable-next-line no-nested-ternary
                isFinished
                  ? claimed
                    ? 'Claimed'
                    : getBalanceNumber(aprunclaimToken , tokenDecimals).toFixed(4)
                  : getBalanceNumber(new BigNumber(aprunclaimToken )).toFixed(4)
              }
              onClick={Aprilclaim}
            />
          )}
          <Spacer size="sm" />
          {account && (
            <ClaimLabelButton
              disabled={pendingTx || mayunclaimToken  <= new BigNumber(0) || !(isActive || isFinished) || !claimed}              
              datelabel="29 Jun, 6:00 am UTC"
              percentlabel="15%"
              buttonLabel="Claim"
              value={
                // eslint-disable-next-line no-nested-ternary
                isFinished
                  ? claimed
                    ? 'Claimed'
                    : getBalanceNumber(mayunclaimToken , tokenDecimals).toFixed(4)
                  : getBalanceNumber(new BigNumber(mayunclaimToken )).toFixed(4)
              }
              onClick={Mayclaim}
            />
          )}
          <Spacer size="sm" />
          {account && (
            <ClaimLabelButton
              disabled={pendingTx || jununclaimToken  <= new BigNumber(0) || !(isActive || isFinished)|| !claimed}              
              datelabel="29 Jul, 6:00 am UTC"
              percentlabel="15%"
              buttonLabel="Claim"
              value={
                // eslint-disable-next-line no-nested-ternary
                isFinished
                  ? claimed
                    ? 'Claimed'
                    : getBalanceNumber(jununclaimToken , tokenDecimals).toFixed(4)
                  : getBalanceNumber(new BigNumber(jununclaimToken )).toFixed(4)
              }
              onClick={Juneclaim}
            />
          )}
          <Spacer size="sm" />
          {account && (
            <ClaimLabelButton
              disabled={pendingTx || julunclaimToken  <= new BigNumber(0) || !(isActive || isFinished)|| !claimed}              
              datelabel="29 Aug, 6:00 am UTC"
              percentlabel="15%"
              buttonLabel="Claim"
              value={
                // eslint-disable-next-line no-nested-ternary
                isFinished
                  ? claimed
                    ? 'Claimed'
                    : getBalanceNumber(julunclaimToken , tokenDecimals).toFixed(4)
                  : getBalanceNumber(new BigNumber(julunclaimToken )).toFixed(4)
              }
              onClick={Julyclaim}
            />
          )}
          <Spacer size="sm" />
          {account && (
            <ClaimLabelButton
              disabled={pendingTx || augunclaimToken  <= new BigNumber(0) || !(isActive || isFinished)|| !claimed}              
              datelabel="29 Sep, 6:00 am UTC"
              percentlabel="15%"
              buttonLabel="Claim"
              value={
                // eslint-disable-next-line no-nested-ternary
                isFinished
                  ? claimed
                    ? 'Claimed'
                    : getBalanceNumber(augunclaimToken , tokenDecimals).toFixed(4)
                  : getBalanceNumber(new BigNumber(augunclaimToken )).toFixed(4)
              }
              onClick={Auguestclaim}
            />
          )}
          <Spacer size="sm" />
          {account && (
            <ClaimLabelButton
              disabled={pendingTx || sepunclaimToken  <= new BigNumber(0) || !(isActive || isFinished)|| !claimed}              
              datelabel="29 Oct, 6:00 am UTC"
              percentlabel="15%"
              buttonLabel="Claim"
              value={
                // eslint-disable-next-line no-nested-ternary
                isFinished
                  ? claimed
                    ? 'Claimed'
                    : getBalanceNumber(sepunclaimToken , tokenDecimals).toFixed(4)
                  : getBalanceNumber(new BigNumber(sepunclaimToken )).toFixed(4)
              }
              onClick={Sepclaim}
            />
          )}         
        </StyledClaimPreSaleCard>
        <Spacer size="sm" />
        <StyledPreSaleCard>
          <Heading size="lg" mb="24px" style={{ textAlign: 'center' }}>
            PreSale{' '}
          </Heading>
          {/* <RowItem>
          <Text fontSize='18px' mr='16px'>- Phase 1 & 2 both prices are same</Text>
        </RowItem> */}
          <RowItem>
            <Text fontSize="18px" mr="16px">
              - IMME Presale Price:{' '}
            </Text>
            <CardValue fontSize="18px" value={0.007} decimals={3} prefix="$" />
          </RowItem>
          {/* <RowItem>
            <Text fontSize="18px" mr="16px">
              - IMME Launch Price:{' '}
            </Text>
            <CardValue fontSize="18px" value={16} decimals={2} prefix="$" />
          </RowItem> */}

          <RowItem>
            <Text fontSize="15px" mr="16px">
              - Minimum Contribution - 100 BUSD (14,285 IMME)
            </Text>
          </RowItem>
          <RowItem>
            <Text fontSize="15px" mr="16px">
              - Maximum Contribution - 10000 BUSD (1,428,571 IMME)
            </Text>
          </RowItem>
          <RowItem>
            <Text fontSize="15px" mr="16px">
              - SoftCap - 50,000 BUSD (7,142,857 IMME)
            </Text>
          </RowItem>
          <RowItem>
            <Text fontSize="15px" mr="16px">
              - HardCap - 1,400,000 BUSD (200,000,000 IMME)
            </Text>
          </RowItem>
          <RowItem>
            <Text fontSize="18px" mr="16px">
              - Need help?
            </Text>
          </RowItem>
        </StyledPreSaleCard>
      </Row>
      
    </>
  )
}

export default PresaleContribute
