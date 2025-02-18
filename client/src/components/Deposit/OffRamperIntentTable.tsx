import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import { IntentRow, IntentRowData } from "@components/Deposit/OffRamperIntentRow";
import { toUsdString, toUsdcString } from '@helpers/units';
import { SECONDS_IN_DAY  } from '@helpers/constants';
import { ThemedText } from '@theme/text'
import { colors } from '@theme/colors';
import { DepositIntent } from '@helpers/types';
import { ConfirmRelease } from '@components/modals/ConfirmRelease';
import useVenmoDeposits from '@hooks/venmo/useDeposits';
import useHdfcDeposits from '@hooks/hdfc/useDeposits';
import useGarantiDeposits from '@hooks/garanti/useDeposits';
import useRevolutDeposits from '@hooks/revolut/useDeposits';
import useLiquidity from '@hooks/venmo/useLiquidity';


interface OffRamperIntentTableProps {
  selectedRow?: number;
  rowsPerPage?: number;
}

export const OffRamperIntentTable: React.FC<OffRamperIntentTableProps> = ({
  selectedRow,
  rowsPerPage = 10
}) => {
  /*
   * Contexts
   */

  const {
    depositIntents: venmoDepositIntents
  } = useVenmoDeposits();

  const {
    depositIntents: hdfcDepositIntents
  } = useHdfcDeposits();

  const {
    depositIntents: garantiDepositIntents
  } = useGarantiDeposits();

  const {
    depositIntents: revolutDepositIntents
  } = useRevolutDeposits();

  const { calculateUsdFromRequestedUSDC } = useLiquidity();

  /*
   * State
   */

  const [shouldShowReleaseModal, setShouldShowReleaseModal] = useState<boolean>(false);
  const [selectedReleaseIntentHash, setSelectedReleaseIntentHash] = useState<string>("");
  const [selectedReleaseIntentAmount, setSelectedReleaseIntentAmount] = useState<string>("");
 
  const [intentsRowData, setIntentsRowData] = useState<IntentRowData[]>([]);

  const [depositIntents, setDepositIntents] = useState<DepositIntent[]>([]);

  /*
   * Handlers
   */

  const onReleaseIntentClick = (intentHash: string, amountUSDCToSend: string) => {
    setSelectedReleaseIntentHash(intentHash);

    setSelectedReleaseIntentAmount(amountUSDCToSend);

    setShouldShowReleaseModal(true);
  };

  const onCloseReleaseModal = () => {
    setShouldShowReleaseModal(false);

    setSelectedReleaseIntentHash("");

    setSelectedReleaseIntentAmount("");
  };

  /*
   * Hooks
   */

  useEffect(() => {
    let combinedDepositIntents: DepositIntent[] = [];

    if (venmoDepositIntents) {
      combinedDepositIntents = combinedDepositIntents.concat(venmoDepositIntents);
    }

    if (hdfcDepositIntents) {
      combinedDepositIntents = combinedDepositIntents.concat(hdfcDepositIntents);
    }

    if (garantiDepositIntents) {
      combinedDepositIntents = combinedDepositIntents.concat(garantiDepositIntents);
    }

    if (revolutDepositIntents) {
      combinedDepositIntents = combinedDepositIntents.concat(revolutDepositIntents);
    }

    setDepositIntents(combinedDepositIntents);
  }, [venmoDepositIntents, hdfcDepositIntents, garantiDepositIntents, revolutDepositIntents]);

  useEffect(() => {
    if (depositIntents) {
      var sanitizedIntents: IntentRowData[] = [];
      sanitizedIntents = depositIntents.map((depositIntent: DepositIntent, index: number) => {
        const intent = depositIntent.intent;
        const deposit = depositIntent.deposit;
        const intentHash = depositIntent.intentHash;

        const amountUSDC = intent.amount
        const usdToSend = calculateUsdFromRequestedUSDC(BigInt(amountUSDC), BigInt(deposit.conversionRate));
        const onRamper = intent.onRamper;
        const amountUSDToReceive = toUsdString(usdToSend);
        const amountUSDCToSend = toUsdcString(amountUSDC, true);
        const expirationTimestamp = formatExpiration(intent.timestamp);

        const sanitizedIntent: IntentRowData = {
          paymentPlatform: deposit.platformType,
          onRamper,
          amountUSDToReceive,
          amountUSDCToSend,
          expirationTimestamp,
          handleReleaseClick: () => {
            if (onReleaseIntentClick) {
              onReleaseIntentClick(intentHash, amountUSDCToSend);
            }
          }
        }

        return sanitizedIntent;
      });

      setIntentsRowData(sanitizedIntents);
    } else {
      setIntentsRowData([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositIntents]);

  /*
   * Helpers
   */

  function calculateExpiration(unixTimestamp: bigint, timePeriod: bigint): bigint {
    return unixTimestamp + timePeriod;
  }
  
  function formatExpiration(unixTimestamp: bigint): string {
    const unixTimestampPlusOneDay = calculateExpiration(unixTimestamp, SECONDS_IN_DAY);
    
    const currentTimestamp = BigInt(Math.floor(Date.now() / 1000));
    if (currentTimestamp > unixTimestampPlusOneDay) {
      return "Expired";
    } else {
      const date = new Date(Number(unixTimestampPlusOneDay) * 1000);
      const formattedTime = date.toLocaleTimeString();
      const formattedDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' }).split('/').slice(0, 2).join('/');

      return `${formattedTime} on ${formattedDate}`;
    }
  }

  return (
    <Container>
      {
        shouldShowReleaseModal && (
          <ConfirmRelease
            onBackClick={onCloseReleaseModal}
            intentHash={selectedReleaseIntentHash}
            amountUSDCToSend={selectedReleaseIntentAmount}
          />
        )
      }

      <TitleAndTableContainer>
        <IntentCountTitle>
          <ThemedText.LabelSmall textAlign="left">
            Orders on your deposits
          </ThemedText.LabelSmall>
        </IntentCountTitle>

        <Table>
          {intentsRowData.map((intentsRow, rowIndex) => (
            <IntentRow
              key={rowIndex}
              paymentPlatform={intentsRow.paymentPlatform}
              amountUSDToReceive={intentsRow.amountUSDToReceive}
              amountUSDCToSend={intentsRow.amountUSDCToSend}
              expirationTimestamp={intentsRow.expirationTimestamp}
              onRamper={intentsRow.onRamper}
              handleReleaseClick={intentsRow.handleReleaseClick}
            />
          ))}
        </Table>
      </TitleAndTableContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  justify-content: center;
  gap: 1rem;

  background-color: ${colors.container};
  overflow: hidden;

  @media (min-width: 600px) {
    border: 1px solid ${colors.defaultBorderColor};
    border-radius: 16px;
  }
`;

const TitleAndTableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const IntentCountTitle = styled.div`
  width: 100%;
  padding-top: 1.25rem;
  padding-bottom: 1rem;
  padding-left: 1.5rem;
  border-bottom: 1px solid ${colors.defaultBorderColor};
`;

const Table = styled.div`
  width: 100%;
  border-radius: 8px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  color: #616161;

  & > * {
    border-bottom: 1px solid ${colors.defaultBorderColor};
  }

  & > *:last-child {
    border-bottom: none;
  }
`;
