import React, { useState } from 'react';
import { useHistory } from 'react-router';

import AppLayout from '../../components/AppLayout';
import { Frakt } from '../../contexts/frakts';
import { useStaking } from '../../contexts/staking';
import { HeaderStake } from './Header';
import ApprovalStep from './stakeSteps/ApprovalStep';
import WarningStep from './stakeSteps/WarningStep';
import SelectStep from './stakeSteps/SelectStep';
import styles from './styles.module.scss';

const STEPS = ['Select Frakts', 'Warning', 'Approval'];

const CreateStakePage = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { userFrakts, loading } = useStaking();
  const history = useHistory();

  const [selectedFrakts, setSelectedFrakts] = useState<Frakt[]>([]);

  const onBackButtonClick = (): void => {
    if (currentStep === 0) {
      history.goBack();
    } else {
      setCurrentStep((step) => step - 1);
    }
  };

  const nextStep = (): void => setCurrentStep((step) => step + 1);

  const selectDeselectAllHandler = (): void => {
    selectedFrakts.length === userFrakts.length
      ? setSelectedFrakts([])
      : setSelectedFrakts(userFrakts);
  };

  return (
    <AppLayout mainClassName={styles.appMain}>
      <HeaderStake
        frakts={userFrakts}
        fraktsLoading={loading}
        selectedFrakts={selectedFrakts}
        steps={STEPS}
        currentStep={currentStep}
        onBackButtonClick={onBackButtonClick}
        selectDeselectAllHandler={selectDeselectAllHandler}
        nextStep={nextStep}
      />
      {currentStep === 0 && (
        <SelectStep
          frakts={userFrakts}
          fraktsLoading={loading}
          selectedFrakts={selectedFrakts}
          setSelectedFrakts={setSelectedFrakts}
        />
      )}
      {currentStep === 1 && (
        <WarningStep selectedFrakts={selectedFrakts} nextStep={nextStep} />
      )}
      {currentStep === 2 && <ApprovalStep selectedFrakts={selectedFrakts} />}
    </AppLayout>
  );
};

export default CreateStakePage;
