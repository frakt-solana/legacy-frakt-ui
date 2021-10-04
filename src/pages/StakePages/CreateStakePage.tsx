import React, { useState } from 'react';
import { useHistory } from 'react-router';

import AppLayout from '../../components/AppLayout';
import { useFrakts } from '../../contexts/frakts';
import Header from './Header';
import ApproveStep from './steps/ApproveStep';
import AttentionStep from './steps/AttentionStep';
import SelectStep from './steps/SelectStep';
import styles from './styles.module.scss';

const STEPS = ['Select Frakts', 'Attention', 'Approve'];

const CreateStakePage = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { currentUserFrakts, currentUserFraktsLoading } = useFrakts();
  const history = useHistory();

  const [selectedFrakts, setSelectedFrakts] = useState<any[]>([]);

  const onBackButtonClick = (): void => {
    if (currentStep === 0) {
      history.goBack();
    } else {
      setCurrentStep((step) => step - 1);
    }
  };

  const nextStep = (): void => setCurrentStep((step) => step + 1);

  return (
    <AppLayout mainClassName={styles.appMain}>
      <Header
        steps={STEPS}
        currentStep={currentStep}
        onBackButtonClick={onBackButtonClick}
        hideBackButton={currentStep === 2}
      />
      {currentStep === 0 && (
        <SelectStep
          frakts={currentUserFrakts}
          fraktsLoading={currentUserFraktsLoading}
          selectedFrakts={selectedFrakts}
          setSelectedFrakts={setSelectedFrakts}
          nextStep={nextStep}
        />
      )}
      {currentStep === 1 && (
        <AttentionStep selectedFrakts={selectedFrakts} nextStep={nextStep} />
      )}
      {currentStep === 2 && <ApproveStep />}
    </AppLayout>
  );
};

export default CreateStakePage;
