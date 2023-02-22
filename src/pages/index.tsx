import { Inter } from "@next/font/google";
import { useForm } from "react-hook-form";
import { Input, Textarea } from "@/ui";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import Link from "next/link";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

const url = "http://localhost:8081/api/v1/value-exists";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
const isValueExists = async (key: string, value: string) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, value }),
  });

  return res.json();
};
export default function Index() {
  return (
    <StepperProvider>
      <Form />
    </StepperProvider>
  );
}

const Form = () => {
  const { isFormSubmitted } = useStepper();
  if (isFormSubmitted) {
    return <SuccessApplication />;
  }
  return (
    <div>
      <video width="w-full" height="full" autoPlay loop muted>
        <source src="/backgrounds/bg-1.mp4" type="video/mp4" />
        {/* <source src="/bqmovie.ogg" type="video/ogg" /> */}
        Your browser does not support the video tag.
      </video>

      <Steps>
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
        <Step5 />
      </Steps>
    </div>
  );
};

type StepperContextType = {
  step: number;
  changeStep: (value: number) => void;
  saveStep: (data: any) => void;
  steps: Record<string, any> | null;
  setIsFormSubmitted: (isSubmitted: boolean) => void;
  isFormSubmitted: boolean;
};
const StepperContext = createContext<StepperContextType | null>(null);
const StepperProvider = ({ children }: { children: JSX.Element }) => {
  const [step, setStep] = useState(0);
  const [steps, setSaveStep] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const changeStep = (value: number) => setStep(value);
  const saveStep = (data: any) =>
    setSaveStep((steps) => ({ ...(steps ?? {}), ...data }));
  const value = {
    step,
    changeStep,
    steps,
    saveStep,
    isFormSubmitted,
    setIsFormSubmitted,
  };

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
};
const useStepper = () => {
  const ctx = useContext(StepperContext);

  if (ctx === null) {
    throw Error("Context has not been Provided!");
  }

  return ctx;
};

export function Steps({ children }: { children: JSX.Element[] }) {
  const { step, steps } = useStepper();

  return (
    <div className="border border-primary-blue w-[55%] h-[55%] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
      <div className="form-section grid items-center">{children[step]}</div>
    </div>
  );
}

const FormControls = ({
  isDirty,
  isValid,
}: {
  isValid: boolean;
  isDirty: boolean;
}) => {
  const { step, steps, changeStep } = useStepper();

  const onPrev = (event: any) => {
    event.preventDefault();
    changeStep(step - 1);
  };

  const onNext = (event: any) => {
    event.preventDefault();
    changeStep(step + 1);
  };
  return (
    <div className="form-controls">
      <button disabled={step <= 0} className="btn primary" onClick={onPrev}>
        <ChevronLeftIcon className="h-6 w-6 text-primary-red" />
      </button>

      <button
        disabled={!isValid || !steps?.[step] || step >= steps.length}
        onClick={onNext}
        className="btn primary"
      >
        <ChevronRightIcon className="h-6 w-6 text-primary-red" />
      </button>
    </div>
  );
};

