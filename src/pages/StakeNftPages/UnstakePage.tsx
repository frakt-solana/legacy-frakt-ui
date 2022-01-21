import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StakeView } from 'frakt-client';

import AppLayout from '../../components/AppLayout';
import { useStaking } from '../../contexts/staking';
import { usePrivatePage } from '../../hooks';
import styles from './styles.module.scss';
import SelectStep from './unstakeSteps/SelectStep';
import ApprovalStep from './unstakeSteps/ApprovalStep';
import { HeaderUnstake } from './Header';

const STEPS = ['Select Frakts', 'Approval'];

const UnstakePage = (): JSX.Element => {
  usePrivatePage();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { userStakeAccounts, userStakeAccountsAvailableToUnstake, loading } =
    useStaking();
  const history = useHistory();

  const [selectedStakes, setSelectedStakes] = useState<StakeView[]>([]);

  const nextStep = (): void => setCurrentStep((step) => step + 1);

  const selectDeselectAllHandler = (): void => {
    selectedStakes.length === userStakeAccountsAvailableToUnstake.length
      ? setSelectedStakes([])
      : setSelectedStakes(userStakeAccountsAvailableToUnstake);
  };

  return (
    <AppLayout mainClassName={styles.appMain}>
      <div className="container">
        <HeaderUnstake
          stakes={userStakeAccounts}
          stakesLoading={loading}
          selectedStakes={selectedStakes}
          steps={STEPS}
          currentStep={currentStep}
          onBackButtonClick={() => history.goBack()}
          selectDeselectAllHandler={selectDeselectAllHandler}
          disableSelectDeselectButton={
            userStakeAccountsAvailableToUnstake.length === 0
          }
          nextStep={nextStep}
        />
        {currentStep === 0 && (
          <SelectStep
            stakes={userStakeAccounts}
            stakesLoading={loading}
            selectedStakes={selectedStakes}
            setSelectedStakes={setSelectedStakes}
          />
        )}
        {currentStep === 1 && <ApprovalStep selectedStakes={selectedStakes} />}
      </div>
    </AppLayout>
  );
};

export default UnstakePage;
