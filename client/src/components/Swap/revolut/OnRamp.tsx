import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import Link from '@mui/material/Link';
import { ArrowLeft } from 'react-feather';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

import { RowBetween } from '@components/layouts/Row';
import { VerifyNotarizationForm } from '@components/Notary/VerifyNotarizationForm';
import { NumberedStep } from "@components/common/NumberedStep";
import { revolutStrings } from '@helpers/strings';
import { PaymentPlatform, NotaryVerificationCircuit } from '@helpers/types';
import { ThemedText } from '@theme/text';
import { colors } from '@theme/colors';
import useBalances from '@hooks/useBalance';
import useOnRamperIntents from '@hooks/revolut/useOnRamperIntents';
import useSmartContracts from '@hooks/useSmartContracts';
import useMediaQuery from '@hooks/useMediaQuery';
import useQuery from '@hooks/useQuery';


interface OnRampProps {
  handleBackClick: () => void;
  selectedUIntIntentHash: string;
}

export const OnRamp: React.FC<OnRampProps> = ({
  handleBackClick,
  selectedUIntIntentHash
}) => {
  const { navigateWithQuery } = useQuery();

  /*
   * Context
   */

  const { revolutRampAddress, revolutRampAbi } = useSmartContracts();
  const { refetchIntentHash, refetchIntentHashAsUint } = useOnRamperIntents();
  const { refetchUsdcBalance } = useBalances();
  const isMobile = useMediaQuery() === 'mobile';

  /*
   * State
   */

  const [shouldConfigureRampWrite, setShouldConfigureRampWrite] = useState<boolean>(false);
  const [submitOnRampTransactionHash, setSubmitOnRampTransactionHash] = useState<string | null>(null);

  // ----- transaction state -----
  const [verifierProof, setVerifierProof] = useState<string>('');
  // const [verifierProof, setVerifierProof] = useState<string>(
  //   JSON.stringify()
  // );

  const [publicSignals, setPublicSignals] = useState<string>('');
  // const [publicSignals, setPublicSignals] = useState<string>(
  //   JSON.stringify()
  // );

  /*
   * Contract Writes
   */

  //
  // onRamp(bytes32 _intentHash, IRevolutSendProcessor.SendData calldata _sendData, bytes calldata _verifierSignature)
  //
  const { config: writeSubmitOnRampConfig } = usePrepareContractWrite({
    address: revolutRampAddress,
    abi: revolutRampAbi,
    functionName: 'onRamp',
    args: [
      publicSignals,
      verifierProof
    ],
    onError: (error: { message: any }) => {
      console.error(error.message);
    },
    enabled: shouldConfigureRampWrite
  });

  const {
    data: submitOnRampResult,
    status: submitOnRampStatus,
    writeAsync: writeSubmitOnRampAsync
  } = useContractWrite(writeSubmitOnRampConfig);

  const {
    isLoading: isSubmitOnRampMining,
    isSuccess: isSubmitOnRampSuccessful
  } = useWaitForTransaction({
    hash: submitOnRampResult ? submitOnRampResult.hash : undefined,
    onSuccess(data: any) {
      console.log('writeSubmitOnRampAsync successful: ', data);

      refetchUsdcBalance?.();
      
      refetchIntentHash?.();

      refetchIntentHashAsUint?.();
    },
  });

  /*
   * Hooks
   */

  useEffect(() => {
    if (verifierProof && publicSignals) {
      setShouldConfigureRampWrite(true);
    } else {
      setShouldConfigureRampWrite(false);
    }
  }, [verifierProof, publicSignals]);

  useEffect(() => {
    if (submitOnRampResult?.hash) {
      setSubmitOnRampTransactionHash(submitOnRampResult.hash);
    }
  }, [submitOnRampResult])

  /*
   * Handlers
   */

  const handleWriteSubmitOnRampClick = async () => {
    try {
      await writeSubmitOnRampAsync?.();
    } catch (error) {
      console.log('writeSubmitDepositAsync failed: ', error);
    }
  };

  const handleVerificationCompleteClick = () => {
    navigateWithQuery('/send');
  };

  /*
   * Component
   */

  return (
    <Container>
      <TitleContainer>
        <RowBetween style={{ paddingBottom: '1.5rem' }}>
          <div style={{ flex: 0.5 }}>
            <button
              onClick={handleBackClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <StyledArrowLeft/>
            </button>
          </div>

          <ThemedText.HeadlineSmall style={{ flex: '1', margin: 'auto', textAlign: 'center', fontSize: isMobile ? '16px': ''}}>
            Complete On-Ramp
          </ThemedText.HeadlineSmall>

          <div style={{ flex: 0.5 }}/>
        </RowBetween>

        <InstructionsAndTogglesContainer>
          <NumberedStep>
            {revolutStrings.get('PROOF_FORM_TITLE_SEND_INSTRUCTIONS')}
            <Link href="https://docs.zkp2p.xyz/user-guides/on-ramping" target="_blank">
              Learn more ↗
            </Link>
          </NumberedStep>
        </InstructionsAndTogglesContainer>
      </TitleContainer>

      <VerifyNotarizationForm
        paymentPlatformType={PaymentPlatform.REVOLUT}
        circuitType={NotaryVerificationCircuit.TRANSFER}
        verifierProof={verifierProof}
        publicSignals={publicSignals}
        setVerifierProof={setVerifierProof}
        setPublicSignals={setPublicSignals}
        submitTransactionStatus={submitOnRampStatus}
        isSubmitMining={isSubmitOnRampMining}
        isSubmitSuccessful={isSubmitOnRampSuccessful}
        handleSubmitVerificationClick={handleWriteSubmitOnRampClick}
        onVerifyNotarizationCompletion={handleVerificationCompleteClick}
        transactionAddress={submitOnRampTransactionHash}
        selectedUIntIntentHash={selectedUIntIntentHash}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 4rem;
`;

const TitleContainer = styled.div`
  padding: 1.5rem;
  background-color: ${colors.container};
  
  @media (min-width: 600px) {
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const InstructionsAndTogglesContainer = styled.div`
  display: grid;
  flex-direction: column;
  gap: 1rem;
`;

const StyledArrowLeft = styled(ArrowLeft)`
  color: #FFF;
`;