export function Step1() {
  const { changeStep, step, saveStep, steps } = useStepper();
  const prevValue = steps?.[step]?.["web3exp"] as string;
  const {
    control,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      web3exp: prevValue ?? "",
    },
  });

  const submit = (data: any) => {
    if (isValid) {
      saveStep({ [step]: data });
      changeStep(step + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tell us about your experience in WEB-3
        </label>
        <Input
          controllerProps={{
            control,
            name: "web3exp",
            rules: {
              required: "This field is required",
            },
          }}
        />
        <div className="error-text">
          {errors.web3exp && errors.web3exp.message}
        </div>
      </div>
      <div className="grid grid-flow-col justify-between gap-x-2">
        <button
          disabled={!isDirty || !isValid}
          type="submit"
          className="btn primary"
        >
          Enter
        </button>
        <FormControls isDirty={isDirty} isValid={isValid} />
      </div>
    </form>
  );
}
export function Step2() {
  const { changeStep, step, saveStep, steps } = useStepper();
  const prevValue = steps?.[step]?.["helpToFind"] as string;

  const {
    control,
    formState: { isDirty, isValid, errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      helpToFind: prevValue ?? "",
    },
  });

  const submit = (data: any) => {
    if (isValid) {
      saveStep({ [step]: data });
      changeStep(step + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Why do you want to help me find Obby?
        </label>
        <Input
          controllerProps={{
            control,
            name: "helpToFind",
            rules: {
              required: "This field is required",
            },
          }}
        />
        <div className="error-text">
          {errors.helpToFind && errors.helpToFind.message}
        </div>
      </div>
      <div className="grid grid-flow-col justify-between gap-x-2">
        <button
          disabled={!isDirty || !isValid}
          type="submit"
          className="btn primary"
        >
          Enter
        </button>
        <FormControls isDirty={isDirty} isValid={isValid} />
      </div>
    </form>
  );
}
export function Step3() {
  const { changeStep, step, saveStep, steps } = useStepper();
  const prevValue = steps?.[step]?.["twitter"] as string;

  const {
    control,
    formState: { isDirty, isValid, errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      twitter: prevValue ?? "",
    },
  });

  const submit = (data: any) => {
    if (isValid) {
      saveStep({ [step]: data });
      changeStep(step + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Did you share Obby missing persons announcement?*
        </label>
        <Input
          controllerProps={{
            control,
            name: "twitter",
            rules: {
              required: "This field is required",
            },
          }}
        />
        <div className="error-text">
          {errors.twitter && errors.twitter.message}
        </div>
      </div>
      <div className="grid grid-flow-col justify-between gap-x-2">
        <button
          disabled={!isDirty || !isValid}
          type="submit"
          className="btn primary"
        >
          Enter
        </button>
        <FormControls isDirty={isDirty} isValid={isValid} />
      </div>
    </form>
  );
}
export function Step4() {
  const { changeStep, step, saveStep, steps } = useStepper();
  const prevValue = steps?.[step]?.["twitterLink"] as string;

  const {
    control,
    setError,
    formState: { isDirty, isValid, errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      twitterLink: prevValue ?? "",
    },
  });

  const submit = (data: any) => {
    if (isValid) {
      saveStep({ [step]: data });

      changeStep(step + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          What about your Twitter?*
        </label>
        <Input
          controllerProps={{
            control,
            name: "twitterLink",
            rules: {
              required: "This field is required",
              validate: async (value) => {
                const res = await isValueExists("twitter", value);

                if (res?.code !== 200) {
                  setError("twitterLink", {
                    message: res.message,
                    type: "value",
                  });
                }
                return res?.code === 200;
              },
            },
          }}
        />
        <div className="error-text">
          {errors.twitterLink && errors.twitterLink.message}
        </div>
      </div>
      <div className="grid grid-flow-col justify-between gap-x-2">
        <button
          disabled={!isDirty || !isValid}
          type="submit"
          className="btn primary"
        >
          Enter
        </button>
        <FormControls isDirty={isDirty} isValid={isValid} />
      </div>
    </form>
  );
}

export function Step5() {
  const { changeStep, step, steps, saveStep, setIsFormSubmitted } =
    useStepper();
  const prevValue = steps?.[step]?.["wallet"] as string;

  const {
    control,
    setError,
    formState: { isDirty, isValid, errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      wallet: prevValue ?? "",
    },
  });

  const submit = async (data: any) => {
    if (isValid) {
      let preSendData = {} as any;
      for (const item of Object.values(steps ?? {})) {
        preSendData = Object.assign(preSendData, item);
      }

      preSendData["wallet"] = data["wallet"];

      await sleep(5000);
      setIsFormSubmitted(true);
      console.log(preSendData);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-0 text-sm font-medium text-gray-900 dark:text-white"
        >
          Lastly, please share your wallet address.*
        </label>
        <div className="tip mb-2 text-white/80 text-sm">
          We'll need this to grant you access
        </div>
        <Input
          readonly={isSubmitting}
          controllerProps={{
            control,
            name: "wallet",
            rules: {
              required: "This field is required",
              validate: async (value) => {
                const res = await isValueExists("wallet", value);

                if (res?.code !== 200) {
                  setError("wallet", {
                    message: res.message,
                    type: "value",
                  });
                }
                return res?.code === 200;
              },
            },
          }}
        />
        <div className="error-text">
          {errors.wallet && errors.wallet.message}
        </div>
      </div>
      <Loader isLoading={isSubmitting}>
        <div className="grid grid-flow-col justify-between gap-x-2">
          <button
            disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
            className="btn primary"
          >
            Apply
          </button>
          <FormControls isDirty={isDirty} isValid={isValid} />
        </div>
      </Loader>
    </form>
  );
}

function SuccessApplication() {
  return (
    <div className="w-1/2 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
      <div className="text-center">
        <div className="text-primary-blue text-xl mb-2">
          Thanks for applying
        </div>
        <div className="text-primary-blue mb-10 text-sm opacity-60">
          You'll hear from us soon
        </div>
        <Link
          className="py-3 px-5 bg-primary-red text-white grid max-w-max mx-auto my-0 grid-flow-col gap-2 items-center"
          href={"https://twitter.com/obbypr0ject"}
          target="_blank"
        >
          Follow on Twitter
        </Link>
      </div>
    </div>
  );
}

const Loader = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: JSX.Element;
}) => (isLoading ? <div className="loader">Loading...</div> : children);
