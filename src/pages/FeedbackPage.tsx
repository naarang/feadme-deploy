import { useState } from 'react';
import FeedbackStep1 from '@/components/Feedback/Step1';
import FeedbackStep2 from '@/components/Feedback/Step2';
import FeedbackStep3 from '@/components/Feedback/Step3';
import FeedbackStep4 from '@/components/Feedback/Step4';
import { useSearchParams } from 'react-router-dom';
import { useGetUserName } from '@/hooks/api/useFeedback';

const FeedbackPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [step, setStep] = useState<number>(1);

  const onChangeStep = (changeValue: number) => {
    setStep((step) => step + changeValue);
  };

  const { data, isError } = useGetUserName(Number(id) || 1);

  if (isError) return <div>에러가 발생했습니다.</div>;

  const showCurrentStep = () => {
    switch (step) {
      case 1:
        return <FeedbackStep1 onChangeStep={onChangeStep} />;
      case 2:
        return (
          <FeedbackStep2
            onChangeStep={onChangeStep}
            nickname={data?.data?.name}
          />
        );
      case 3:
        return <FeedbackStep3 onChangeStep={onChangeStep} />;
      case 4:
        return (
          <FeedbackStep4
            onChangeStep={onChangeStep}
            nickname={data?.data?.name}
          />
        );
    }
  };

  return <>{showCurrentStep()}</>;
};

export default FeedbackPage;
