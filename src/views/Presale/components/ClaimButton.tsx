import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Button, Text } from '@pancakeswap-libs/uikit'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  datelabel?: string
  percentlabel?: string
  buttonLabel: string
  disabled?: boolean
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border: solid 1px;
  border-radius: ${({ theme }) => theme.radii.default};
  // border-color: ${({ theme }) => theme.colors.borderColor};
  padding-left: 16px;
`

const ClaimLabelButton: React.FC<Props> = ({ value, datelabel,percentlabel, buttonLabel, onClick, disabled = false }) => {
  return (
    <div>      
      <ButtonWrapper>
        
        <Text fontSize="16px" paddingRight="20px" color="textSubtle">
          {datelabel}
        </Text>
        
        <Text fontSize="16px" paddingRight="30px" color="textSubtle">
          {percentlabel}
        </Text>
        <Text bold fontSize="20px" paddingRight="30px">
          {value}
        </Text>
        <Button onClick={onClick} disabled={disabled} padding="-5px 5px">
          {buttonLabel}
        </Button>
      </ButtonWrapper>
    </div>
  )
}

export default ClaimLabelButton
